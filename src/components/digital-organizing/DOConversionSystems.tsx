import {
  ArrowRight,
  TrendingUp,
  RefreshCcw,
  Database,
  Layers,
  ChevronRight,
} from "lucide-react";

const ladderSteps = [
  {
    stage: "Entry",
    name: "Digital Audit",
    purpose: "Low-commitment entry. Demonstrates value without requiring trust.",
    mechanics:
      "Client receives a tangible deliverable (audit report + priority roadmap) that they own regardless of whether they continue. This converts skeptics into informed prospects.",
    transition: "100% of audit cost applies as credit toward a full engagement.",
  },
  {
    stage: "Core",
    name: "Jumpstart Session",
    purpose: "Full system installation. This is the primary revenue engagement.",
    mechanics:
      "Audit + design + implementation + documentation + handoff in a structured multi-session package. The client walks away with a complete, documented digital system.",
    transition: "30-day follow-up included. Natural point to introduce maintenance.",
  },
  {
    stage: "Expansion",
    name: "Ongoing Support & Evolution",
    purpose: "Retention through natural system evolution.",
    mechanics:
      "Quarterly check-ins, expansion for new tools or team members, reconfiguration for life or business changes. Optional — not required for the core system to work.",
    transition: "Clients self-select back in when their systems outgrow their current structure.",
  },
];

const retentionTriggers = [
  {
    trigger: "New tools or platforms adopted",
    timing: "When client adds a new app, service, or workflow",
    action: "Integration session to fold new tools into existing structure",
  },
  {
    trigger: "Role or business change",
    timing: "New job, new clients, company pivot",
    action: "System reconfiguration to match new operational requirements",
  },
  {
    trigger: "System drift over time",
    timing: "6-12 months post-engagement",
    action: "Quarterly health check to identify and correct drift before it compounds",
  },
  {
    trigger: "Team growth",
    timing: "Hiring first employee, bringing on contractors",
    action: "Shared system design — file access, communication channels, credential management",
  },
  {
    trigger: "Security event or scare",
    timing: "Password breach notification, account compromise",
    action: "Emergency security audit and credential rotation",
  },
];

const dataPoints = [
  {
    data: "Digital inventory",
    value: "Comprehensive map of client's entire digital footprint",
    use: "Enables precise scoping for future engagements and personalized maintenance recommendations",
  },
  {
    data: "Complexity scoring",
    value: "Quantified measure of organizational debt",
    use: "Benchmarks for measuring improvement; data for marketing (anonymized averages)",
  },
  {
    data: "Tool and platform usage",
    value: "Which platforms each client uses and how",
    use: "Informs tool recommendations, identifies common stacks, and enables targeted content creation",
  },
  {
    data: "Maintenance adherence",
    value: "Whether clients follow the weekly maintenance protocol",
    use: "Predicts which clients will need re-engagement; triggers proactive outreach",
  },
];

const DOConversionSystems = () => {
  return (
    <section id="systems" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Conversion Systems
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            Post-click architecture.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            The conversion ladder, retention logic, and data capture systems
            that turn single transactions into long-term client relationships.
          </p>
        </div>

        {/* 1. Conversion Ladder */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            1. Conversion ladder
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Three stages, each with a clear purpose and a natural transition to the next.
          </p>

          <div className="space-y-4">
            {ladderSteps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-teal-200 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        i === 0
                          ? "bg-slate-100 text-slate-600"
                          : i === 1
                          ? "bg-teal-100 text-teal-700"
                          : "bg-cyan-100 text-cyan-700"
                      }`}>
                        <Layers className="w-3 h-3" />
                        {step.stage}
                      </div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <h4 className="text-lg font-bold text-slate-900">{step.name}</h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Purpose
                          </p>
                          <p className="text-sm text-slate-600">{step.purpose}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Mechanics
                          </p>
                          <p className="text-sm text-slate-600">{step.mechanics}</p>
                        </div>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                        <p className="text-xs text-teal-700">
                          <span className="font-semibold">Transition: </span>
                          {step.transition}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {i < ladderSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ChevronRight className="w-5 h-5 text-slate-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Retention & Expansion Logic */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            2. Retention and expansion logic
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            What naturally breaks over time, and when clients should re-engage.
            These triggers make re-engagement feel inevitable, not salesy.
          </p>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-slate-800">
              <div className="bg-slate-900 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  Trigger
                </p>
              </div>
              <div className="bg-slate-900 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  Timing
                </p>
              </div>
              <div className="bg-slate-900 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  Re-engagement Action
                </p>
              </div>
            </div>
            {retentionTriggers.map((rt, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-px bg-slate-800"
              >
                <div className="bg-slate-900 p-4">
                  <p className="text-sm text-white font-medium">{rt.trigger}</p>
                </div>
                <div className="bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">{rt.timing}</p>
                </div>
                <div className="bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">{rt.action}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-3">
              <RefreshCcw className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Key principle: </span>
                The service is designed so that the system works independently. Re-engagement
                is triggered by life changes, not system failure. This positions follow-on work
                as evolution, not repair.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Data Capture & Ownership */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            3. Data capture and ownership
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Every engagement generates structured data that improves future service delivery.
            Digital organizing is future-proofing.
          </p>

          <div className="space-y-3">
            {dataPoints.map((dp, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-5 hover:border-teal-200 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                    <Database className="w-4 h-4 text-teal-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-900">
                      {dp.data}
                    </span>
                  </div>
                  <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        What it is
                      </p>
                      <p className="text-sm text-slate-600">{dp.value}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                        Why it matters
                      </p>
                      <p className="text-sm text-slate-600">{dp.use}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-teal-50 rounded-xl border border-teal-100 p-6">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">
                <span className="font-semibold text-teal-700">Future-proofing frame: </span>
                Every organized digital system becomes a platform for automation, AI tooling,
                and scaling. Clients who organize now are building the infrastructure their
                future tools will require. This positions the service as an investment in capability,
                not a cost of maintenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DOConversionSystems;
