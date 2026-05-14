"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 mb-12">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-6">
            AI-powered resume review
          </div>
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-4">
            Get your resume <span className="text-primary">analyzed</span> in
            seconds
          </h1>
          <p className="text-md text-muted-foreground mb-8">
            Upload your resume and receive detailed feedback, a score, and
            actionable suggestions powered by AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button
              className="w-full sm:w-auto px-6 py-4 text-[1rem]"
              onClick={() =>
                router.push(isAuthenticated ? "/dashboard" : "/register")
              }
            >
              Analyze my resume
            </Button>
            <Link href="#how-it-works">
              <Button
                variant="outline"
                className="w-full sm:w-auto px-6 py-4 text-[1rem]"
              >
                See how it works
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full">
          <Card className="text-left">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Resume score</p>
                  <p className="text-2xl font-bold text-foreground">82 / 100</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary font-bold text-lg">
                  82
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full mb-3 overflow-hidden">
                <div className="h-full w-[82%] bg-primary rounded-full" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Priyanshu_Dahiya.pdf
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {["Strong experience", "Good skills", "Clear formatting"].map(
                  (s) => (
                    <span
                      key={s}
                      className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ),
                )}
                {["Missing summary", "Needs metrics"].map((s) => (
                  <span
                    key={s}
                    className="text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your resume demonstrates solid full-stack experience. Adding
                quantifiable achievements would significantly improve impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
