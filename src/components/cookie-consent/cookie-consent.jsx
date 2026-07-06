import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, X, ShieldCheck } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: true,
    analytics: false,
  });

  useEffect(() => {
    // Check if consent has already been given
    const consent = localStorage.getItem('garden_cookies_consent');
    if (!consent) {
      // Show popup after a slight delay for better experience
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('garden_cookies_consent', JSON.stringify({
      essential: true,
      functional: true,
      analytics: true,
    }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('garden_cookies_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem('garden_cookies_consent', JSON.stringify({
      essential: true,
      functional: false,
      analytics: false,
    }));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md bg-white border border-sunflower/20 rounded-3xl p-6 shadow-2xl z-50 text-left"
          id="cookie-consent-popup"
        >
          {/* Main Consent Form */}
          {!showPreferences ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-sunflower/10 text-sunflower rounded-2xl">
                    <Cookie className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-charcoal">
                      Garden Cookie Settings
                    </h4>
                    <p className="font-mono text-[9px] text-sunflower uppercase tracking-wider mt-0.5">
                      Personalizing your dining session
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDeclineAll}
                  className="p-1 rounded-full text-charcoal/40 hover:text-charcoal transition-colors cursor-pointer"
                  title="Close and accept only essential"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-charcoal/70 leading-relaxed">
                We use organic cookies to optimize your browsing experience. This includes saving your favorite menu items, keeping track of table reservations, and analyzing botanical traffic so we can tailor our services.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-sunflower text-white text-xs font-bold hover:bg-yellow-500 shadow-sm hover:shadow transition-all cursor-pointer text-center"
                >
                  Accept All
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-cream border border-sunflower/25 text-charcoal text-xs font-semibold hover:bg-white transition-all cursor-pointer text-center"
                >
                  Customize
                </button>
              </div>
            </div>
          ) : (
            /* Custom Preferences Panel */
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sunflower/10 text-sunflower rounded-xl">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">
                    Cookie Preferences
                  </h4>
                  <p className="font-mono text-[9px] text-charcoal/50 uppercase tracking-wider mt-0.5">
                    Toggle your cookie permissions
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {/* Essential Toggle (Always on) */}
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl bg-cream/30 border border-sunflower/5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                      Essential Cookies
                      <span className="bg-charcoal/10 text-charcoal/70 text-[8px] font-mono px-1.5 py-0.5 rounded uppercase">Required</span>
                    </span>
                    <p className="text-[10px] text-charcoal/60 leading-snug">
                      Crucial for preserving secure table booking data and page transitions.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    disabled
                    checked
                    className="w-4 h-4 text-sunflower border-sunflower/30 rounded focus:ring-sunflower"
                  />
                </div>

                {/* Functional Toggle */}
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl bg-cream/30 border border-sunflower/5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-charcoal">Functional Cookies</span>
                    <p className="text-[10px] text-charcoal/60 leading-snug">
                      Remembers your favorite menu dishes and custom filter searches across visits.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                    className="w-4 h-4 text-sunflower border-sunflower/30 rounded focus:ring-sunflower cursor-pointer"
                  />
                </div>

                {/* Analytics Toggle */}
                <div className="flex items-start justify-between gap-4 p-2.5 rounded-xl bg-cream/30 border border-sunflower/5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-charcoal">Performance & Analytics</span>
                    <p className="text-[10px] text-charcoal/60 leading-snug">
                      Helps our culinary gardeners study website flow to craft better layouts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 text-sunflower border-sunflower/30 rounded focus:ring-sunflower cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 py-2 rounded-xl bg-sunflower text-white text-xs font-bold hover:bg-yellow-500 shadow-sm transition-all cursor-pointer text-center"
                >
                  Save Settings
                </button>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="py-2 px-3 rounded-xl bg-cream border border-sunflower/25 text-charcoal text-xs font-semibold hover:bg-white transition-all cursor-pointer text-center"
                >
                  Back
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
