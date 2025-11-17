import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Packages = () => {
  const packages = [
    {
      name: "Starter",
      subtitle: "AI Foundations",
      description: "Essential AI infrastructure for clinic growth",
      features: [
        "AI Voice Concierge",
        "Lead Bot",
        "CRM Setup",
        "Automated Follow-Up",
        "Basic Optimization",
      ],
      popular: false,
    },
    {
      name: "Growth",
      subtitle: "Complete AI Clinic Engine",
      description: "Everything you need to scale with intelligence",
      features: [
        "Everything in Starter",
        "Website Refinement",
        "Local SEO",
        "Maps Optimization",
        "Social Message Integration",
      ],
      popular: true,
    },
    {
      name: "Elite",
      subtitle: "Full Aesthetic Intelligence",
      description: "Premium AI systems for maximum growth",
      features: [
        "Everything in Growth",
        "Predictive Analytics",
        "Retention Sequences",
        "Monthly Optimization",
        "Revenue Growth Systems",
      ],
      popular: false,
    },
  ];

  return (
    <section id="packages" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Choose Your Growth Path
          </h2>
          <p className="text-xl text-muted-foreground">
            Scalable packages designed for luxury medical-aesthetic clinics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative ${
                pkg.popular
                  ? "border-luxury-bronze shadow-luxury scale-105"
                  : "border-border shadow-card"
              } transition-smooth hover:shadow-luxury bg-card/50 backdrop-blur-sm`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full gradient-luxury text-primary-foreground text-sm font-medium shadow-luxury">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-lg text-luxury-bronze font-medium mb-3">
                  {pkg.subtitle}
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                  {pkg.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full gradient-luxury flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className="text-foreground/80 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    pkg.popular
                      ? "gradient-luxury text-primary-foreground shadow-luxury"
                      : "bg-secondary text-secondary-foreground hover:bg-luxury-sand/40"
                  } transition-smooth`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
