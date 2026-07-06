import { motion } from 'motion/react';
import { Flower, Leaf, Coffee, Award, Heart } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, WildFlowerSilhouette, TreeSilhouette } from '../silhouettes/silhouettes';

export default function About() {
  const pillars = [
    {
      icon: <Coffee className="w-5 h-5 text-wood" />,
      title: 'Artisanal Roasts',
      description: 'Slow-drip cold brew and custom espresso shots pulled from 100% single-origin Arabica beans, roasted fresh weekly.'
    },
    {
      icon: <Flower className="w-5 h-5 text-sunflower" />,
      title: 'Botanical Sanctuary',
      description: 'Dine surrounded by real blooming flowers, climbing vines, giant birds-nest ferns, and a refreshing outdoor canopy.'
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Warm Hospitality',
      description: 'A welcoming, pet-friendly space with cozy gazebos and soft couches built to foster community and peaceful rest.'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cream/30 overflow-hidden border-b border-sunflower/10"
    >
      {/* Decorative botanical silhouettes in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 left-[15%] w-[400px] h-[250px] text-emerald-900 opacity-[0.14]" />
        <FernSilhouette className="absolute top-[35%] -right-16 w-80 h-80 text-emerald-900 opacity-[0.15] rotate-[45deg]" />
        <WildFlowerSilhouette className="absolute bottom-5 left-10 w-44 h-64 text-emerald-900 opacity-[0.15]" />
        <TreeSilhouette className="absolute bottom-0 right-[40%] w-[380px] h-[500px] text-emerald-900 opacity-[0.10]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column: Overlapping Organic Framed Images */}
        <div className="relative h-[400px] sm:h-[480px] md:h-[500px] flex items-center justify-center order-2 lg:order-1">
          {/* Main big garden photo with white chairs (input_file_6.png) */}
          <motion.div
            initial={{ opacity: 0, x: -80, rotate: -12, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 50, damping: 12 }}
            className="absolute top-0 left-0 w-8/12 sm:w-[320px] aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white shadow-xl bg-white rotate-[-2deg]"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: "url('/src/assets/about/about2.jpg')" }}
            />
          </motion.div>

          {/* Secondary bird's nest fern / gazebo photo (input_file_7.png) */}
          <motion.div
            initial={{ opacity: 0, x: 80, y: 60, rotate: 15, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, y: 0, rotate: 3, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 12,
              delay: 0.2,
            }}
            className="absolute bottom-4 right-0 w-7/12 sm:w-[260px] aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-white rotate-[3deg]"
          >
            <div
              className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: "url('/src/assets/about/about1.jpg')" }}
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
              delay: 0.4,
            }}
            className="absolute top-1/2 right-1/4 translate-x-12 -translate-y-12 bg-sunflower border border-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 pointer-events-auto z-20"
          >
            <Award className="w-6 h-6 text-charcoal" />
          </motion.div>
        </div>

        {/* Right Column: Narrative Story */}
        <div className="flex flex-col text-left order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 80, damping: 12 }}
            className="flex items-center gap-2 text-sunflower font-mono text-xs font-semibold tracking-widest uppercase mb-4"
          >
            <Leaf className="w-4 h-4" />
            <span>Our Roots</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 14,
              delay: 0.1,
            }}
            className="font-serif text-3xl sm:text-4xl font-bold text-charcoal leading-tight"
          >
            Discover the Hidden Haven of <br />
            <span className="text-sunflower font-serif font-bold italic">
              The C&apos;s Secret Garden
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 14,
              delay: 0.2,
            }}
            className="mt-6 text-charcoal/80 leading-relaxed text-sm sm:text-base"
          >
            Born from a lifelong passion for vibrant floriculture and rich
            espressos, C&apos;s Garden Secret Cafe started as a peaceful
            backyard retreat in San Antonio, designed for friends and family to
            escape the heavy rustle of daily life. Over the years, we have
            carefully nurtured our garden, planting sunflower beds, cascading
            ivy, and cultivating towering tropical bird&apos;s nest ferns.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              type: "spring",
              stiffness: 70,
              damping: 14,
              delay: 0.3,
            }}
            className="mt-4 text-charcoal/70 text-sm leading-relaxed"
          >
            Every cup of coffee we brew is made with carefully-sourced,
            sustainable Arabica beans, slow-ground and poured with love. Our
            desserts are baked fresh from scratch in our garden kitchen, and our
            signature plates—like the crispy, sizzling Sisig and juicy chicken
            burger—are cooked with fresh local ingredients to make your garden
            dining experience unforgettable.
          </motion.p>

          {/* Pillars Checklist */}
          <div className="mt-8 flex flex-col gap-6">
            {pillars.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40, scale: 0.93 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  type: "spring",
                  stiffness: 75,
                  damping: 13,
                  delay: 0.3 + idx * 0.15,
                }}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-sunflower/15 shadow-sm hover:shadow-xl hover:border-sunflower/30 transition-all duration-300"
              >
                <div className="p-2.5 rounded-xl bg-cream border border-sunflower/20 flex-shrink-0">
                  {p.icon}
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-charcoal">
                    {p.title}
                  </h4>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
