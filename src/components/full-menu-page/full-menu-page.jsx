import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuItems } from '../../data';
import { 
  Coffee, Cake, Utensils, Beer, Sparkles, AlertCircle, 
  Search, ArrowLeft, CalendarDays, Leaf, HelpCircle 
} from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, WildFlowerSilhouette, TreeSilhouette, SunflowerSilhouette } from '../silhouettes/silhouettes';
import MenuItemCard from './MenuItemCard';

export default function FullMenuPage({ onBackToHome, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Full category list
  const categories = ['All', 'Pasta & Mains', 'Espresso & Coffee', 'Specialty Drinks & Refreshers', 'Cakes & Pastries'];

  // Toggle Favorite local state
  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  // Filter and search logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { All: menuItems.length };
    categories.forEach(cat => {
      if (cat !== 'All') {
        counts[cat] = menuItems.filter(item => item.category === cat).length;
      }
    });
    return counts;
  }, []);

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
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] min-h-screen text-left"
    >
      {/* Background Decorative Blobs & Silhouettes */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] max-w-[600px] bg-sunflower/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] max-w-[500px] bg-sunflower/3 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <CascadingBranchSilhouette className="absolute -top-10 -right-16 w-[450px] h-[300px] text-emerald-950 opacity-[0.15] rotate-6" />
        <FernSilhouette className="absolute top-[35%] -left-16 w-96 h-96 text-emerald-950 opacity-[0.14] rotate-[20deg]" />
        <TreeSilhouette className="absolute bottom-12 right-12 w-[380px] h-[520px] text-emerald-950 opacity-[0.10]" />
        <WildFlowerSilhouette className="absolute bottom-20 left-20 w-48 h-72 text-emerald-950 opacity-[0.12]" />
        <SunflowerSilhouette className="absolute top-1/4 right-[30%] w-64 h-64 text-sunflower opacity-[0.08] animate-spin" style={{ animationDuration: '140s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb / Go Back Link */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sunflower hover:text-yellow-600 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME GARDEN</span>
          </button>
        </div>

        {/* Elegant Hero Typography Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-8 border-b border-sunflower/10">
          <div>
            <span className="font-mono text-xs font-semibold text-sunflower uppercase tracking-widest bg-sunflower/10 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Gastronomy Archive</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal mt-4 tracking-tight leading-none">
              The Complete <span className="text-sunflower italic">Garden Menu</span>
            </h1>
            <p className="text-sm text-charcoal/70 mt-3 max-w-2xl leading-relaxed">
              Every creation is culinary craftsmanship—fusing freshly picked garden botanicals, premium regional spices, organic syrups, and heirloom grains. Dive into our culinary story.
            </p>
          </div>

          {/* Search Box inside the header for pristine layout */}
          <div className="relative w-full lg:max-w-md shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search dishes, coffees, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none font-medium text-xs text-charcoal shadow-sm transition-all placeholder:text-charcoal/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-charcoal/40 hover:text-charcoal cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Category Tab Bar Row with Item Counts */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-cream/30 border border-sunflower/15 p-2 rounded-2xl sm:rounded-full mb-10 overflow-x-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-sunflower text-charcoal shadow-md scale-105 font-bold'
                  : 'text-charcoal/70 hover:bg-white/50 hover:text-charcoal'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                activeCategory === cat ? 'bg-white/35 text-charcoal font-bold' : 'bg-charcoal/5 text-charcoal/50'
              }`}>
                {categoryCounts[cat] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Grid of Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-dashed border-sunflower/25 rounded-3xl p-10 max-w-xl mx-auto space-y-4 shadow-sm">
            <HelpCircle className="w-12 h-12 text-sunflower mx-auto opacity-50" />
            <h3 className="font-serif font-bold text-lg text-charcoal">No Dishes Found</h3>
            <p className="text-xs text-charcoal/60 leading-relaxed">
              We couldn&apos;t find any garden delicacies matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;latte&rdquo;, &ldquo;pasta&rdquo;, &ldquo;crispy&rdquo;, or choose another category above.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-5 py-2 rounded-full bg-sunflower text-white text-xs font-bold hover:bg-yellow-500 shadow-sm cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  idx={idx}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  categoryIcon={getCategoryIcon(item.category)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Dietary Guidelines & Botanical Note */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: 'spring', stiffness: 65, damping: 13 }}
            className="bg-cream/40 border border-sunflower/20 p-8 rounded-3xl flex items-start gap-4 text-left shadow-sm"
          >
            <AlertCircle className="w-6 h-6 text-sunflower flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-charcoal">Dietary & Allergy Advisory</h4>
              <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
                Please inform our service hosts if you have severe dietary limits or food allergies (such as shellfish, nuts, dairy, or gluten). We are passionate about custom tailoring your plates, swapping dairy with organic oat or soy milk, or preparing specialized meals for your family.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: 'spring', stiffness: 65, damping: 13, delay: 0.15 }}
            className="bg-white border border-sunflower/15 p-8 rounded-3xl flex items-start gap-4 text-left shadow-sm"
          >
            <Leaf className="w-6 h-6 text-sunflower flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-charcoal">The Botanical Philosophy</h4>
              <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
                We believe that nature holds the purest flavors. Every single morning, our gardeners harvest fresh basil, rosemary, mint, and edible blooms from the Secret Garden lawn, directly infusing your hot tea, refreshers, and signature pastas with authentic garden therapy.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Book a Table Action Banner at bottom of the complete menu */}
        <motion.div 
          initial={{ opacity: 0, y: 55, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 60, damping: 12 }}
          className="mt-20 bg-[#FFF9EC] border border-sunflower/15 rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-md"
        >
          {/* Subtle leaves in background of banner */}
          <div className="absolute top-0 left-0 w-32 h-32 text-sunflower/5 pointer-events-none rotate-45">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.08,15.9 6.5,9.74 15,8V2H17V8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            Desire an Unforgettable Garden Experience?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Reserve a wooden gazebo, an autumn sofa, or a cozy dining glasshouse. Pair our complete menu with premium seclusion and live visual aesthetics.
          </p>
          
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-4.5 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              <CalendarDays className="w-5 h-5" />
              <span>Reserve Your Table Seclusion</span>
            </button>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
