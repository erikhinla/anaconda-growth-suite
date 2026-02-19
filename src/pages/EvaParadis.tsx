import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { subscribeToBrevo } from "@/utils/brevo";
import { useEvaTracking } from "@/hooks/useEvaTracking";

// Brand assets - replace with actual images
const HERO_IMAGE = "/eva-hero.jpg";
const TEASER_IMAGES = ["/teaser1.jpg", "/teaser2.jpg", "/teaser3.jpg"];
const ONLYFANS_URL = "https://onlyfans.com/evaparadis";
const DISCOUNT_CODE = "EVA60OFF";

const EvaParadis = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();
  const { trackLead, trackClicker } = useEvaTracking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await subscribeToBrevo(email);

      if (result.success) {
        // Fire conversion pixel + write to Supabase
        trackLead(email);

        // Reveal content
        setIsUnlocked(true);

        toast({
          title: "Welcome to Paradise",
          description: "Your exclusive access has been unlocked.",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Error",
        description: "Unable to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOfClick = () => {
    trackClicker();
    window.open(ONLYFANS_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* Hero Section */}
      <header
        className="relative w-full h-[500px] bg-cover bg-center flex flex-col justify-center items-center text-center p-4"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,1)), url('${HERO_IMAGE}')`,
        }}
      >
        {/* Italian Flag Accent */}
        <div className="absolute top-0 left-0 w-full h-1 flex">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-red-600" />
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-[0.5em] text-gray-400 mb-4 uppercase">
            Dalla Bella Italia
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] tracking-widest mb-4 drop-shadow-lg">
            EVA PARADIS
          </h1>
          <p className="text-xl md:text-2xl italic text-gray-300 mb-6">
            Italy's Finest Trans Model & VR Experience
          </p>

          {/* VR Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8a0303] to-[#500000] px-6 py-2 rounded-full border border-[#D4AF37]">
            <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 7H3.5A1.5 1.5 0 002 8.5v7a1.5 1.5 0 001.5 1.5h17a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0020.5 7zM6.5 14a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm11 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
            </svg>
            <span className="text-sm font-semibold tracking-wider">IMMERSIVE VR CONTENT</span>
          </div>
        </div>
      </header>

      {/* USP Strip */}
      <div className="bg-gradient-to-r from-[#8a0303] via-[#500000] to-[#8a0303] py-4 border-y border-[#D4AF37]/30">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-8 px-4 text-center">
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-xl">🇮🇹</span>
            <span className="text-sm uppercase tracking-wider">Italian Heritage</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-xl">🥽</span>
            <span className="text-sm uppercase tracking-wider">Exclusive VR Content</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] text-xl">💬</span>
            <span className="text-sm uppercase tracking-wider">VIP Daily Chat</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {!isUnlocked ? (
          /* Gate Container - Pre-Signup */
          <div className="bg-neutral-900 p-8 md:p-12 rounded-2xl border border-neutral-800 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                UNLOCK THE <span className="text-[#D4AF37]">VIP VAULT</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Join the exclusive list to reveal the{" "}
                <strong className="text-white">Free Preview Gallery</strong> and get your{" "}
                <strong className="text-[#D4AF37]">60% OFF</strong> discount code.
              </p>
            </div>

            {/* Teaser Images (Blurred) */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {TEASER_IMAGES.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-800 rounded-lg overflow-hidden relative"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-60"
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-[#D4AF37]/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Capture Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full p-4 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-colors text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#8a0303] to-[#500000] hover:from-[#a00404] hover:to-[#600000] text-white font-bold py-5 rounded-lg text-xl uppercase tracking-wider border border-[#D4AF37] transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "UNLOCK NOW"
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              100% Private. Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        ) : (
          /* Reveal Container - Post-Signup */
          <div className="bg-neutral-900 p-8 md:p-12 rounded-2xl border-2 border-[#D4AF37] shadow-2xl shadow-[#D4AF37]/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#8a0303] to-[#500000] rounded-full mb-4 border border-[#D4AF37]">
                <svg
                  className="w-8 h-8 text-[#D4AF37]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">
                WELCOME TO PARADISE
              </h2>
              <p className="text-gray-400 text-lg">
                Your exclusive access has been granted
              </p>
            </div>

            {/* Discount Code */}
            <div className="bg-black p-6 rounded-xl border border-[#D4AF37]/30 mb-8">
              <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider">
                Your Exclusive Discount Code
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl md:text-4xl font-mono font-bold text-white bg-gradient-to-r from-[#D4AF37] to-[#b8962d] bg-clip-text text-transparent">
                  {DISCOUNT_CODE}
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(DISCOUNT_CODE);
                    toast({ title: "Copied!", description: "Code copied to clipboard" });
                  }}
                  className="p-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
              <p className="text-[#D4AF37] text-lg mt-2 font-semibold">
                60% OFF Your First Month
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleOfClick}
              className="w-full bg-gradient-to-r from-[#8a0303] to-[#500000] hover:from-[#a00404] hover:to-[#600000] text-white font-bold py-5 rounded-lg text-xl uppercase tracking-wider border border-[#D4AF37] transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#D4AF37]/20 mb-8"
            >
              CLAIM DISCOUNT ON ONLYFANS
            </button>

            {/* Unlocked Preview Gallery */}
            <div>
              <h3 className="text-lg text-gray-400 mb-4 text-center uppercase tracking-wider">
                Preview Gallery Unlocked
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {TEASER_IMAGES.map((img, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-[#D4AF37] transition-colors cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* VR Teaser */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#8a0303]/30 to-[#500000]/30 rounded-xl border border-[#D4AF37]/30">
              <div className="flex items-center gap-3 mb-3">
                <svg className="w-8 h-8 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 7H3.5A1.5 1.5 0 002 8.5v7a1.5 1.5 0 001.5 1.5h17a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0020.5 7zM6.5 14a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm11 0a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
                <h4 className="text-xl font-bold text-[#D4AF37]">VR Experience Available</h4>
              </div>
              <p className="text-gray-400 text-sm">
                Upgrade to VIP for access to exclusive immersive VR content. Experience Italy's finest like never before.
              </p>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#8a0303] to-[#500000] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🇮🇹</span>
            </div>
            <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">Italian Heritage</h3>
            <p className="text-gray-400 text-sm">
              Authentic Italian elegance and passion in every exclusive piece of content.
            </p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#8a0303] to-[#500000] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🥽</span>
            </div>
            <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">VR Experience</h3>
            <p className="text-gray-400 text-sm">
              Immersive virtual reality content that puts you in the scene like never before.
            </p>
          </div>
          <div className="bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#8a0303] to-[#500000] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">VIP Daily Chat</h3>
            <p className="text-gray-400 text-sm">
              Direct, personal access every day. Build a real connection with Eva.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#D4AF37] font-semibold mb-2">EVA PARADIS</p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All Rights Reserved. 18+ Only.
          </p>
          <div className="flex justify-center gap-6 mt-4 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EvaParadis;
