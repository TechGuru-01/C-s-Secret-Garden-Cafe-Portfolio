import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import SplashPage from './components/splash-page/splash-page';
import Navbar from './components/navbar/navbar';
import Hero from './components/hero/hero';
import About from './components/about/about';
import Menu from './components/menu/menu';
import FullMenuPage from './components/full-menu-page/full-menu-page';
import Gallery from './components/gallery/gallery';
import Reservation from './components/reservation/reservation';
import ReservationPromo from './components/reservation-promo/reservation-promo';
import Testimonials from './components/testimonials/testimonials';
import FAQ from './components/faq/faq';
import Contact from './components/contact/contact';
import Footer from './components/footer/footer';
import CookieConsent from './components/cookie-consent/cookie-consent';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeView, setActiveView] = useState('home'); // 'home' or 'menu'

  useEffect(() => {
    // Disable scrolling while splash or booking modal is active
    if (showSplash || isBookingOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showSplash, isBookingOpen]);

  const handleNavigate = (sectionId) => {
    if (sectionId === 'reservation') {
      setIsBookingOpen(true);
      return;
    }
    
    if (sectionId === 'menu') {
      setActiveView('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Returning to home or other home sections
    setActiveView('home');
    
    // Smoothly scroll after component has mounted
    setTimeout(() => {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-charcoal flex flex-col selection:bg-sunflower/30 selection:text-charcoal antialiased">
      {/* 1. Immersive Full-Screen Splash Page */}
      <AnimatePresence>
        {showSplash && (
          <SplashPage onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* 2. Sticky Glassmorphic Navigation Bar - Only show when Splash page is dismissed */}
      <AnimatePresence>
        {!showSplash && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="z-40"
          >
            <Navbar onNavigate={handleNavigate} activeView={activeView} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Narrative Layout Sections or Dedicated Menu Page */}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {activeView === 'home' ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {/* Hero Segment */}
              <Hero onNavigate={handleNavigate} />

              {/* About Segment */}
              <About />

              {/* Curated Signature Menu Segment (Home Preview) */}
              <Menu onNavigate={handleNavigate} />

              {/* Gallery Grid Segment */}
              <Gallery />

              {/* Table Reservation Promo Banner */}
              <ReservationPromo onOpenBooking={() => setIsBookingOpen(true)} />

              {/* Customer Feedback Carousel */}
              <Testimonials />

              {/* FAQ Accordion Segment */}
              <FAQ />

              {/* Contact Coordinates & Map Segment */}
              <Contact />
            </motion.div>
          ) : (
            <FullMenuPage
              key="full-menu-view"
              onBackToHome={() => handleNavigate('hero')}
              onOpenBooking={() => setIsBookingOpen(true)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 4. Elegant Footer Segment */}
      <Footer onNavigate={handleNavigate} />

      {/* 5. Booking Modal Overlay */}
      <AnimatePresence>
        {isBookingOpen && (
          <Reservation isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
        )}
      </AnimatePresence>

      {/* 6. Cookies Consent Popup Banner */}
      <CookieConsent />
    </div>
  );
}
