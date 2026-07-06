import { motion } from 'motion/react';
import { Coffee, ArrowRight, Compass, CalendarCheck } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, SunflowerSilhouette, TreeSilhouette } from '../silhouettes/silhouettes';

export default function Hero({ onNavigate }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center border-b border-sunflower/10 bg-charcoal text-white"
    >
      {/* Full cover background image with parallax scaling effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02] pointer-events-none"
        style={{
          backgroundImage:
            "url('/src/assets/hero/garden_hero_bg_1783269228447.jpg')",
        }}
      />
      {/* High-end gradient overlay for gorgeous typography legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/30 pointer-events-none" />
      <div className="absolute inset-0 bg-black/25 mix-blend-multiply pointer-events-none" />

      {/* Dynamic Background Organic Curves, Sunlight, and Majestic Silhouettes */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-sunflower/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-12 right-[15%] w-[500px] h-[300px] text-white opacity-[0.16]" />
        <FernSilhouette className="absolute -bottom-24 -left-12 w-[420px] h-[420px] text-white opacity-[0.14] rotate-[15deg]" />
        <TreeSilhouette className="absolute bottom-0 right-[5%] w-[520px] h-[680px] text-white opacity-[0.15]" />
        <SunflowerSilhouette
          className="absolute top-1/4 left-[30%] w-80 h-80 text-sunflower opacity-[0.08] animate-spin"
          style={{ animationDuration: "120s" }}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Welcoming Display Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Tag Line Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-black/40 border border-sunflower/40 text-white font-mono text-xs font-semibold mb-6 shadow-sm backdrop-blur-md"
          >
            <Compass className="w-3.5 h-3.5 text-sunflower" />
            <span>DISCOVER THE HIDDEN SANCTUARY</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              delay: 0.1,
            }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Where Rich <span className="text-sunflower italic">Brews</span> Meet{" "}
            <br />
            Lush{" "}
            <span className="text-sunflower relative inline-block">
              Blooms
              <span className="absolute bottom-1 left-0 w-full h-1 bg-sunflower/30 -z-10 rounded" />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 12,
              delay: 0.25,
            }}
            className="mt-6 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl"
          >
            Tucked away in the quiet heart of San Antonio, discover a botanical
            oasis filled with sunlight, fresh flowers, and the aroma of freshly
            ground coffee. Sip artisanal lattes and indulge in delicious garden
            pastries surrounded by hanging plants, rustic wood, and cozy gazebo
            hideaways.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 11,
              delay: 0.35,
            }}
            className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center"
          >
            {/* View Menu */}
            <button
              onClick={() => onNavigate("menu")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-sunflower hover:bg-yellow-400 text-charcoal font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <Coffee className="w-5 h-5" />
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Book Table */}
            <button
              onClick={() => onNavigate("reservation")}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium shadow-sm hover:shadow-md backdrop-blur-sm transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
            >
              <CalendarCheck className="w-5 h-5 text-sunflower" />
              <span>Book Table in Advance</span>
            </button>
          </motion.div>

          {/* Quick Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 14,
              delay: 0.5,
            }}
            className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-sunflower">
                3:00 PM
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                Opening Time
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-sunflower">
                100%
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                Pet Friendly
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-serif font-bold text-sunflower">
                5 ★
              </p>
              <p className="text-xs sm:text-sm text-white/70 font-medium">
                Facebook Rating
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Layered Glassmorphic Image Collage */}
        <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] lg:h-[500px] flex items-center justify-center mt-12 lg:mt-0">
          {/* Wood texture background decor element */}
          <div className="absolute top-1/2 left-1/2 w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-amber-900/5 rotate-6 pointer-events-none" />

          {/* Core Atmosphere Photo - Garden Swing & Yellow Cruiser Bike (input_file_5.png) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: -80, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 10,
              delay: 0.15,
            }}
            className="absolute top-4 left-4 w-7/12 sm:w-[260px] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: "url('/src/assets/hero/hero_image_2.jpg')",
              }}
            />
          </motion.div>

          {/* Layered Food Photo - Crispy Chicken Burger (input_file_1.png) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 80, rotate: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 10,
              delay: 0.35,
            }}
            className="absolute bottom-4 right-4 w-6/12 sm:w-[220px] aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: "url('/src/assets/hero/hero_image_1.jpg')",
              }}
            />
            {/* Price badge */}
            <div className="absolute top-2 right-2 bg-sunflower text-charcoal text-[10px] font-bold px-2 py-0.5 rounded-full shadow font-mono">
              ₱195
            </div>
          </motion.div>

          {/* Hanging glass container card with description */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
              delay: 0.55,
            }}
            className="absolute bottom-16 left-8 bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg flex items-center gap-3 max-w-[200px] sm:max-w-[220px]"
          >
            <div className="p-2.5 rounded-full bg-sunflower/20 text-sunflower">
              <svg
                className="w-5 h-5 animate-spin"
                style={{ animationDuration: "10s" }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xs text-white">
                Fresh Coffee Daily
              </span>
              <span className="text-[10px] text-white/70">
                100% freshly-ground Arabica beans
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
