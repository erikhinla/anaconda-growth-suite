import {
  HardDrive,
  Mail,
  ShieldCheck,
  Smartphone,
  FolderTree,
  Network,
  FileCheck,
  BookOpen,
  ArrowDown,
} from "lucide-react";

const inputs = [
  { icon: HardDrive, label: "Files, folders, and cloud storage across all platforms" },
  { icon: Mail, label: "Email accounts, calendars, and contact lists" },
  { icon: ShieldCheck, label: "Passwords, accounts, and security settings" },
  { icon: Smartphone, label: "Devices, apps, and synchronization states" },
];

const systems = [
  { icon: FolderTree, label: "Unified file architecture with consistent naming and hierarchy" },
  { icon: Network, label: "Cross-platform sync so every device mirrors the same structure" },
  { icon: ShieldCheck, label: "Password management with secure, unique credentials per account" },
  { icon: Mail, label: "Email triage system with filters, labels, and archive rules" },
];

const outputs = [
  { icon: FileCheck, label: "A fully organized digital environment you control" },
  { icon: BookOpen, label: "Documentation of your system so you can maintain it" },
  { icon: Network, label: "Connected devices that stay in sync without manual effort" },
  { icon: ShieldCheck, label: "Hardened security with recovery protocols in place" },
];

const DOClarity = () => {
  return (
    <section id="service" className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            What Digital Organizing Actually Is
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            System installation, not cleanup.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Digital organizing is the design and implementation of a permanent operating
            structure for your files, communications, accounts, and devices.
          </p>
        </div>

        {/* Three-tier flow: Inputs → Systems → Outputs */}
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Inputs — What gets organized
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {inputs.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-teal-600" />
            </div>
          </div>

          {/* Systems */}
          <div className="bg-white rounded-2xl border border-teal-200 p-8 ring-1 ring-teal-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Systems — How it's structured
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {systems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-teal-600" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
              <ArrowDown className="w-5 h-5 text-teal-600" />
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-slate-900 rounded-2xl border border-slate-700 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center">
                <span className="text-slate-900 text-xs font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Outputs — What you walk away with
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {outputs.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-teal-400" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reframe */}
        <div className="max-w-3xl mx-auto text-center mt-16">
          <div className="bg-teal-50 rounded-2xl border border-teal-100 p-8">
            <p className="text-slate-700 text-sm leading-relaxed">
              This is not about tidying up your desktop. It is about building the digital
              infrastructure that lets you work at full capacity — and keep working that way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DOClarity;
