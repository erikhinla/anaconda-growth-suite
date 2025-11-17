import { Bot, Zap, Database, Globe, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
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
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border-border hover:border-luxury-bronze/30 shadow-card hover:shadow-luxury transition-smooth bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl gradient-luxury flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
