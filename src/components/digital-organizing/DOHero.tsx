import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, FolderSync } from "lucide-react";

const DOHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b33_1px,transparent_1px),linear-gradient(to_bottom,#1e293b33_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Glow accents */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-cyan-400/8 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Context badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm">
            <FolderSync className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-slate-300">
              Professional Digital Infrastructure
            </span>
          </div>

          {/* Problem statement - cause */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight text-balance leading-tight">
            Your digital systems are costing you
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300 mt-2">
              hours every week.
            </span>
          </h1>

          {/* Effect → Result */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Scattered files, overflowing inboxes, and fragmented tools create invisible drag on your work.
            Digital organizing eliminates it — permanently.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/25 text-base px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-teal-500/40"
            >
              Start With a Digital Audit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white text-base px-8 py-6 transition-all duration-300"
            >
              <Monitor className="mr-2 w-5 h-5" />
              See What's Included
            </Button>
          </div>

          {/* Quantified anchors */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-3xl mx-auto">
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-teal-400">5-10h</div>
              <div className="text-sm text-slate-500">Recovered per week</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-teal-400">100%</div>
              <div className="text-sm text-slate-500">System ownership</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-bold text-teal-400">1x</div>
              <div className="text-sm text-slate-500">Setup, not recurring</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-700 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-teal-400" />
        </div>
      </div>
    </section>
  );
};

export default DOHero;
