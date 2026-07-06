import { Facebook, Instagram, Youtube, Heart } from 'lucide-react';
import cafeLogo from "../../assets/logo/logo.jpg";

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream pt-16 pb-8 border-t-4 border-sunflower">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-start text-left">
        
        {/* Brand Information Module (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onNavigate('hero')}
          >
            <div className="p-1 rounded-full border border-sunflower/20 bg-white/10">
              <img 
                src={cafeLogo} 
                alt="C's Garden Secret Cafe" 
                className="w-12 h-12 rounded-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-wide text-cream">The C&apos;s Cafe</span>
              <span className="text-[9px] tracking-widest uppercase font-mono text-sunflower">Secret Garden Sanctuary</span>
            </div>
          </div>

          <p className="text-xs text-[#FFF9EC]/75 leading-relaxed max-w-sm font-sans">
            Tucked away in San Antonio, C&apos;s Garden Secret Cafe is a hidden botanical haven pairing artisanal espresso brews with lush blooming orchids and ferns. Enjoy quiet rest, cozy gazebos, and fresh comforts in the heart of nature.
          </p>

          {/* Social media connections */}
          <div className="flex items-center gap-3 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-sunflower hover:text-charcoal transition-all text-[#FFF9EC]/80"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-sunflower hover:text-charcoal transition-all text-[#FFF9EC]/80"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-sunflower hover:text-charcoal transition-all text-[#FFF9EC]/80"
              aria-label="Subscribe on YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick links module (3 cols) */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-serif font-bold text-sm text-sunflower">Sanctuary Sections</h4>
          <ul className="space-y-2 text-xs font-medium text-[#FFF9EC]/80">
            <li>
              <button onClick={() => onNavigate('hero')} className="hover:text-sunflower transition-colors cursor-pointer text-left">
                Home Sanctuary
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-sunflower transition-colors cursor-pointer text-left">
                Our Roots (About)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('menu')} className="hover:text-sunflower transition-colors cursor-pointer text-left">
                Featured & Full Menu
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('gallery')} className="hover:text-sunflower transition-colors cursor-pointer text-left">
                Signature Gallery
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('reservation')} className="hover:text-sunflower transition-colors cursor-pointer text-left">
                Book a Garden Table
              </button>
            </li>
          </ul>
        </div>

        {/* Cafe Information (4 cols) */}
        <div className="md:col-span-4 space-y-4 text-xs">
          <h4 className="font-serif font-bold text-sm text-sunflower">Sanctuary Coordinates</h4>
          
          <div className="space-y-3 font-sans text-[#FFF9EC]/75">
            <p className="leading-relaxed">
              <strong>Location:</strong> 525 J. Lallana St. Rafael Palma, San Antonio
            </p>
            <p>
              <strong>Hotline:</strong> +63 917 839 2012
            </p>
            <p>
              <strong>Email:</strong> bookings@cscafegarden.com
            </p>
            <p className="italic text-sunflower">
              &ldquo;Where blooms meet brews, discover the garden secret.&rdquo;
            </p>
          </div>
        </div>

      </div>

      {/* Copywrite bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-[11px] font-mono text-[#FFF9EC]/50">
        <p>&copy; {currentYear} The C&apos;s Garden Secret Cafe. All rights reserved.</p>
        <div className="flex items-center gap-1.5 justify-center">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          <span>for a premium dining experience</span>
        </div>
      </div>
    </footer>
  );
}
