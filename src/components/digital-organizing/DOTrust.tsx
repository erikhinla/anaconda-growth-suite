import {
  Shield,
  Award,
  FileText,
  Lock,
  Eye,
  Settings,
} from "lucide-react";

const signals = [
  {
    icon: Award,
    title: "Professional organizing expertise",
    description:
      "OCD Experience operates as a professional organizing practice — not a tech company, not a freelancer. Digital organizing is delivered with the same methodology applied to physical spaces: systematic, thorough, and built to last.",
  },
  {
    icon: FileText,
    title: "Documented methodology",
    description:
      "Every engagement follows a published process with defined phases, deliverables, and handoff criteria. There is no ambiguity about what you receive or how the work proceeds.",
  },
  {
    icon: Settings,
    title: "System ownership transfers to you",
    description:
      "You are not renting access to a proprietary platform. Every system installed uses tools you already own or can freely access. The documentation is yours. The structure is yours. You maintain full control.",
  },
  {
    icon: Lock,
    title: "Data security and privacy",
    description:
      "All credentials are handled through encrypted password managers. No account information is stored outside the engagement. Access is revoked upon completion. Privacy protocols are followed throughout.",
  },
  {
    icon: Eye,
    title: "Transparency in scope",
    description:
      "Pricing, timelines, and deliverables are stated before work begins. If scope changes, it is discussed and agreed upon in advance. No hidden fees, no scope creep without consent.",
  },
  {
    icon: Shield,
    title: "Client-appropriate tooling",
    description:
      "Tool recommendations are based on your needs, budget, and technical comfort level — not commissions or partnerships. If your existing tools work, they stay.",
  },
];

const DOTrust = () => {
  return (
    <section id="trust" className="py-24 md:py-32 bg-slate-950">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-400">
            Trust & Method
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
            How this service earns trust.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            No testimonials. No social proof theater.
            Trust is built through method clarity, ownership, and transparency.
          </p>
        </div>

        {/* Trust signals grid */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {signals.map((signal, i) => (
            <div
              key={i}
              className="bg-slate-900 rounded-2xl border border-slate-800 p-6 hover:border-slate-700 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <signal.icon className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {signal.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DOTrust;
