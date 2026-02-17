import { Bot, FolderSync, ShieldCheck, FileSearch, Mail, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

const capabilities = [
  {
    icon: FileSearch,
    title: "Audit Automation",
    desc: "ClawBot scans your file systems, cloud accounts, and repositories to generate a complete digital inventory — no manual cataloging required.",
  },
  {
    icon: FolderSync,
    title: "Structure Generation",
    desc: "Based on your audit results, ClawBot designs naming conventions, folder hierarchies, and archive structures tailored to your workflow.",
  },
  {
    icon: Mail,
    title: "Email & Calendar Triage",
    desc: "Automated rule generation for email filters, labels, and archive policies. ClawBot analyzes your patterns and builds the triage system.",
  },
  {
    icon: ShieldCheck,
    title: "Security Hardening",
    desc: "Identifies reused passwords, unencrypted storage, and abandoned accounts. Generates a remediation checklist with priority rankings.",
  },
  {
    icon: Database,
    title: "Ongoing Monitoring",
    desc: "After system installation, ClawBot runs periodic checks to detect drift — duplicate files, inbox buildup, sync failures — before they compound.",
  },
  {
    icon: Bot,
    title: "Natural Language Interface",
    desc: "Ask ClawBot: 'Where is my Q4 report?' or 'What subscriptions am I paying for?' and get answers from your organized system instantly.",
  },
];

const DOClawBot = () => {
  return (
    <section id="clawbot" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b22_1px,transparent_1px),linear-gradient(to_bottom,#1e293b22_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm mb-4">
            <Bot className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-slate-300">
              Powered by ClawBot Agentic AI
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
            Digital organizing, accelerated by AI.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            ClawBot is an agentic AI that executes digital organizing tasks autonomously.
            It does not just recommend — it audits, structures, and monitors your systems in real time.
          </p>
        </div>

        {/* Capability grid */}
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm hover:border-teal-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4">
                <cap.icon className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{cap.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
            </div>
          ))}
        </div>

        {/* How it works flow */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-white font-semibold text-lg mb-6 text-center">How ClawBot Integrates With Your Engagement</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">1</span>
                </div>
                <h4 className="text-white text-sm font-semibold mb-2">Connect</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Grant ClawBot access to your cloud accounts, email, and storage. All connections are encrypted and revocable.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">2</span>
                </div>
                <h4 className="text-white text-sm font-semibold mb-2">Analyze & Execute</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  ClawBot scans, categorizes, and organizes — surfacing decisions to you and executing approved actions autonomously.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
                  <span className="text-teal-400 font-bold">3</span>
                </div>
                <h4 className="text-white text-sm font-semibold mb-2">Monitor</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Post-handoff, ClawBot watches for system drift and alerts you before clutter accumulates again.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-xl mx-auto text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white shadow-lg shadow-teal-500/25 text-base px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-teal-500/40"
          >
            <Bot className="mr-2 w-5 h-5" />
            Start a ClawBot-Powered Audit
          </Button>
          <p className="text-xs text-slate-500 mt-4">
            ClawBot runs alongside our human consultants. AI handles the scanning and structure; humans handle the judgment calls.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DOClawBot;
