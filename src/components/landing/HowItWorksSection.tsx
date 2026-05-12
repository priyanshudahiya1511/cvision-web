const steps = [
  {
    num: "1",
    title: "Upload your resume",
    desc: "Upload any PDF. We extract and analyze content automatically.",
  },
  {
    num: "2",
    title: "AI reviews it",
    desc: "Analyzes structure, content, language, and impact in seconds.",
  },
  {
    num: "3",
    title: "Get your feedback",
    desc: "Detailed report with score, strengths, weaknesses, and suggestions.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="max-w-3xl mx-auto px-6 pb-16">
      <p className="text-xs text-primary font-medium uppercase tracking-widest mb-2">
        How it works
      </p>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Three steps to a better resume
      </h2>
      <p className="text-sm text-muted-foreground mb-8">
        Simple and fast. Get results in under a minute.
      </p>
      <div className="flex flex-col gap-4">
        {steps.map((step) => (
          <div key={step.num} className="flex gap-4 items-start">
            <div className="w-8 h-8 min-w-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-semibold">
              {step.num}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
