import { motion } from "motion/react";
import { Coffee, ArrowRight, Compass, CalendarCheck } from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  SunflowerSilhouette,
  TreeSilhouette,
} from "../silhouettes/silhouettes";

export default function Hero({ onNavigate }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center border-b border-sunflower/10 bg-charcoal text-white"
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
      <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-charcoal/95 via-charcoal/90 to-charcoal/40 pointer-events-none" />
      <div className="absolute inset-0 bg-black/25 mix-blend-multiply pointer-events-none" />

      {/* Dynamic Background Organic Curves, Sunlight, and Majestic Silhouettes */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-sunflower/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-6 right-[5%] w-[300px] h-[180px] sm:w-[500px] sm:h-[300px] text-white opacity-[0.12]" />
        <FernSilhouette className="absolute -bottom-16 -left-16 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] text-white opacity-[0.10] rotate-[15deg]" />
        <TreeSilhouette className="absolute bottom-0 right-0 w-[320px] h-[450px] sm:w-[520px] sm:h-[680px] text-white opacity-[0.10]" />
        <SunflowerSilhouette
          className="absolute top-1/3 left-[10%] w-48 h-48 text-sunflower opacity-[0.05] animate-spin"
          style={{ animationDuration: "120s" }}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        {/* Left Side: Welcoming Display Typography */}
        {/* IMPROVEMENT: text-center sa mobile, text-left sa desktop */}
        <div className="w-full lg:col-span-7 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
          {/* Tag Line Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 border border-sunflower/40 text-white font-mono text-[10px] sm:text-xs font-semibold mb-4 sm:mb-6 shadow-sm backdrop-blur-md"
          >
            <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sunflower" />
            <span>DISCOVER THE HIDDEN SANCTUARY</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              delay: 0.1,
            }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
          >
            Where Rich <span className="text-sunflower italic">Brews</span> Meet{" "}
            <br className="hidden sm:inline" />
            Lush{" "}
            <span className="text-sunflower relative inline-block">
              Blooms
              <span className="absolute bottom-1 left-0 w-full h-1 bg-sunflower/30 -z-10 rounded" />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 12,
              delay: 0.25,
            }}
            className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Tucked away in the quiet heart of San Antonio, discover a botanical
            oasis filled with sunlight, fresh flowers, and the aroma of freshly
            ground coffee. Sip artisanal lattes and indulge in delicious garden
            pastries surrounded by hanging plants, rustic wood, and cozy gazebo
            hideaways.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 11,
              delay: 0.35,
            }}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center w-full sm:w-auto"
          >
            {/* View Menu */}
            <button
              onClick={() => onNavigate("menu")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-sunflower hover:bg-yellow-400 text-charcoal font-medium shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto text-sm sm:text-base"
            >
              <Coffee className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            {/* Book Table */}
            <button
              onClick={() => onNavigate("reservation")}
              className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-medium shadow-sm hover:shadow-md backdrop-blur-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto text-sm sm:text-base"
            >
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5 text-sunflower" />
              <span>Book Table in Advance</span>
            </button>
          </motion.div>

          {/* Quick Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 14,
              delay: 0.5,
            }}
            className="mt-8 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-md lg:max-w-none"
          >
            <div>
              <p className="text-xl sm:text-3xl font-serif font-bold text-sunflower">
                3:00 PM
              </p>
              <p className="text-[10px] sm:text-sm text-white/70 font-medium mt-0.5">
                Opening Time
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-serif font-bold text-sunflower">
                100%
              </p>
              <p className="text-[10px] sm:text-sm text-white/70 font-medium mt-0.5">
                Pet Friendly
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-3xl font-serif font-bold text-sunflower">
                5 ★
              </p>
              <p className="text-[10px] sm:text-sm text-white/70 font-medium mt-0.5">
                Facebook Rating
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Layered Glassmorphic Image Collage */}
        {/* IMPROVEMENT: Idinagdag ang `hidden lg:flex` para hindi magpakita sa mobile/tablet at lalabas lang sa malalaking screen */}
        <div className="hidden lg:flex lg:col-span-5 relative h-[500px] items-center justify-center mt-0">
          {/* Wood texture background decor element */}
          <div className="absolute top-1/2 left-1/2 w-[380px] h-[380px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-amber-900/5 rotate-6 pointer-events-none" />

          {/* Core Atmosphere Photo - Garden Swing & Yellow Cruiser Bike */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -40, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -3, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 10,
              delay: 0.15,
            }}
            className="absolute top-2 left-2 w-[220px] aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: "url('/src/assets/hero/hero_image_2.jpg')",
              }}
            />
          </motion.div>

          {/* Layered Food Photo - Crispy Chicken Burger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 40, rotate: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6, x: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 45,
              damping: 10,
              delay: 0.35,
            }}
            className="absolute bottom-2 right-2 w-[190px] aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white"
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
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 12,
              delay: 0.55,
            }}
            className="absolute bottom-10 left-10 bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-lg flex items-center gap-3 max-w-[200px]"
          >
            <div className="p-2 rounded-full bg-sunflower/20 text-sunflower shrink-0">
              <svg
                className="w-5 h-5 animate-spin"
                style={{ animationDuration: "10s" }}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2M12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-bold text-xs text-white truncate">
                Fresh Coffee Daily
              </span>
              <span className="text-[10px] text-white/70 line-clamp-2">
                100% freshly-ground Arabica beans
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
