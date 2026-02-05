import { useState } from "react";
import { Menu, X, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const DONavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#problem", label: "The Problem" },
    { href: "#service", label: "The Service" },
    { href: "#process", label: "Process" },
    { href: "#outcomes", label: "Outcomes" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-white text-lg leading-none">OCD Experience</span>
              <span className="text-xs text-slate-400 tracking-wider">Digital Organizing</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-400 hover:to-cyan-300 shadow-lg shadow-teal-500/20">
              Book a Session
            </Button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4 animate-in slide-in-from-top">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-slate-400 hover:text-white transition-colors duration-300 text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-400 text-white hover:from-teal-400 hover:to-cyan-300">
              Book a Session
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DONavigation;
