import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Challenge from "@/components/Challenge";
import Services from "@/components/Services";
import VoiceAgent from "@/components/VoiceAgent";
import ROICalculator from "@/components/ROICalculator";
import Packages from "@/components/Packages";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Challenge />
      <Services />
      <VoiceAgent />
      <ROICalculator />
      <Packages />
      <Footer />
    </div>
  );
};

export default Index;
