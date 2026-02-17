import { Check, X } from "lucide-react";

const goodFit = [
  "You run a business, practice, or creative operation and your digital environment has grown faster than your ability to manage it.",
  "You know you are losing time but do not know where to start fixing it.",
  "You want a system you own and can maintain — not an ongoing dependency.",
  "You are preparing to scale, hire, or adopt new tools and need clean infrastructure first.",
  "You value structure and are willing to invest in getting it right once.",
];

const badFit = [
  "You want someone to do ongoing admin work (this is system design, not virtual assistance).",
  "You are looking for tech support or troubleshooting for broken hardware.",
  "You want a quick tidying session but are not interested in maintaining a system.",
  "You are not willing to spend 15 minutes per week maintaining the structure after handoff.",
  "You need enterprise-level IT infrastructure or managed services for a team of 50+.",
];

const DOFitFilter = () => {
  return (
    <section id="fit" className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Is This for You?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            This service is designed for specific situations.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Knowing if this is the right fit before you engage saves time on both sides.
            Read both columns honestly.
          </p>
        </div>

        {/* Two columns */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Good fit */}
          <div className="bg-white rounded-2xl border border-teal-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                This is for you if
              </h3>
            </div>
            <div className="space-y-4">
              {goodFit.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-teal-600" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bad fit */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <X className="w-4 h-4 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                This is not for you if
              </h3>
            </div>
            <div className="space-y-4">
              {badFit.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-sm text-slate-600 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clarifier */}
        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-sm text-slate-500">
            If you see yourself in the left column, this service was designed for you.
            If the right column is a better match, we can recommend alternatives during your initial consultation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DOFitFilter;
