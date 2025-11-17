import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: "Services" },
    { href: "#calculator", label: "ROI Calculator" },
    { href: "#packages", label: "Packages" },
    { href: "#about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg gradient-luxury flex items-center justify-center transition-smooth group-hover:scale-105">
              <span className="text-primary-foreground font-bold text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-lg leading-none">
                Anaconda Aesthetics
              </span>
              <span className="text-xs text-muted-foreground tracking-wider">
                Scale With AI Intelligence
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground/70 hover:text-foreground transition-smooth text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
            <Button className="gradient-luxury text-primary-foreground shadow-luxury">
              Book Audit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-6 space-y-4 animate-in slide-in-from-top">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-foreground/70 hover:text-foreground transition-smooth text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full gradient-luxury text-primary-foreground shadow-luxury">
              Book Audit
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
