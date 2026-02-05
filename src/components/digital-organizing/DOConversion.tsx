import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Calendar } from "lucide-react";

const DOConversion = () => {
  return (
    <section id="start" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Get Started
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            Two ways to begin.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Choose the entry point that matches your readiness.
            Both lead to a structured engagement with clear deliverables.
          </p>
        </div>

        {/* Two offers */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Low-commitment entry */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Entry Point
                </p>
                <h3 className="text-xl font-bold text-slate-900">Digital Audit</h3>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <p className="text-sm text-slate-600 leading-relaxed">
                A focused assessment of your current digital environment. You receive
                a clear report of what exists, what's broken, and a prioritized action plan.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-500 mt-1 flex-shrink-0" />
                  Full inventory of accounts, files, and devices
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-500 mt-1 flex-shrink-0" />
                  Risk and security assessment
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-500 mt-1 flex-shrink-0" />
                  Prioritized roadmap for organizing
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-500 mt-1 flex-shrink-0" />
                  No obligation to continue
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-4">
                Best for: People who want to understand the scope before committing.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-teal-300 py-6 transition-all duration-300"
              >
                <Calendar className="mr-2 w-4 h-4" />
                Book a Digital Audit
              </Button>
            </div>
          </div>

          {/* High-intent entry */}
          <div className="bg-slate-900 rounded-2xl border-2 border-teal-500 p-8 flex flex-col relative">
            <div className="absolute -top-3 left-8">
              <span className="bg-teal-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-400">
                  Full Engagement
                </p>
                <h3 className="text-xl font-bold text-white">Jumpstart Session</h3>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <p className="text-sm text-slate-300 leading-relaxed">
                Go directly into organizing. Start with the audit, then immediately
                begin system installation in the same engagement. The fastest path
                from chaos to structure.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                  Includes everything in the Digital Audit
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                  Immediate system design and implementation
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                  Full documentation and handoff
                </li>
                <li className="flex items-start gap-2">
                  <ArrowRight className="w-3 h-3 text-teal-400 mt-1 flex-shrink-0" />
                  30-day follow-up check included
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800">
              <p className="text-xs text-slate-500 mb-4">
                Best for: People ready to solve this now.
              </p>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/25 py-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-teal-500/40"
              >
                Book a Jumpstart Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Decision simplicity note */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-sm text-slate-500">
            Not sure which to choose? Start with the audit.
            100% of the audit cost applies as credit toward a full engagement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DOConversion;
