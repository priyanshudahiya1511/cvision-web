import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 py-14 text-center">
      <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-6">
        AI-powered resume review
      </div>
      <h1 className="text-4xl font-bold text-foreground leading-tight mb-4">
        Get your resume <span className="text-primary">analyzed</span> in
        seconds
      </h1>
      <p className="text-md text-muted-foreground mb-8 max-w-xl mx-auto">
        Upload your resume and receive detailed feedback, a score, and
        actionable suggestions powered by AI.
      </p>
      <div className="flex gap-3 justify-center mb-12">
        <Link href="/register">
          <Button className="px-6 py-4 text-[1rem]">Analyze my resume</Button>
        </Link>
        <Link href="#how-it-works">
          <Button variant="outline" className="px-6 py-4 text-[1rem]">
            See how it works
          </Button>
        </Link>
      </div>

      <Card className="max-w-lg mx-auto text-left">
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
    </section>
  );
};

export default HeroSection;
