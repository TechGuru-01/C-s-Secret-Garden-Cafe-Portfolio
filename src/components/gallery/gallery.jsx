import { useState } from "react";
import { createPortal } from "react-dom"; // Added for portal teleportation
import { motion, AnimatePresence } from "motion/react";
import { galleryItems } from "../../data";
import {
  Eye,
  Image as ImageIcon,
  X,
  Heart,
  Sparkles,
  MoveRight,
} from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  WildFlowerSilhouette,
} from "../silhouettes/silhouettes";

const getGridCardClasses = (index, isBento) => {
  if (!isBento) {
    return "col-span-2 sm:col-span-1 h-64 sm:h-80 md:h-96 rounded-3xl";
  }

  switch (index) {
    case 0:
      return "col-span-2 row-span-2 min-h-[280px] sm:min-h-full rounded-tl-[2.5rem] rounded-br-[2.5rem] sm:rounded-tl-[3.5rem] sm:rounded-br-[3.5rem] rounded-tr-xl rounded-bl-xl";
    case 1:
      return "col-span-1 row-span-1 h-full rounded-xl rounded-tr-[1.5rem] sm:rounded-tr-[2.5rem]";
    case 2:
      return "col-span-1 row-span-1 h-full rounded-xl rounded-bl-[1.5rem] sm:rounded-bl-[2.5rem]";
    case 3:
      return "col-span-2 row-span-1 lg:col-span-2 h-full rounded-xl rounded-br-[2.5rem] sm:rounded-br-[3.5rem] rounded-tl-xl";
    default:
      return "col-span-1 row-span-1 h-full rounded-2xl";
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 15,
    transition: { duration: 0.2 },
  },
};

