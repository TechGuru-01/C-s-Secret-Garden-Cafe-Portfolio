import { motion } from "motion/react";
import { menuItems } from "../../data";
import {
  Coffee,
  Cake,
  Utensils,
  Beer,
  Sparkles,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  TreeSilhouette,
} from "../silhouettes/silhouettes";

export default function Menu({ onNavigate }) {
  // Get signature/featured items for the homepage preview
  const featuredItems = menuItems.filter(
    (item) =>
      item.isSignature ||
      item.id === "m1" ||
      item.id === "m2" ||
      item.id === "m4" ||
      item.id === "m5" ||
      item.id === "m6" 
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Pasta & Mains":
        return <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "Espresso & Coffee":
        return <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "Specialty Drinks & Refreshers":
        return <Beer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      case "Cakes & Pastries":
        return <Cake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />;
    }
  };

  const smoothTransition = {
    duration: 0.8,
    ease: [0.215, 0.61, 0.355, 1.0],
  };

  return (
    <section
      id="menu"
      className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] overflow-hidden border-b border-sunflower/10"
    >
      {/* Background Light Rings */}
      <div className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 sm:w-96 sm:h-96 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />

      {/* Silhouette Watermarks */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 -right-16 w-64 h-48 sm:w-96 sm:h-72 text-emerald-950 opacity-[0.08] rotate-12" />
        <FernSilhouette className="absolute top-[45%] -left-16 w-56 h-56 sm:w-80 sm:h-80 text-emerald-950 opacity-[0.08] rotate-[35deg]" />
        <TreeSilhouette className="absolute -bottom-16 right-12 w-[220px] h-[340px] sm:w-[340px] sm:h-[480px] text-emerald-950 opacity-[0.06]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={smoothTransition}
          className="max-w-xl mx-auto text-center mb-6 sm:mb-12"
        >
          <span className="font-mono text-[10px] sm:text-xs font-semibold text-sunflower tracking-widest uppercase bg-sunflower/10 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
            Artisanal Offerings
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal mt-3 sm:mt-4 leading-tight">
            Our Signature Garden Delights
          </h2>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-2 sm:mt-3 leading-relaxed">
            Every item is handcrafted in our kitchen using freshly-harvested
            herbs and premium world-class coffee beans.
          </p>
        </motion.div>

        {/* Swipe Indicator (Visible on Mobile only) */}
        <div className="flex md:hidden justify-end items-center gap-1 mb-3 px-1 text-charcoal/50 font-mono text-[10px] uppercase font-bold tracking-wider select-none">
          <span>Swipe to explore</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            <ChevronRight className="w-3.5 h-3.5 text-sunflower" />
          </motion.div>
        </div>

        {/* Swipeable Slider Container */}
        <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 w-full text-left pb-6 md:pb-0 scrollbar-none">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                ...smoothTransition,
                delay: idx * 0.08,
              }}
              className="snap-center shrink-0 w-[82vw] sm:w-[340px] md:w-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-sunflower/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Food Image Container */}
              <div className="relative aspect-video overflow-hidden bg-cream">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Badge */}
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex gap-1.5">
                  <span className="bg-sunflower text-charcoal font-mono text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-charcoal" />
                    <span>Signature</span>
                  </span>
                </div>
                {/* Price Tag */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-charcoal/80 backdrop-blur-md text-white font-mono font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl shadow border border-white/10 text-[11px] sm:text-xs">
                  ₱{item.price}
                </div>
              </div>

              {/* Food Content details */}
              <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-sunflower text-[10px] sm:text-xs font-mono font-medium mb-1.5 sm:mb-2">
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-charcoal group-hover:text-sunflower transition-colors duration-300 truncate">
                    <span>{item.name}</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-charcoal/75 mt-1 sm:mt-2 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom / Tags */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-sunflower/10 flex flex-wrap gap-1">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] sm:text-[9px] font-mono text-charcoal/60 bg-cream border border-sunflower/20 px-1.5 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Menu CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ ...smoothTransition, delay: 0.1 }}
          className="mt-6 sm:mt-12 px-4 sm:px-0"
        >
          <button
            onClick={() => onNavigate("menu")}
            className="flex sm:inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-10 sm:py-4 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98 cursor-pointer w-full sm:w-auto text-sm sm:text-base"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Explore Entire Botanical Menu</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
