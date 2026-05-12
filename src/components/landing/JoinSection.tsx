import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const JoinSection = () => {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-16">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Ready to improve your resume?
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Join thousands of professionals getting better job offers.
          </p>
          <Link href="/register">
            <Button className="px-8 py-4 text-[1rem]">
              Get started for free
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};

export default JoinSection;
