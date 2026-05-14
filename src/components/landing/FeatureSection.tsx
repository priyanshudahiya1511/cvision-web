import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "AI Analysis",
    desc: "Deep review of content, structure, and impact.",
  },
  { title: "Resume Score", desc: "Clear score out of 100 with breakdown." },
  { title: "Suggestions", desc: "Actionable recommendations to stand out." },
  { title: "History", desc: "Track all past resumes over time." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="max-w-5xl mx-auto px-6 pb-16">
      <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">
        Features
      </p>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Everything you need to land your next job
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Detailed, structured feedback so you know exactly what to improve.
      </p>
      <div className="flex flex-wrap gap-4">
        {features.map((f) => (
          <Card key={f.title} className="flex-1 min-w-[130px]">
            <CardContent className="p-4">
              <div className="w-8 h-8 rounded-md bg-primary/10 mb-3" />
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {f.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
