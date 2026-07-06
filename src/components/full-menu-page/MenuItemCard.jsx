import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

export default function MenuItemCard({ item, idx, isFavorite, onToggleFavorite, categoryIcon }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 35, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 85, damping: 12, delay: Math.min(idx * 0.04, 0.25) }}
      className="group bg-white rounded-3xl overflow-hidden border border-sunflower/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      {/* Photo Section */}
      <div className="relative aspect-video overflow-hidden bg-cream">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />

        {/* Gradient overlay for better text contrast/premium feel */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Left Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {item.isSignature && (
            <span className="bg-sunflower text-charcoal font-mono text-[9px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-charcoal animate-pulse" />
              <span>Signature Delight</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/70 backdrop-blur-md shadow border border-white/20 text-charcoal hover:bg-white transition-colors cursor-pointer"
        >
          <Heart className={`w-4 h-4 transition-colors ${
            isFavorite ? 'text-red-500 fill-red-500' : 'text-charcoal/60'
          }`} />
        </button>

        {/* Absolute Price Label */}
        <div className="absolute bottom-4 right-4 bg-charcoal/85 backdrop-blur-md text-white font-mono font-semibold px-3 py-1.5 rounded-xl shadow border border-white/10 text-xs">
          ₱{item.price}
        </div>
      </div>

      {/* Description / Content Section */}
      <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sunflower text-[10px] font-mono font-semibold tracking-wider uppercase">
            {categoryIcon}
            <span>{item.category}</span>
          </div>
          
          <h3 className="font-serif font-bold text-lg text-charcoal group-hover:text-sunflower transition-colors duration-300">
            {item.name}
          </h3>
          
          <p className="text-xs text-charcoal/70 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Item Tags / Dietary flags */}
        <div className="pt-4 border-t border-sunflower/10 flex flex-wrap gap-1.5">
          {item.tags?.map((tag) => (
            <span key={tag} className="text-[9px] font-mono text-charcoal/60 bg-cream border border-sunflower/20 px-2.5 py-0.5 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
