"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";

const JoinSection = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Ready to improve your resume?
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Join thousands of professionals getting better job offers.
          </p>
          <Button
            className="px-8 py-4 text-[1rem]"
            onClick={() =>
              router.push(isAuthenticated ? "/dashboard" : "/register")
            }
          >
            Get started for free
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default JoinSection;
