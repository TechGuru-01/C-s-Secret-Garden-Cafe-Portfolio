import { Facebook, Instagram, Youtube, Heart } from "lucide-react";
import cafeLogo from "../../assets/logo/logo.jpg";

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream pt-12 pb-6 border-t-4 border-sunflower">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 text-center md:text-left">
        {/* Brand Information Module (5 cols) */}
        <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-4">
          <div
            className="flex items-center gap-3 cursor-pointer group select-none"
            onClick={() => onNavigate("hero")}
          >
            <div className="p-1 rounded-full border border-sunflower/20 bg-white/10 transition-transform group-hover:scale-105">
              <img
                src={cafeLogo}
                alt="C's Garden Secret Cafe"
                className="w-12 h-12 rounded-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-lg tracking-wide text-cream">
                The C&apos;s Cafe
              </span>
              <span className="text-[9px] tracking-widest uppercase font-mono text-sunflower">
                Secret Garden Sanctuary
              </span>
            </div>
          </div>

          <p className="text-xs text-[#FFF9EC]/75 leading-relaxed max-w-sm font-sans">
            Tucked away in San Antonio, C&apos;s Garden Secret Cafe is a hidden
            botanical haven pairing artisanal espresso brews with lush blooming
            orchids and ferns. Enjoy quiet rest, cozy gazebos, and fresh
            comforts in the heart of nature.
          </p>

          {/* Social media connections */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-sunflower hover:text-charcoal transition-all text-[#FFF9EC]/80"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-sunflower hover:text-charcoal transition-all text-[#FFF9EC]/80"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-sunflower hover:text-charcoal transition-all text-[#FFF9EC]/80"
              aria-label="Subscribe on YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links module (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif font-bold text-sm text-sunflower tracking-wide uppercase text-[11px] md:normal-case md:text-sm">
            Sanctuary Sections
          </h4>
          <ul className="space-y-3 md:space-y-2 text-xs font-medium text-[#FFF9EC]/80 flex flex-col items-center md:items-start">
            <li>
              <button
                onClick={() => onNavigate("hero")}
                className="hover:text-sunflower transition-colors py-1 block cursor-pointer text-center md:text-left"
              >
                Home Sanctuary
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("about")}
                className="hover:text-sunflower transition-colors py-1 block cursor-pointer text-center md:text-left"
              >
                Our Roots (About)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("menu")}
                className="hover:text-sunflower transition-colors py-1 block cursor-pointer text-center md:text-left"
              >
                Featured & Full Menu
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("gallery")}
                className="hover:text-sunflower transition-colors py-1 block cursor-pointer text-center md:text-left"
              >
                Signature Gallery
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate("reservation")}
                className="hover:text-sunflower transition-colors py-1 block cursor-pointer text-center md:text-left"
              >
                Book a Garden Table
              </button>
            </li>
          </ul>
        </div>

        {/* Cafe Information (4 cols) */}
        <div className="md:col-span-4 space-y-4 text-xs">
          <h4 className="font-serif font-bold text-sm text-sunflower tracking-wide uppercase text-[11px] md:normal-case md:text-sm">
            Sanctuary Coordinates
          </h4>

          <div className="space-y-3 font-sans text-[#FFF9EC]/75 max-w-xs mx-auto md:mx-0">
            <p className="leading-relaxed">
              <strong className="text-[#FFF9EC]">Location:</strong> 525 J.
              Lallana St. Rafael Palma, San Antonio
            </p>
            <p>
              <strong className="text-[#FFF9EC]">Hotline:</strong> +63 917 839
              2012
            </p>
            <p>
              <strong className="text-[#FFF9EC]">Email:</strong>{" "}
              bookings@cscafegarden.com
            </p>
            <p className="italic text-sunflower pt-1">
              &ldquo;Where blooms meet brews, discover the garden secret.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-center text-[10px] sm:text-[11px] font-mono text-[#FFF9EC]/50">
        <p className="order-2 md:order-1">
          &copy; {currentYear} The C&apos;s Garden Secret Cafe. All rights
          reserved.
        </p>
        <div className="flex items-center gap-1.5 justify-center order-1 md:order-2">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
          <span>for a premium experience</span>
        </div>
      </div>
    </footer>
  );
}
