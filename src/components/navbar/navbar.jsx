import { useState, useEffect } from 'react';
import { Menu, X, CalendarDays, Flower2 } from 'lucide-react';
import cafeLogo from "/logo/logo.jpg";

export default function Navbar({ onNavigate, activeView = 'home' }) {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we are on the menu page, it is always light-themed at the top, so we should always act sticky
      if (activeView === 'menu') {
        setIsSticky(true);
        return;
      }
      
      // Sticky becomes active after scrolling past the splash page (100vh)
      if (window.scrollY > window.innerHeight - 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    handleScroll(); // Run immediately

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeView]);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Menu', id: 'menu' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'testimonials' },
    { name: 'FAQ', id: 'faq' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isSticky
            ? "bg-cream/90 backdrop-blur-md shadow-md py-2 border-b border-sunflower/10"
            : "bg-gradient-to-b from-black/40 to-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleLinkClick("hero")}
          >
            <div className="relative overflow-hidden rounded-full border border-sunflower/30 bg-white/10 p-1">
              <img
                src={cafeLogo}
                alt="The C's Secret Garden Cafe"
                className={`transition-all duration-500 rounded-full ${
                  isSticky ? "w-10 h-10" : "w-12 h-12 sm:w-14 sm:h-14"
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif font-semibold tracking-wide transition-colors duration-300 ${
                  isSticky ? "text-charcoal" : "text-cream"
                }`}
              >
                The C&apos;s Cafe
              </span>
              <span
                className={`text-[9px] tracking-widest uppercase font-mono transition-colors duration-300 ${
                  isSticky ? "text-sunflower" : "text-white"
                }`}
              >
                Secret Garden
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                (activeView === "menu" && link.id === "menu") ||
                (activeView === "home" &&
                  link.id !== "menu" &&
                  link.id === "hero"); // Highlight Home if not menu, or Menu if menu
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 text-sm font-medium transition-all duration-300 cursor-pointer group hover:text-sunflower ${
                    isSticky ? "text-charcoal" : "text-cream/90"
                  } ${isActive ? "text-sunflower font-semibold" : ""}`}
                >
                  {link.name}
                  {/* Smooth Underline Animation */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-sunflower transform transition-transform duration-300 origin-left ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Book Table Button (Desktop) */}
          <div className="hidden md:block">
            <button
              onClick={() => handleLinkClick("reservation")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                isSticky
                  ? "bg-sunflower hover:bg-yellow-500 text-white font-bold"
                  : "bg-white hover:bg-cream text-sunflower"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Book a Table</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => handleLinkClick("reservation")}
              className={`p-2 rounded-full shadow-sm transition-all duration-300 ${
                isSticky ? "bg-sunflower text-white" : "bg-white text-sunflower"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-colors ${
                isSticky
                  ? "text-charcoal hover:bg-charcoal/5"
                  : "text-cream hover:bg-white/10"
              }`}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-500 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 bottom-0 right-0 w-72 bg-[#FFFDF8] z-50 md:hidden shadow-2xl border-l border-sunflower/10 flex flex-col justify-between py-6 px-6 transition-transform duration-500 ease-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-sunflower/10">
            <div className="flex items-center gap-2">
              <Flower2 className="w-6 h-6 text-sunflower" />
              <span className="font-serif font-bold text-lg text-charcoal">
                Garden Menu
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full text-charcoal hover:bg-charcoal/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-2 font-medium text-charcoal hover:text-sunflower border-b border-charcoal/5 pb-2 transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            onClick={() => handleLinkClick("reservation")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sunflower text-white font-bold hover:bg-yellow-500 shadow-md transition-all cursor-pointer"
          >
            <CalendarDays className="w-5 h-5" />
            <span>Book a Table Now</span>
          </button>
          <div className="text-center mt-4 text-[10px] text-charcoal/50 font-mono">
            525 J. Lallana St. Rafael Palma, San Antonio
          </div>
        </div>
      </div>
    </>
  );
}
