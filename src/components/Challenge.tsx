import { AlertCircle, Clock, Users, MessageSquare } from "lucide-react";

const Challenge = () => {
  const challenges = [
    {
      icon: Clock,
      title: "Slow Replies",
      description: "Missed opportunities from delayed responses",
    },
    {
      icon: AlertCircle,
      title: "Missed Calls",
      description: "Lost revenue from unanswered inquiries",
    },
    {
      icon: Users,
      title: "Staff Overload",
      description: "Team stretched thin managing communications",
    },
    {
      icon: MessageSquare,
      title: "Inconsistent Follow-up",
      description: "Potential clients slipping through the cracks",
    },
  ];

  return (
    <section className="py-32 bg-clinical-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--luxury-sand))_0%,transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            The Challenge
          </h2>
          <p className="text-xl text-foreground/80 leading-relaxed">
            Your clinic delivers excellence.
            <br />
            <span className="text-muted-foreground">Your follow-up system shouldn't feel outdated.</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {challenges.map((item, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover:border-luxury-bronze/30 shadow-card transition-smooth hover:shadow-luxury"
            >
              <div className="w-12 h-12 rounded-xl gradient-luxury flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-foreground/80 font-medium">
            We eliminate that friction.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
