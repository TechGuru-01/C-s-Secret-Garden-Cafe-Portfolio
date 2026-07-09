import { useState } from "react";
import { motion } from "motion/react"; // or 'framer-motion'
import { Sparkles, Heart } from "lucide-react";

export default function MenuItemCard({
  item,
  idx,
  isFavorite,
  onToggleFavorite,
  categoryIcon,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Threshold to determine if a description needs a "See More" toggle
  const isLongDescription = item.description && item.description.length > 60;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
        delay: Math.min(idx * 0.02, 0.1),
      }}
      // Mobile: uses ml-3 and fixed h-[340px] for horizontal side-scrolling snap profiles
      // Desktop (md+): resets margins to mesh with parent grids, scales to h-full (or min-h-[420px])
      className="ml-3 md:ml-0 my-1 group bg-white rounded-xl md:rounded-2xl overflow-hidden border border-sunflower/15 shadow-sm md:shadow-md flex flex-col justify-between h-[340px] md:h-full md:min-h-[420px] select-none md:hover:shadow-lg md:hover:border-sunflower/30 transition-all duration-300"
    >
      {/* Photo Section */}
      <div className="relative aspect-[16/11] overflow-hidden bg-cream shrink-0">
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy" // <-- Native browser lazy loading
          className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-500 opacity-0 transition-opacity"
          onLoad={(e) => e.currentTarget.classList.remove("opacity-0")} // <-- Soft fade-in when fully loaded
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Left Badges */}
        <div className="absolute top-2.5 left-2.5 md:top-4 md:left-4 flex flex-col gap-1">
          {item.isSignature && (
            <span className="bg-sunflower text-charcoal font-mono text-[8px] md:text-[10px] font-bold uppercase px-2 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-charcoal animate-pulse" />
              <span>Signature</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className="absolute top-2.5 right-2.5 md:top-4 md:right-4 p-1.5 md:p-2 rounded-full bg-white/80 backdrop-blur-md shadow border border-white/20 text-charcoal active:scale-90 md:hover:bg-white md:hover:text-red-500 transition-all cursor-pointer"
        >
          <motion.div
            animate={{ scale: isFavorite ? [1, 1.25, 1] : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Heart
              className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
                isFavorite ? "text-red-500 fill-red-500" : "text-charcoal/60"
              }`}
            />
          </motion.div>
        </button>

        {/* Price Label */}
        <div className="absolute bottom-2.5 right-2.5 md:bottom-4 md:right-4 bg-charcoal/85 backdrop-blur-sm text-white font-mono font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded-md border border-white/10 text-[10px] md:text-xs">
          ₱{item.price}
        </div>
      </div>

      {/* Description / Content Section */}
      <div className="p-3.5 md:p-5 flex-grow flex flex-col justify-between overflow-hidden">
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center gap-1 text-sunflower text-[8px] md:text-[10px] font-mono font-semibold tracking-wider uppercase">
            {categoryIcon}
            <span>{item.category}</span>
          </div>

          <h3 className="font-serif font-bold text-sm md:text-base lg:text-lg text-charcoal line-clamp-1 md:line-clamp-2">
            {item.name}
          </h3>

          {/* See More Expandable Content wrapper */}
          <div className="text-[10px] md:text-xs text-charcoal/70 leading-relaxed transition-all duration-300">
            <p
              className={
                isExpanded
                  ? "overflow-y-auto max-h-[85px] md:max-h-[120px] pr-1"
                  : "line-clamp-2 md:line-clamp-3"
              }
            >
              {item.description}
            </p>
            {isLongDescription && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-sunflower font-bold font-mono text-[8px] md:text-[10px] uppercase mt-0.5 md:mt-1 tracking-wider inline-block focus:outline-none cursor-pointer"
              >
                {isExpanded ? "See Less ▲" : "See More ▼"}
              </button>
            )}
          </div>
        </div>

        {/* Item Tags - Adjusted upper padding on desktop */}
        <div className="pt-1.5 md:pt-3 border-t border-sunflower/10 flex flex-wrap gap-1 shrink-0">
          {item.tags?.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] md:text-[10.7px] font-mono text-black/50 bg-cream border border-sunflower/10 px-1.5 py-0.2 md:px-2 md:py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
