import FeaturesSection from "@/components/landing/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import JoinSection from "@/components/landing/JoinSection";
import Navbar from "@/components/landing/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
