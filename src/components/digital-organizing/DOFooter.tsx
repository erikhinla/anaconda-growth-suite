import { FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const DOFooter = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      {/* Final CTA band */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-balance">
            Your digital systems will not organize themselves.
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Every week without a system is another week of compounding disorganization.
            The audit takes one session. The payoff lasts permanently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/25 px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-teal-500/40"
            >
              Book Your Digital Audit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white px-8 py-6 transition-all duration-300"
            >
              See How the Process Works
            </Button>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center">
                <FolderOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-semibold text-white">OCD Experience</span>
                <span className="text-xs text-slate-500 ml-2">Digital Organizing</span>
              </div>
            </div>

            {/* Nav links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <a href="#problem" className="text-slate-500 hover:text-white transition-colors duration-300">
                The Problem
              </a>
              <a href="#service" className="text-slate-500 hover:text-white transition-colors duration-300">
                Service
              </a>
              <a href="#process" className="text-slate-500 hover:text-white transition-colors duration-300">
                Process
              </a>
              <a href="#outcomes" className="text-slate-500 hover:text-white transition-colors duration-300">
                Outcomes
              </a>
              <a href="#faq" className="text-slate-500 hover:text-white transition-colors duration-300">
                FAQ
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} OCD Experience. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DOFooter;
