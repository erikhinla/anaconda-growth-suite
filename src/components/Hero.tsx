import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-clinical-white to-background">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-luxury-bronze/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-luxury-sand/30 border border-luxury-bronze/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-luxury-bronze" />
            <span className="text-sm font-medium text-foreground/80">AI-Powered Clinic Growth</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl font-bold text-foreground tracking-tight text-balance md:text-6xl">You'd answer every client call        </h1>

          <p className="text-2xl md:text-3xl font-light text-luxury-bronze tracking-wide">but you're only human         </p>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Never miss a call                    </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="gradient-luxury text-primary-foreground shadow-luxury text-base px-8 py-6 transition-smooth hover:scale-105">
              Book Your Clinic Growth Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-luxury-bronze/30 text-foreground hover:bg-luxury-sand/20 text-base px-8 py-6 transition-smooth">
              See How AI Transforms Your Clinic
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-luxury-bronze">24/7</div>
              <div className="text-sm text-muted-foreground">AI Concierge</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-luxury-bronze">35%+</div>
              <div className="text-sm text-muted-foreground">Revenue Growth</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-luxury-bronze">100%</div>
              <div className="text-sm text-muted-foreground">Lead Capture</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-luxury-bronze/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-luxury-bronze"></div>
        </div>
      </div>
    </section>;
};
export default Hero;