import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Navigation, Heart } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, WildFlowerSilhouette, TreeSilhouette } from '../silhouettes/silhouettes';
import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cream/30 overflow-hidden border-b border-sunflower/10"
    >
      {/* Decorative floral graphics and silhouette watermarks in backgrounds */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 left-[20%] w-[420px] h-[280px] text-emerald-950 opacity-[0.14] rotate-6" />
        <FernSilhouette className="absolute top-[45%] -right-16 w-80 h-80 text-emerald-950 opacity-[0.15] rotate-[35deg]" />
        <TreeSilhouette className="absolute bottom-0 left-5 w-[360px] h-[500px] text-emerald-950 opacity-[0.10]" />
        <WildFlowerSilhouette className="absolute bottom-10 right-[35%] w-48 h-72 text-emerald-950 opacity-[0.13]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          className="max-w-xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs font-semibold text-sunflower tracking-widest uppercase bg-sunflower/10 px-4 py-1.5 rounded-full flex items-center gap-1.5 justify-center w-fit mx-auto">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-4 leading-tight">
            Visit Our Garden Sanctuary
          </h2>
          <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">
            Have a question, feedback, or planning an intimate proposal or
            bridal shower? Send our garden coordinators a message or visit us
            directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Contact Form & Info Panels (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Contact detail Cards row */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 13,
                delay: 0.1,
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Card A: Location & Hours */}
              <div className="p-5 rounded-2xl bg-white border border-sunflower/15 shadow-sm flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-cream text-sunflower border border-sunflower/20 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">
                    Address
                  </h4>
                  <p className="text-xs text-charcoal/75 mt-1.5 leading-relaxed font-sans">
                    J J. Lallana, Brgy.44, Cavite, 4100 Cavite
                  </p>
                </div>
              </div>

              {/* Card B: Phone & Callouts */}
              <div className="p-5 rounded-2xl bg-white border border-sunflower/15 shadow-sm flex items-start gap-3.5">
                <div className="p-3 rounded-xl bg-cream text-sunflower border border-sunflower/20 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">
                    Reservations Line
                  </h4>
                  <p className="text-xs text-charcoal/75 mt-1.5 font-sans leading-relaxed">
                    +63 942 329 9322
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Contact Form inside clean card */}
            <motion.div
              initial={{ opacity: 0, y: 55, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 55,
                damping: 12,
                delay: 0.2,
              }}
            >
              <ContactForm />
            </motion.div>
          </div>

          {/* Column 2: Embedded Interactive Simulated Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hours Panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 13,
                delay: 0.1,
              }}
              className="p-6 rounded-3xl bg-white border border-sunflower/15 shadow-sm text-left"
            >
              <h3 className="font-serif font-bold text-base text-charcoal flex items-center gap-2 mb-4">
                <Clock className="w-4.5 h-4.5 text-sunflower" />
                <span>Operating Hours</span>
              </h3>
              <div className="space-y-2.5 font-sans text-xs text-charcoal/80">
                <div className="flex justify-between border-b border-charcoal/5 pb-1.5">
                  <span className="font-medium text-charcoal/70">
                    Monday - Thursday
                  </span>
                  <span className="font-semibold">9:00 AM - 9:30 PM</span>
                </div>
                <div className="flex justify-between border-b border-charcoal/5 pb-1.5">
                  <span className="font-medium text-charcoal/70">
                    Friday - Sunday
                  </span>
                  <span className="font-semibold text-sunflower">
                    9:00 AM - 10:00 PM
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-charcoal/50 pt-1 italic">
                  <span>
                    * Final kitchen orders are accepted 30 minutes before
                    closing.
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Simulated Beautiful Interactive Map */}
            <motion.div
              initial={{ opacity: 0, y: 55, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 55,
                damping: 12,
                delay: 0.2,
              }}
              className="rounded-3xl border border-sunflower/20 shadow-lg overflow-hidden bg-white text-left"
            >
              <div className="bg-sunflower text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4.5 h-4.5 font-bold" />
                  <span className="font-serif text-sm font-bold">
                    Interactive Location Guide
                  </span>
                </div>
                <span className="font-mono text-[9px] font-bold text-white">
                  525 J. LALLANA ST.
                </span>
              </div>

              {/* Map Illustration Frame */}
              <div className="relative h-64 bg-cream/15 p-4 flex flex-col items-center justify-center border-b border-sunflower/10">
                {/* Visual grid roads map styling */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400')",
                  }}
                />

                {/* SVG Mock Map Roads layout */}
                <svg
                  className="absolute inset-0 w-full h-full text-sunflower/20 opacity-40 pointer-events-none"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="10"
                    y1="0"
                    x2="10"
                    y2="100"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="100"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <line
                    x1="85"
                    y1="0"
                    x2="85"
                    y2="100"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="0"
                    y1="35"
                    x2="100"
                    y2="35"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <line
                    x1="0"
                    y1="75"
                    x2="100"
                    y2="75"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>

                {/* Main central Cafe Pin */}
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex flex-col items-center gap-1 cursor-pointer"
                  onClick={() =>
                    window.open("https://maps.google.com", "_blank")
                  }
                >
                  <MapPin className="w-10 h-10 text-sunflower fill-white stroke-sunflower stroke-2 drop-shadow-lg" />
                  <div className="bg-charcoal text-white font-serif font-bold text-[10px] px-3 py-1 rounded-full shadow border border-white/10 flex items-center gap-1.5">
                    <Heart className="w-2.5 h-2.5 text-sunflower fill-sunflower" />
                    <span>C&apos;s Secret Garden</span>
                  </div>
                </motion.div>

                {/* Surrounding Landmark annotations */}
                <div className="absolute top-8 left-1/4 text-[9px] font-semibold text-charcoal/40 font-mono select-none">
                  Rafael Palma High
                </div>
                <div className="absolute bottom-12 right-12 text-[9px] font-semibold text-charcoal/40 font-mono select-none">
                  San Antonio Plz
                </div>
              </div>

              {/* Map footer navigation CTA */}
              <div className="p-4 bg-cream/30 flex justify-between items-center text-xs">
                <span className="text-charcoal/60 leading-tight">
                  Quiet seclusion in San Antonio
                </span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-mono font-bold text-sunflower hover:text-yellow-600 cursor-pointer border-b border-dashed border-sunflower"
                >
                  <span>Open Directions</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
