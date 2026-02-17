import { ArrowRight } from "lucide-react";

const beforeItems = [
  { area: "Cloud Storage", detail: "100+ loose image files in root, development artifacts (.git, node_modules) stored in Drive, duplicate folders, unnamed files" },
  { area: "Repositories", detail: "47 repos with no organization system, 4+ duplicate versions of the same project, mixed naming conventions" },
  { area: "Naming", detail: "Mix of PascalCase, kebab-case, underscores. Untitled videos, documents, and projects. No archive structure" },
  { area: "Status Clarity", detail: "No way to distinguish active from inactive projects. Forked repos with zero customization cluttering the dashboard" },
];

const afterItems = [
  { area: "Cloud Storage", detail: "Organized folder hierarchy with date-based archives, media separated by batch, dev artifacts removed" },
  { area: "Repositories", detail: "~15 active repos clearly identified, 20+ archived, one repo per business unit per purpose" },
  { area: "Naming", detail: "Consistent convention: [business-unit]-[purpose]. All files named descriptively or archived" },
  { area: "Status Clarity", detail: "README status indicators on every active repo: Active | Maintenance | Archived with deploy URLs" },
];

const steps = [
  { num: "1", title: "Archive Structure", desc: "Created temporal boundary: '_Archive - Pre Feb 2026'. Underscore prefix sorts to top. Everything old moved without deletion." },
  { num: "2", title: "File Organization", desc: "100+ loose images sorted by date batch into Media & Photos. 5-10GB of root clutter eliminated in one operation." },
  { num: "3", title: "Duplicate Consolidation", desc: "Desktop, Downloads, and project variant folders merged. One source of truth per project established." },
  { num: "4", title: "Artifact Removal", desc: "Development files (.git, .next, .vscode, node_modules) removed from cloud storage. These belong in local ~/Projects." },
  { num: "5", title: "Repo Cleanup", desc: "47 repos reduced to ~15 active. Duplicates archived. Forks with zero customization deleted. Naming convention applied." },
];

const DOCaseStudy = () => {
  return (
    <section id="case-study" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Case Study
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            From chaos to system. Documented live.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Our founder ran Digital Organizing on his own infrastructure first.
            Not as a demo &mdash; because it needed it. Here is the real before, process, and after.
          </p>
        </div>

        {/* The Meta Insight */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-teal-400 text-lg font-bold">!</span>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">The Meta Problem</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  You cannot sell Digital Organizing if you do not organize your own digital space.
                  This is not hypocrisy &mdash; it is a credibility gap. So we fixed it first. This cleanup
                  became the product demo, the SOP, the pricing justification, and the feature requirements
                  &mdash; all from one real engagement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Before / After Grid */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
          {/* Before */}
          <div className="bg-red-50/50 rounded-2xl border border-red-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <span className="text-red-500 text-xs font-bold">B</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Before State</h3>
            </div>
            <div className="space-y-4">
              {beforeItems.map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">{item.area}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            {/* Metrics */}
            <div className="mt-6 pt-6 border-t border-red-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-red-400">100+</p>
                <p className="text-xs text-slate-500">Loose files in root</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">47</p>
                <p className="text-xs text-slate-500">Unorganized repos</p>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="bg-teal-50/50 rounded-2xl border border-teal-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 text-xs font-bold">A</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">After State</h3>
            </div>
            <div className="space-y-4">
              {afterItems.map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-sm font-semibold text-slate-800">{item.area}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            {/* Metrics */}
            <div className="mt-6 pt-6 border-t border-teal-100 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-teal-500">&lt;20</p>
                <p className="text-xs text-slate-500">Organized folders</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-500">~15</p>
                <p className="text-xs text-slate-500">Active repos (clear)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-6 text-center">The Process (5 Steps, 4-6 Hours Total)</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 h-full">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-teal-400 flex items-center justify-center text-xs font-bold mb-3">
                    {step.num}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Key Insight */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-teal-50 rounded-2xl border border-teal-100 p-8">
            <p className="text-slate-700 text-sm leading-relaxed mb-4">
              The same problems this operator had are exactly what every client experiences:
              too many files in wrong places, duplicate folders, unclear naming, no archive strategy,
              and no way to tell what is active versus dead.
            </p>
            <p className="text-teal-700 text-sm font-semibold">
              The operator's solution became the client's solution. That is product validation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DOCaseStudy;
