import {
  Search,
  Users,
  BookOpen,
  Target,
  ClipboardList,
  Handshake,
  ArrowRight,
  Layers,
  Globe,
  BarChart3,
} from "lucide-react";

const intentLevels = [
  {
    level: "High Intent",
    color: "teal",
    icon: Target,
    sources: ["Search: 'digital organizing service near me'", "Direct referrals from professionals", "Return visits from audit leads"],
    matchedAsset: "Conversion page (this page) with direct CTA",
    description: "These visitors have an identified problem and are actively seeking a solution. Send them directly to the booking flow.",
  },
  {
    level: "Mid Intent",
    color: "cyan",
    icon: BookOpen,
    sources: ["Educational content: 'how to organize digital files'", "Self-assessment tool results", "Social media problem-identification posts"],
    matchedAsset: "Assessment tool or educational landing page with soft CTA",
    description: "These visitors recognize the problem but have not yet decided to hire. Educate, then qualify through self-assessment.",
  },
  {
    level: "Low Intent",
    color: "slate",
    icon: Globe,
    sources: ["Blog / content discovery: 'digital clutter tips'", "Social media browsing", "Podcast or media mentions"],
    matchedAsset: "Content hub with email capture for ongoing nurture",
    description: "These visitors are problem-aware at most. Capture attention, deliver value, and build a retargetable audience.",
  },
];

const searchCategories = [
  {
    category: "Problem-based",
    icon: Search,
    examples: [
      "How to organize digital files",
      "Email inbox overwhelm solutions",
      "Too many passwords to manage",
      "Digital clutter affecting productivity",
    ],
  },
  {
    category: "Service-based",
    icon: Layers,
    examples: [
      "Digital organizing service",
      "Professional digital organizer",
      "Help organizing computer files",
      "Digital declutter professional",
    ],
  },
  {
    category: "Diagnostic-based",
    icon: ClipboardList,
    examples: [
      "How disorganized am I digitally",
      "Digital organization assessment",
      "Signs you need a digital organizer",
      "Cost of digital disorganization",
    ],
  },
];

const referralPartners = [
  {
    partner: "Professional organizers (physical)",
    logic: "Clients who hire physical organizers often have digital environments in equal disarray. Natural cross-referral.",
  },
  {
    partner: "Business coaches and consultants",
    logic: "Coaches identify operational bottlenecks in their clients. Digital disorganization is a common root cause they cannot solve themselves.",
  },
  {
    partner: "Accountants and financial advisors",
    logic: "These professionals deal directly with clients who cannot find documents, miss deadlines, and have no filing systems.",
  },
  {
    partner: "Virtual assistants and EAs",
    logic: "VAs inherit chaotic digital environments from their employers. They benefit from recommending organization before they start.",
  },
  {
    partner: "Therapists and ADHD coaches",
    logic: "Digital overwhelm is a frequent complaint in these contexts. Organized systems are a practical intervention these professionals can recommend.",
  },
];

const DOTraffic = () => {
  return (
    <section id="traffic" className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Traffic Frameworks
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            Repeatable systems for driving qualified traffic.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Not campaigns. Frameworks. These are structural systems for
            connecting the service to the people who need it.
          </p>
        </div>

        {/* 1. Intent-Based Traffic Sources */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            1. Intent-based traffic mapping
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Route traffic to the right asset based on where the visitor is in their decision process.
          </p>

          <div className="space-y-4">
            {intentLevels.map((level, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="flex items-center gap-3 lg:w-40 flex-shrink-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      level.color === "teal"
                        ? "bg-teal-100"
                        : level.color === "cyan"
                        ? "bg-cyan-100"
                        : "bg-slate-100"
                    }`}>
                      <level.icon className={`w-5 h-5 ${
                        level.color === "teal"
                          ? "text-teal-600"
                          : level.color === "cyan"
                          ? "text-cyan-600"
                          : "text-slate-600"
                      }`} />
                    </div>
                    <span className={`text-sm font-bold ${
                      level.color === "teal"
                        ? "text-teal-700"
                        : level.color === "cyan"
                        ? "text-cyan-700"
                        : "text-slate-700"
                    }`}>
                      {level.level}
                    </span>
                  </div>

                  <div className="flex-1 grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Sources
                      </p>
                      <ul className="space-y-1">
                        {level.sources.map((s, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-slate-600">
                            <ArrowRight className="w-3 h-3 text-slate-400 mt-1 flex-shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Matched Asset
                      </p>
                      <p className="text-sm text-slate-600">{level.matchedAsset}</p>
                      <p className="text-xs text-slate-400 mt-2">{level.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Search Framework */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            2. Search framework (SEO logic)
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Search categories organized by visitor intent. Content should map to each category.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {searchCategories.map((cat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center">
                    <cat.icon className="w-4 h-4 text-teal-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{cat.category}</h4>
                </div>
                <ul className="space-y-2">
                  {cat.examples.map((ex, j) => (
                    <li key={j} className="text-sm text-slate-500 flex items-start gap-2">
                      <Search className="w-3 h-3 text-slate-300 mt-1 flex-shrink-0" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Assessment-Driven Traffic */}
        <div className="max-w-5xl mx-auto mb-20">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            3. Assessment-driven traffic
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            A diagnostic-first entry point that pre-qualifies leads through self-identification.
          </p>

          <div className="bg-white rounded-2xl border border-teal-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  "How organized is your digital life?"
                </h4>
                <p className="text-sm text-slate-500">Self-scoring diagnostic tool</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Mechanism
                </p>
                <p className="text-sm text-slate-600">
                  5-8 questions scoring file organization, email management, password hygiene,
                  device sync, and backup status. Each answer maps to a severity tier.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Result
                </p>
                <p className="text-sm text-slate-600">
                  Score-based output: "Structured," "Fragmented," or "Critical." Each tier
                  maps to a specific CTA — content for Structured, audit for Fragmented,
                  jumpstart for Critical.
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Pre-qualification
                </p>
                <p className="text-sm text-slate-600">
                  The assessment itself teaches visitors what "organized" looks like, surfaces
                  blind spots, and creates urgency through self-identified gaps — before any
                  sales conversation occurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Partner & Referral Loops */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            4. Partner and referral loops
          </h3>
          <p className="text-sm text-slate-500 mb-8">
            Professionals who naturally encounter digitally disorganized clients.
            This service plugs into their workflow as a complementary resource.
          </p>

          <div className="space-y-3">
            {referralPartners.map((rp, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex items-center gap-3 sm:w-64 flex-shrink-0">
                  <Handshake className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-900">{rp.partner}</span>
                </div>
                <p className="text-sm text-slate-500">{rp.logic}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-teal-50 rounded-xl border border-teal-100 p-6">
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-teal-700">Referral mechanics: </span>
              Provide partners with a simple referral link or code. Offer a mutual benefit —
              discounted audit for referred clients, referral credit for partners. Track via
              UTM parameters or unique codes. The goal is distribution leverage through people
              who already have trust with the target audience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DOTraffic;
