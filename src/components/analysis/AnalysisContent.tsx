"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, FileText, ArrowLeft } from "lucide-react";
import DashboardNavbar from "@/components/dashboard/DashboradNavbar";
import { getResumeByIdService } from "@/services/resume.services";
import {
  analyzeResumeService,
  getAnalysisService,
} from "@/services/analysis.services";
import useAuthStore from "@/store/auth.store";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Analysis {
  _id: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  summary: string;
  detailedFeedback: string;
}

interface Resume {
  _id: string;
  originalFileName: string;
  isAnalyzed: boolean;
  createdAt: string;
}

const AnalysisContent = ({ resumeId }: { resumeId: string }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [resume, setResume] = useState<Resume | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const resumeData = await getResumeByIdService(resumeId);
      setResume(resumeData.resume);

      if (resumeData.resume.isAnalysed) {
        const analysisData = await getAnalysisService(resumeId);
        setAnalysis(analysisData.analysis);
      }
    } catch {
      setError("Failed to fetch resume data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError("");
    try {
      const data = await analyzeResumeService(resumeId);
      setAnalysis(data.analysis);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to analyze resume");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    if (diff < 7) return `${diff} days ago`;
    return date.toLocaleDateString();
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Good — but room to improve";
    if (score >= 60) return "Average — needs improvement";
    return "Poor — significant changes needed";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/40">
        <DashboardNavbar />
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboardNavbar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-sm text-primary mb-6 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Resume Analysis
          </h2>
          <p className="text-sm text-muted-foreground">
            Detailed AI-powered feedback for your resume
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        {resume && (
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-6">
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {resume.originalFileName}
              </p>
              <p className="text-xs text-muted-foreground">
                Uploaded {formatDate(resume.createdAt)}
              </p>
            </div>
          </div>
        )}

        {!analysis ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-2">
                Not analyzed yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Click the button below to analyze your resume with AI.
              </p>
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="px-8"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze with AI"
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Resume score
                    </p>
                    <p className="text-4xl font-bold text-foreground">
                      {analysis.score}
                      <span className="text-lg text-muted-foreground font-normal">
                        {" "}
                        /100
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getScoreLabel(analysis.score)}
                    </p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {analysis.score}
                    </span>
                    <span className="text-xs text-primary">/100</span>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Summary
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {analysis.summary}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Strengths
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Weaknesses
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.weaknesses.map((w, i) => (
                    <span
                      key={i}
                      className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-3 py-1.5 rounded-full"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.suggestions.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Detailed Feedback
                </p>
                <div
                  className="prose prose-sm dark:prose-invert max-w-none
                    prose-headings:text-foreground prose-headings:font-semibold
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-strong:text-foreground prose-strong:font-medium
                    prose-li:text-muted-foreground prose-li:leading-relaxed
                    prose-ul:my-2 prose-ol:my-2
                    prose-h2:text-base prose-h2:mt-6 prose-h2:mb-3
                    prose-h3:text-sm prose-h3:mt-5 prose-h3:mb-2"
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {analysis.detailedFeedback}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisContent;
