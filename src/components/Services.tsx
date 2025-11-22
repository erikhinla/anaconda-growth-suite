import { Bot, Zap, Database, Globe, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const Services = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const services = [
    {
      icon: Bot,
      title: "AI Voice Concierge",
      description: "Books appointments 24/7 with warmth, clarity, and professionalism.",
    },
    {
      icon: Zap,
      title: "Smart Lead Automation",
      description: "Text, email, and multi-channel sequences that convert interest into booked treatments.",
    },
    {
      icon: Database,
      title: "Unified CRM Systems",
      description: "Every message, lead, and client touchpoint centralized for efficiency.",
    },
    {
      icon: Globe,
      title: "Website & SEO Optimization",
      description: "A refined digital presence with local search dominance.",
    },
    {
      icon: Sparkles,
      title: "LLM-Ready Content Systems",
      description: "AI agents trained to speak in high-end aesthetic language across your website, socials, and client chat.",
    },
  ];

  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            The Aesthetic Intelligence Advantage
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A complete AI-powered growth framework built and installed for premium clinics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const isFlipped = flippedCards.has(index);
            
            return (
              <div
                key={index}
                className="flip-card h-80 cursor-pointer perspective-1000"
                onClick={() => {
                  const newFlipped = new Set(flippedCards);
                  if (isFlipped) {
                    newFlipped.delete(index);
                  } else {
                    newFlipped.add(index);
                  }
                  setFlippedCards(newFlipped);
                }}
              >
                <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front */}
                  <Card className="flip-card-front absolute inset-0 border-border shadow-card bg-card/50 backdrop-blur-sm flex flex-col items-center justify-center p-8">
                    <div className="w-24 h-24 rounded-2xl gradient-luxury flex items-center justify-center mb-6">
                      <service.icon className="w-12 h-12 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground text-center">
                      {service.title}
                    </CardTitle>
                  </Card>
                  
                  {/* Back */}
                  <Card className="flip-card-back absolute inset-0 border-border shadow-card bg-card backdrop-blur-sm flex items-center justify-center p-8">
                    <CardContent className="p-0">
                      <p className="text-muted-foreground leading-relaxed text-center">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
