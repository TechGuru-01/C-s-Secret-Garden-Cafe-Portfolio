import { motion } from "motion/react";
import { Flower, Leaf, Coffee, Award, Heart } from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  WildFlowerSilhouette,
  TreeSilhouette,
} from "../silhouettes/silhouettes";

export default function About() {
  const pillars = [
    {
      icon: <Coffee className="w-4 h-4 sm:w-5 sm:h-5 text-wood" />,
      title: "Artisanal Roasts",
      description:
        "Slow-drip cold brew and custom espresso shots pulled from 100% single-origin Arabica beans, roasted fresh weekly.",
    },
    {
      icon: <Flower className="w-4 h-4 sm:w-5 sm:h-5 text-sunflower" />,
      title: "Botanical Sanctuary",
      description:
        "Dine surrounded by real blooming flowers, climbing vines, giant birds-nest ferns, and a refreshing outdoor canopy.",
    },
    {
      icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />,
      title: "Warm Hospitality",
      description:
        "A welcoming, pet-friendly space with cozy gazebos and soft couches built to foster community and peaceful rest.",
    },
  ];

  return (
    <section
      id="about"
      className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-cream/30 overflow-hidden border-b border-sunflower/10"
    >
      {/* Decorative botanical silhouettes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-6 left-[5%] w-[250px] h-[150px] sm:w-[400px] sm:h-[250px] text-emerald-900 opacity-[0.08]" />
        <FernSilhouette className="absolute top-[45%] -right-12 w-48 h-48 sm:w-80 sm:h-80 text-emerald-900 opacity-[0.08] rotate-[45deg]" />
        <WildFlowerSilhouette className="absolute bottom-5 left-4 w-28 h-40 sm:w-44 sm:h-64 text-emerald-900 opacity-[0.08]" />
        <TreeSilhouette className="absolute bottom-0 right-[20%] w-[240px] h-[320px] sm:w-[380px] sm:h-[500px] text-emerald-900 opacity-[0.06]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
        {/* Top/Right Column: Narrative Story (Reads first on mobile) */}
        <div className="flex flex-col text-left order-1 lg:order-2 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            className="flex items-center gap-2 text-sunflower font-mono text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-3"
          >
            <Leaf className="w-3.5 h-3.5" />
            <span>Our Roots</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 14,
              delay: 0.1,
            }}
            className="font-serif text-2xl sm:text-4xl font-bold text-charcoal leading-tight"
          >
            Discover the Hidden Haven of <br />
            <span className="text-sunflower font-serif font-bold italic">
              The C&apos;s Secret Garden
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 14,
              delay: 0.2,
            }}
            className="mt-4 sm:mt-6 text-charcoal/80 leading-relaxed text-xs sm:text-base"
          >
            Born from a lifelong passion for vibrant floriculture and rich
            espressos, C&apos;s Garden Secret Cafe started as a peaceful
            backyard retreat in San Antonio, designed for friends and family to
            escape the heavy rustle of daily life. Over the years, we have
            carefully nurtured our garden, planting sunflower beds, cascading
            ivy, and cultivating towering tropical bird&apos;s nest ferns.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 14,
              delay: 0.3,
            }}
            className="mt-3 text-charcoal/70 text-xs leading-relaxed"
          >
            Every cup of coffee we brew is made with carefully-sourced,
            sustainable Arabica beans, slow-ground and poured with love. Our
            desserts are baked fresh from scratch in our garden kitchen, and our
            signature plates—like the crispy, sizzling Sisig and juicy chicken
            burger—are cooked with fresh local ingredients to make your garden
            dining experience unforgettable.
          </motion.p>

          {/* Pillars Checklist */}
          <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-6">
            {pillars.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 75,
                  damping: 13,
                  delay: 0.15 + idx * 0.1,
                }}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white border border-sunflower/15 shadow-sm hover:shadow-xl hover:border-sunflower/30 transition-all duration-300"
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-cream border border-sunflower/20 flex-shrink-0">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-charcoal">
                    {p.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-charcoal/70 mt-0.5 sm:mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom/Left Column: Overlapping Organic Framed Images (Placed lower on mobile) */}
        <div className="relative h-[320px] sm:h-[450px] w-full flex items-center justify-center order-2 lg:order-1 mt-4 lg:mt-0">
          {/* Main big garden photo with white chairs */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -8, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 50, damping: 12 }}
            className="absolute top-0 left-2 w-[55%] sm:w-[280px] aspect-[4/5] rounded-3xl overflow-hidden border-4 sm:border-8 border-white shadow-xl bg-white"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: "url('/src/assets/about/about4.jpg')" }}
            />
          </motion.div>

          {/* Secondary bird's nest fern / gazebo photo */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 30, rotate: 10, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 3, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 12,
              delay: 0.15,
            }}
            className="absolute bottom-2 right-2 w-[50%] sm:w-[230px] aspect-[4/5] rounded-3xl overflow-hidden border-4 sm:border-8 border-white shadow-2xl bg-white"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: "url('/src/assets/about/about2.jpg')" }}
            />
          </motion.div>

          {/* Golden Sun Emblem floating */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.3,
            }}
            className="absolute top-1/2 right-[40%] translate-x-4 -translate-y-4 bg-sunflower border border-white p-2 sm:p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 pointer-events-auto z-20"
          >
            <Award className="w-4 h-4 sm:w-6 sm:h-6 text-charcoal" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
