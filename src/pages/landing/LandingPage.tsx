import LandingNav from "./sections/LandingNav";
import HeroSection from "./sections/HeroSection";
import ProblemSection from "./sections/ProblemSection";
import FeaturesSection from "./sections/FeaturesSection";
import CtaSection from "./sections/CtaSection";
import LandingFooter from "./sections/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-svh">
      <LandingNav />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <LandingFooter />
    </div>
  );
}
