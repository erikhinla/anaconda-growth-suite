const Footer = () => {
  return (
    <footer className="bg-clinical-white border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-luxury flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">A</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground leading-none">Anaconda Aesthetics</span>
                <span className="text-xs text-muted-foreground">Scale With AI</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI growth systems for luxury medical-aesthetic locations in Los Angeles and the San Fernando Valley.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  AI Voice Concierge
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Lead Automation
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  CRM Integration
                </a>
              </li>
              <li>
                <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Website & SEO
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  About
                </a>
              </li>
              <li>
                <a href="#calculator" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  ROI Calculator
                </a>
              </li>
              <li>
                <a href="#packages" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Packages
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Location</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Serving luxury medical-aesthetic clinics in:
              <br />
              Los Angeles
              <br />
              Sherman Oaks
              <br />
              San Fernando Valley
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 Anaconda Aesthetics. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