export default function Gallery() {
  const [filter, setFilter] = useState("food");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = galleryItems
    .filter((item) => item.category === filter)
    .slice(0, 4);

  const isBento = filteredItems.length > 3;

  return (
    <section
      id="gallery"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-cream/10 via-cream/30 to-cream/10 overflow-hidden border-b border-sunflower/10"
    >
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-sunflower/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-900/5 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse duration-[8000ms]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 left-[25%] w-[420px] h-[280px] text-emerald-900 opacity-[0.11] rotate-6" />
        <FernSilhouette className="absolute bottom-[8%] -left-16 w-80 h-80 text-emerald-900 opacity-[0.12] rotate-[25deg]" />
        <WildFlowerSilhouette className="absolute top-[20%] right-10 w-48 h-72 text-emerald-900 opacity-[0.10]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 70, damping: 14 }}
          className="max-w-xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs font-bold text-sunflower tracking-widest uppercase bg-sunflower/10 px-4 py-1.5 rounded-full inline-flex items-center gap-2 shadow-[inset_0_1px_2px_rgba(218,165,32,0.1)]">
            <ImageIcon className="w-3.5 h-3.5 text-sunflower animate-bounce" />
            <span>Visual Showcase</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-4 leading-tight relative inline-block">
            Our Signature Gallery
            <span className="absolute -bottom-2 left-1/4 right-1/4 h-[3px] bg-gradient-to-r from-transparent via-sunflower/40 to-transparent rounded-full" />
          </h2>
          <p className="text-sm text-charcoal/70 mt-5 leading-relaxed">
            Take a look at the scenic corners, romantic candlelit dinners, and
            freshly-prepared meals that define the magic of C&apos;s Garden.
          </p>
        </motion.div>

        <div className="w-full flex flex-col items-center mb-12 relative px-2">
          <div className="relative w-full max-w-xl flex justify-center items-center">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-cream/30 to-transparent z-20 pointer-events-none md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-cream/30 to-transparent z-20 pointer-events-none md:hidden" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                delay: 0.15,
              }}
              className="inline-flex max-w-full items-center justify-start md:justify-center p-1.5 bg-white/60 backdrop-blur-md border border-sunflower/15 rounded-full gap-1 shadow-sm overflow-x-auto scrollbar-none snap-x"
            >
              {["food", "atmosphere", "moments"].map((tab) => {
                const isActive = filter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`relative px-6 py-2.5 rounded-full text-xs font-bold tracking-wider capitalize transition-all duration-300 cursor-pointer z-10 shrink-0 snap-center ${
                      isActive
                        ? "text-white shadow-md"
                        : "text-charcoal/60 hover:text-charcoal hover:bg-cream/40"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBackground"
                        className="absolute inset-0 bg-sunflower rounded-full -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      {isActive && (
                        <Sparkles className="w-3 h-3 text-white animate-spin duration-1000" />
                      )}
                      {tab === "food"
                        ? "Food & Drinks"
                        : tab === "atmosphere"
                          ? "Garden Ambiance"
                          : "Guest Moments"}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </div>

          <div className="flex items-center gap-1 mt-2.5 text-[10px] font-mono tracking-widest font-bold text-sunflower/60 uppercase select-none md:hidden animate-pulse">
            <span>Swipe categories</span>
            <MoveRight className="w-3 h-3 animate-bounce horizontal-bounce" />
          </div>
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className={
                isBento
                  ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[140px] sm:auto-rows-[240px] md:auto-rows-[280px] grid-flow-row-dense"
                  : "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
              }
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  variants={cardVariants}
                  whileHover={{ scale: 1.025, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  key={item.id}
                  className={`group relative ${getGridCardClasses(index, isBento)} bg-white overflow-hidden border border-sunflower/15 shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer flex flex-col`}
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="absolute inset-3 sm:inset-4 border border-white/10 rounded-[inherit] z-20 pointer-events-none transition-all duration-500 group-hover:inset-4 sm:group-hover:inset-5 group-hover:border-sunflower/20" />

                  <div className="w-full h-full overflow-hidden absolute inset-0">
                    <img
                      src={item.imageUrl}
                      alt={item.caption}
                      className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[800ms] ease-out absolute inset-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-between p-4 sm:p-6 text-left z-10">
                    <div className="flex justify-end transform -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                      <span className="bg-white/95 backdrop-blur-md text-charcoal border border-sunflower/20 text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow-sm">
                        {item.category === "food"
                          ? "Menu"
                          : item.category === "atmosphere"
                            ? "Garden"
                            : "Moments"}
                      </span>
                    </div>

                    <div className="transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 delay-100">
                      <div className="flex items-center gap-1.5 text-sunflower">
                        <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sunflower" />
                        <span className="text-[9px] sm:text-[10px] font-bold tracking-widest font-sans uppercase">
                          Quick View
                        </span>
                      </div>
                      <p className="text-white text-[11px] sm:text-xs mt-1 font-medium leading-tight sm:leading-relaxed font-sans line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- DYNAMIC PORTAL LIGHTBOX MODAL --- */}
        {typeof window !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 bg-charcoal/95 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div
                    initial={{ scale: 0.92, y: 30, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.92, y: 30, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 180 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row border border-white/20 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-charcoal/85 text-white hover:bg-sunflower hover:text-charcoal shadow-lg z-10 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="md:w-7/12 aspect-[4/3] md:aspect-auto overflow-hidden bg-cream flex items-center">
                      <img
                        src={selectedImage.imageUrl}
                        alt={selectedImage.caption}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="md:w-5/12 p-8 flex flex-col justify-between bg-gradient-to-br from-cream/40 via-white to-cream/20">
                      <div className="text-left">
                        <span className="font-mono text-[10px] font-bold text-sunflower uppercase tracking-widest border border-sunflower/20 bg-sunflower/5 px-3 py-1 rounded-full">
                          {selectedImage.category === "food"
                            ? "Food & Drink Showcase"
                            : selectedImage.category === "atmosphere"
                              ? "Botanical Atmosphere"
                              : "Customer Experience"}
                        </span>

                        <h3 className="font-serif font-bold text-2xl text-charcoal mt-6 leading-tight">
                          {selectedImage.category === "food"
                            ? "Freshly Prepared Signature"
                            : selectedImage.category === "atmosphere"
                              ? "Hidden Garden Oasis"
                              : "Moments We Share"}
                        </h3>

                        <p className="text-sm text-charcoal/80 mt-4 leading-relaxed font-sans">
                          {selectedImage.caption}
                        </p>

                        <div className="flex items-center gap-1 mt-6 text-sunflower">
                          <Heart className="w-4 h-4 fill-sunflower" />
                          <span className="text-xs font-mono font-semibold text-charcoal/60">
                            C&apos;s Garden Customer Favorite
                          </span>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-sunflower/15 text-left flex flex-col gap-2">
                        <p className="text-[10px] font-mono text-charcoal/50">
                          LOCATION
                        </p>
                        <p className="text-xs font-medium text-charcoal">
                          525 J. Lallana St. Rafael Palma, San Antonio
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </section>
  );
}
