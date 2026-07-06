import { motion } from 'motion/react';
import { menuItems } from '../../data';
import { Coffee, Cake, Utensils, Beer, Sparkles, BookOpen } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, TreeSilhouette } from '../silhouettes/silhouettes';

export default function Menu({ onNavigate }) {
  // Get signature/featured items for the homepage preview
  const featuredItems = menuItems.filter((item) => item.isSignature || item.id === 'm1' || item.id === 'm2' || item.id === 'm4' || item.id === 'm5' || item.id === 'm6' || item.id === 'p1');

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Pasta & Mains':
        return <Utensils className="w-4 h-4" />;
      case 'Espresso & Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Specialty Drinks & Refreshers':
        return <Beer className="w-4 h-4" />;
      case 'Cakes & Pastries':
        return <Cake className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] overflow-hidden border-b border-sunflower/10">
      
      {/* Dynamic Background Light Rings and Silhouette Watermarks */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 -right-16 w-96 h-72 text-emerald-950 opacity-[0.15] rotate-12" />
        <FernSilhouette className="absolute top-[45%] -left-16 w-80 h-80 text-emerald-950 opacity-[0.14] rotate-[35deg]" />
        <TreeSilhouette className="absolute -bottom-16 right-12 w-[340px] h-[480px] text-emerald-950 opacity-[0.10]" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          className="max-w-xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs font-semibold text-sunflower tracking-widest uppercase bg-sunflower/10 px-4 py-1.5 rounded-full">
            Artisanal Offerings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-4 leading-tight">
            Our Signature Garden Delights
          </h2>
          <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">
            Every item is handcrafted in our kitchen using freshly-harvested organic garden herbs, premium local ingredients, and world-class coffee beans.
          </p>
        </motion.div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left">
          {featuredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 55, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: 'spring', stiffness: 60, damping: 12, delay: idx * 0.12 }}
              className="group bg-white rounded-3xl overflow-hidden border border-sunflower/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Food Image Container */}
              <div className="relative aspect-video overflow-hidden bg-cream">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Signature / Best Seller Badge */}
                <div className="absolute top-4 left-4 flex gap-1.5">
                  <span className="bg-sunflower text-charcoal font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-charcoal" />
                    <span>Signature</span>
                  </span>
                </div>
                {/* Price Tag */}
                <div className="absolute bottom-4 right-4 bg-charcoal/80 backdrop-blur-md text-white font-mono font-semibold px-3 py-1.5 rounded-xl shadow border border-white/10 text-xs">
                  ₱{item.price}
                </div>
              </div>

              {/* Food Content details */}
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sunflower text-xs font-mono font-medium mb-2">
                    {getCategoryIcon(item.category)}
                    <span>{item.category}</span>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-charcoal group-hover:text-sunflower transition-colors duration-300">
                    <span>{item.name}</span>
                  </h3>
                  <p className="text-xs text-charcoal/75 mt-2 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom / Tags */}
                <div className="mt-4 pt-4 border-t border-sunflower/10 flex flex-wrap gap-1.5">
                  {item.tags?.map((tag) => (
                    <span key={tag} className="text-[9px] font-mono text-charcoal/60 bg-cream border border-sunflower/20 px-2 py-0.5 rounded-md">
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
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: 'spring', stiffness: 80, damping: 11, delay: 0.3 }}
          className="mt-12"
        >
          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-2.5 px-10 py-4 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>Explore Entire Botanical Menu</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
