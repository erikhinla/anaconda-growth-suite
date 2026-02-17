import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is this just tech support?",
    answer:
      "No. Tech support fixes broken things. Digital organizing builds systems. We are not troubleshooting your Wi-Fi or updating your operating system. We are designing the information architecture that governs how you store, access, and manage everything digital in your life and work. The output is a structured, documented system — not a repair ticket.",
    blocker: "Misconception about service scope",
  },
  {
    question: "Will this actually stick? I've tried organizing before.",
    answer:
      "Previous attempts likely failed because they were cleanup sessions, not system installations. Cleaning up without building a system is like organizing a closet without shelves — it reverts within weeks. Our approach installs the structure itself: naming conventions, folder hierarchies, automation rules, and maintenance routines. You also receive written documentation and a 15-minute weekly maintenance protocol designed to keep the system intact. The system is designed to be self-sustaining.",
    blocker: "Fear of temporary results",
  },
  {
    question: "What tools or platforms do you use?",
    answer:
      "We work with whatever tools you already use or prefer — Google Workspace, Microsoft 365, iCloud, Dropbox, Notion, or others. We do not sell proprietary software or require you to switch platforms. If a tool change would significantly improve your system, we will recommend it with a clear rationale, but the decision is always yours. Password management typically uses industry-standard tools like 1Password or Bitwarden.",
    blocker: "Tool lock-in concern",
  },
  {
    question: "How long does the process take?",
    answer:
      "A Digital Audit is typically completed in one session. A full Jumpstart engagement — from audit through system handoff — depends on the complexity of your digital environment. Most individual engagements complete within 1-3 sessions. You will receive a clear scope estimate after the initial audit, before any commitment to the full engagement.",
    blocker: "Time commitment uncertainty",
  },
  {
    question: "What happens after the engagement ends?",
    answer:
      "You own everything. The systems, the documentation, the structure — all of it is yours. You will have a written maintenance guide and a weekly routine to keep things organized. If you want ongoing support, quarterly check-ins are available as an optional add-on. But the goal is independence: you should not need us after handoff.",
    blocker: "Dependency concern",
  },
  {
    question: "Do you need access to my accounts and passwords?",
    answer:
      "During the engagement, we may need temporary access to organize specific platforms. All access is handled through encrypted channels, never stored outside the engagement, and fully revoked upon completion. We follow strict privacy protocols. You are in control of what access is granted and when.",
    blocker: "Privacy and security concern",
  },
  {
    question: "Can you work with my team or just individuals?",
    answer:
      "Both. Individual engagements focus on personal digital infrastructure. For small teams (2-10 people), we can design shared systems — file structures, communication channels, and access management — that keep everyone aligned. For larger organizations, we recommend a scoping conversation to determine fit.",
    blocker: "Scope applicability concern",
  },
  {
    question: "What if my situation is really bad?",
    answer:
      "That is exactly what this service is designed for. The worse the current state, the higher the return on organizing it. We start every engagement with a no-judgment audit that maps the full scope. There is no situation too chaotic to systematize — it just affects the number of sessions required.",
    blocker: "Shame or embarrassment barrier",
  },
];

const DOFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 text-balance">
            Questions that decide whether people book.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Each answer removes one specific conversion blocker.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:border-slate-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-base font-semibold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DOFAQ;
