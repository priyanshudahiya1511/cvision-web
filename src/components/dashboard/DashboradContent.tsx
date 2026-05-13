"use client";

import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import DashboradNavbar from "./DashboradNavbar";
import { useEffect, useRef, useState } from "react";
import {
  getResumeHistoryService,
  uploadResumeService,
} from "@/services/resume.services";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FileText, Loader2, Upload } from "lucide-react";

interface Resume {
  _id: string;
  originalFileName: string;
  isAnalysed: boolean;
  createdAt: string;
}

const DashboardContent = () => {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchResumes = async () => {
    setIsFetching(true);
    try {
      const data = await getResumeHistoryService();
      setResumes(data.resumes);
    } catch {
      setError("Failed to fetch resumes");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    fetchResumes();
  }, [isAuthenticated, router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file only");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file only");
        return;
      }
      setSelectedFile(file);
      setError("");
    }
  };

  const handleUploadClick = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    setError("");
    try {
      await uploadResumeService(selectedFile);
      await fetchResumes();
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setIsUploading(false);
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

  return (
    <div className="min-h-screen bg-muted/40">
      <DashboradNavbar />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Welcome back, {user?.name?.split(" ")[0]} 👋
          </h2>
          <p className="text-sm text-muted-foreground">
            Upload your resume and get detailed AI-powered feedback.
          </p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm px-3 py-2 rounded-lg mb-4">
            {error}
          </div>
        )}

        <Card
          className={`mb-8 border-dashed cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-primary/30 bg-primary/5"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !selectedFile && fileInputRef.current?.click()}
        >
          <CardContent className="p-8 text-center">
            <div className="w-12 h-12 bg-background border border-primary/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Upload className="w-5 h-5 text-primary" />
            </div>

            {selectedFile ? (
              <>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium text-foreground">
                    {selectedFile.name}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <div className="flex gap-2 justify-center">
                  <Button
                    type="button"
                    disabled={isUploading}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUploadClick();
                    }}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      "Upload resume"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-base font-semibold text-foreground mb-1">
                  Upload your resume
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your PDF here or click to browse
                </p>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Select PDF
                </Button>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </CardContent>
        </Card>

        <h3 className="text-base font-semibold text-foreground mb-4">
          Your resumes
        </h3>

        {isFetching ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No resumes uploaded yet. Upload your first resume above!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {resumes.map((resume) => (
              <Card key={resume._id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {resume.originalFileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(resume.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {resume.isAnalysed ? (
                      <>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20 font-medium">
                          Analyzed
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/analysis/${resume._id}`)}
                        >
                          View analysis
                        </Button>
                      </>
                    ) : (
                      <>
                        <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 px-2 py-1 rounded-full font-medium">
                          Not analyzed
                        </span>
                        <Button
                          size="sm"
                          onClick={() => router.push(`/analysis/${resume._id}`)}
                        >
                          Analyze
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
