import {
  Clock,
  AlertTriangle,
  BrainCircuit,
  DollarSign,
  Search,
  FolderX,
  Mail,
  Lock,
} from "lucide-react";

const symptoms = [
  {
    icon: FolderX,
    label: "Files scattered across 4+ platforms",
  },
  {
    icon: Mail,
    label: "Inbox at 10,000+ unread",
  },
  {
    icon: Lock,
    label: "Passwords reused or forgotten",
  },
  {
    icon: Search,
    label: "Minutes lost searching for things daily",
  },
];

const costs = [
  {
    icon: Clock,
    metric: "5-10 hours/week",
    label: "Lost to searching, switching, and re-doing",
    description:
      "Time spent locating files, recreating lost work, and navigating fragmented systems compounds into full workdays lost each month.",
  },
  {
    icon: DollarSign,
    metric: "Revenue leakage",
    label: "Missed follow-ups, lost proposals, delayed responses",
    description:
      "Disorganized systems cause dropped leads, late invoices, and missed deadlines. The cost is invisible until you measure it.",
  },
  {
    icon: BrainCircuit,
    metric: "Cognitive overload",
    label: "Decision fatigue from system chaos",
    description:
      "Every disorganized file, cluttered inbox, and unsorted folder occupies mental bandwidth that should go to high-value work.",
  },
  {
    icon: AlertTriangle,
    metric: "Security exposure",
    label: "Weak passwords, shared accounts, no backups",
    description:
      "Without structured credentials and access management, a single breach can cascade across every account and device you own.",
  },
];

const DOProblem = () => {
  return (
    <section id="problem" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Why This Exists
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            Digital disorganization is a hidden operational tax.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Most people treat digital clutter as a minor inconvenience. It is not. It is a
            compounding cost that affects every part of how you work.
          </p>
        </div>

        {/* Symptoms vs. Root Cause */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Symptoms */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Symptoms you recognize
              </h3>
              <div className="space-y-4">
                {symptoms.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <s.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-slate-600 text-sm leading-relaxed">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Root cause */}
            <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-6">
                Root cause
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                These are not separate problems. They are all outputs of the same
                input:{" "}
                <span className="text-teal-400 font-medium">
                  the absence of a system.
                </span>
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Without intentional digital infrastructure, every new file, email,
                account, and device adds entropy. The longer it compounds, the more
                time, money, and focus it costs.
              </p>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-2">
                  The fix is not cleanup. It is installation.
                </p>
                <p className="text-teal-400 text-sm font-medium">
                  You need a system, not a session.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quantified costs */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400 mb-10">
            What disorganization actually costs
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {costs.map((cost, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-200 hover:shadow-lg hover:shadow-teal-500/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors duration-300">
                    <cost.icon className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold text-slate-900">
                      {cost.metric}
                    </div>
                    <div className="text-sm font-medium text-slate-600">
                      {cost.label}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pt-1">
                      {cost.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DOProblem;
