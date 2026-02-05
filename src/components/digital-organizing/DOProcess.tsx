import {
  ClipboardCheck,
  Wrench,
  PackageCheck,
  RefreshCcw,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Intake & Audit",
    subtitle: "Understand the current state",
    details: [
      "Inventory of all devices, accounts, and platforms",
      "Assessment of current file structures and naming patterns",
      "Identification of redundancies, gaps, and security risks",
      "Priority mapping based on impact and urgency",
    ],
    outcome: "You receive a clear picture of what exists, what's broken, and what needs to happen.",
  },
  {
    number: "02",
    icon: Wrench,
    title: "Organizing Phase",
    subtitle: "Build the system",
    details: [
      "Design and implement folder architecture across all platforms",
      "Email triage: unsubscribe, filter, label, archive",
      "Calendar consolidation and scheduling structure",
      "Password migration to a secure manager with unique credentials",
      "Device synchronization and cloud configuration",
    ],
    outcome: "Your digital environment is restructured around a single coherent system.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "System Handoff",
    subtitle: "Transfer ownership to you",
    details: [
      "Walkthrough of every system installed",
      "Written documentation of file structures, naming conventions, and rules",
      "Training on maintenance routines (15 minutes/week)",
      "Emergency recovery protocols documented",
    ],
    outcome: "You own the system. You understand it. You can maintain it without ongoing help.",
  },
  {
    number: "04",
    icon: RefreshCcw,
    title: "Maintenance & Follow-On",
    subtitle: "Optional ongoing support",
    details: [
      "Quarterly system health checks",
      "Expansion as new tools or workflows are added",
      "Reconfiguration when roles or businesses change",
      "Priority support for urgent issues",
    ],
    outcome: "Your system evolves with you instead of degrading over time.",
  },
];

const DOProcess = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            How the Engagement Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            What happens after you click "Book."
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A structured four-phase process designed to reduce friction at every step.
            No surprises, no ambiguity.
          </p>
        </div>

        {/* Process steps */}
        <div className="max-w-4xl mx-auto space-y-8">
          {steps.map((step, i) => (
            <div key={i} className="group">
              <div className="bg-white rounded-2xl border border-slate-200 hover:border-teal-200 p-8 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Step number + icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 group-hover:bg-teal-600 flex items-center justify-center transition-colors duration-300">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-300 mt-2 text-center">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400">{step.subtitle}</p>
                    </div>

                    <ul className="space-y-2">
                      {step.details.map((detail, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <ArrowRight className="w-3 h-3 text-teal-500 mt-1.5 flex-shrink-0" />
                          <span className="text-sm text-slate-600">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <p className="text-sm text-slate-700">
                        <span className="font-semibold text-teal-700">Outcome: </span>
                        {step.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-px h-6 bg-slate-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DOProcess;
