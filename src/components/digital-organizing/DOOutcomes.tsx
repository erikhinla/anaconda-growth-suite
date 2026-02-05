import {
  Clock,
  Zap,
  Gauge,
  Brain,
  Bot,
  TrendingUp,
} from "lucide-react";

const outcomes = [
  {
    icon: Clock,
    title: "Time recovered",
    metric: "5-10 hours/week",
    description:
      "Eliminate searching, re-creating, switching contexts, and managing fragmented systems. That time goes directly back to revenue-generating or high-priority work.",
  },
  {
    icon: Zap,
    title: "Reduced friction",
    metric: "Single-point access",
    description:
      "Every file, account, and communication channel is accessible through one coherent structure. No more hunting across platforms.",
  },
  {
    icon: Gauge,
    title: "Faster execution",
    metric: "Immediate retrieval",
    description:
      "When your systems are organized, every action — from finding a contract to sending a proposal — happens in seconds instead of minutes.",
  },
  {
    icon: Brain,
    title: "Lower cognitive load",
    metric: "Mental bandwidth freed",
    description:
      "Disorganization occupies working memory. A structured system offloads that burden so you can focus on decisions, not file management.",
  },
  {
    icon: Bot,
    title: "AI and automation readiness",
    metric: "Structured data = better tools",
    description:
      "AI assistants, automation tools, and integrations work dramatically better when they operate on clean, labeled, structured data. Organizing your digital life is a prerequisite for leveraging these tools.",
  },
  {
    icon: TrendingUp,
    title: "Compounding returns",
    metric: "System improves over time",
    description:
      "Unlike a one-time cleanup, a system-based approach means every new file, email, and account slots into an existing structure — making you more organized the longer you use it.",
  },
];

const DOOutcomes = () => {
  return (
    <section id="outcomes" className="py-24 md:py-32 bg-slate-950">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            Outcomes & ROI
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
            What organization translates to.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The return on digital organizing is measurable in time, money, and capacity.
            These are logical outcomes, not aspirational claims.
          </p>
        </div>

        {/* Outcomes grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-teal-800 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors duration-300">
                <outcome.icon className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {outcome.title}
              </h3>
              <p className="text-sm font-medium text-teal-400 mb-3">
                {outcome.metric}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>

        {/* ROI framing */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
            <h3 className="text-lg font-bold text-white mb-4">
              Simple ROI logic
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-red-400">40+ hrs/mo</div>
                <p className="text-xs text-slate-500 mt-1">
                  Time lost to disorganization
                </p>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-400">vs.</div>
                <p className="text-xs text-slate-500 mt-1">&nbsp;</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-400">1x setup</div>
                <p className="text-xs text-slate-500 mt-1">
                  System installation cost
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-sm text-slate-400 text-center">
                The investment pays for itself within the first month. Every month after is
                net positive — in time, focus, and reduced error rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DOOutcomes;
