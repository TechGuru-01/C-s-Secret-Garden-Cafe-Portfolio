import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { menuItems } from "../../data";
import {
  Coffee,
  Cake,
  Utensils,
  Beer,
  Sparkles,
  AlertCircle,
  Search,
  ArrowLeft,
  CalendarDays,
  Leaf,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  WildFlowerSilhouette,
  TreeSilhouette,
  SunflowerSilhouette,
} from "../silhouettes/silhouettes";
import MenuItemCard from "./MenuItemCard";

export default function FullMenuPage({ onBackToHome, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Full category list
  const categories = [
    "All",
    "Pasta & Mains",
    "Espresso & Coffee",
    "Specialty Drinks & Refreshers",
    "Cakes & Pastries",
  ];

  // Toggle Favorite local state
  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

  // Base filtering matching the active category & search queries
  const getFilteredByCategory = (categoryName) => {
    return menuItems.filter((item) => {
      const matchesCategory =
        categoryName === "All" || item.category === categoryName;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  };

  // Grouped arrays for categories (Max 4 per row as requested)
  const categoryRows = useMemo(() => {
    if (activeCategory !== "All") {
      return [
        {
          title: activeCategory,
          items: getFilteredByCategory(activeCategory).slice(0, 4),
        },
      ];
    }

    return categories
      .filter((cat) => cat !== "All")
      .map((cat) => ({
        title: cat,
        items: getFilteredByCategory(cat).slice(0, 4),
      }))
      .filter((row) => row.items.length > 0); // Hide empty rows if searching
  }, [activeCategory, searchQuery]);

  // Total flat items count for checking empty states
  const totalDisplayCount = useMemo(() => {
    return categoryRows.reduce((acc, row) => acc + row.items.length, 0);
  }, [categoryRows]);

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts = { All: menuItems.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = menuItems.filter((item) => item.category === cat).length;
      }
    });
    return counts;
  }, []);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Pasta & Mains":
        return <Utensils className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case "Espresso & Coffee":
        return <Coffee className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case "Specialty Drinks & Refreshers":
        return <Beer className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      case "Cakes & Pastries":
        return <Cake className="w-3.5 h-3.5 md:w-4 md:h-4" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20 md:pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] min-h-screen text-left overflow-x-hidden relative"
    >
      {/* Background Decorative Blobs & Silhouettes (Responsive Opacities) */}
      <div className="absolute top-0 right-0 w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] max-w-[600px] bg-sunflower/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] max-w-[500px] bg-sunflower/3 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <CascadingBranchSilhouette className="absolute -top-6 md:-top-10 -right-12 md:-right-16 w-64 md:w-[450px] h-48 md:h-[300px] text-emerald-950 opacity-[0.08] md:opacity-[0.15] rotate-6" />
        <FernSilhouette className="absolute top-[40%] md:top-[35%] -left-12 md:-left-16 w-48 md:w-96 h-48 md:h-96 text-emerald-950 opacity-[0.06] md:opacity-[0.14] rotate-[20deg]" />
        <TreeSilhouette className="hidden md:block absolute bottom-12 right-12 w-[380px] h-[520px] text-emerald-950 opacity-[0.10]" />
        <SunflowerSilhouette
          className="hidden md:block absolute top-1/4 right-[30%] w-64 h-64 text-sunflower opacity-[0.08] animate-spin"
          style={{ animationDuration: "140s" }}
        />
      </div>

      {/* Outer constraint changes seamlessly from mobile max-w-md to desktop max-w-7xl */}
      <div className="max-w-md md:max-w-7xl mx-auto space-y-6 md:space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-mono font-bold text-sunflower tracking-wider cursor-pointer active:scale-95 md:hover:text-yellow-600 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 md:group-hover:-translate-x-1 transition-transform" />
            <span>BACK TO HOME GARDEN</span>
          </button>
        </div>

        {/* Hero Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 md:pb-8 border-b border-sunflower/10">
          <div className="space-y-3">
            <span className="font-mono text-[9px] md:text-xs font-bold text-sunflower uppercase tracking-widest bg-sunflower/10 px-3 py-1 md:px-4 md:py-1.5 rounded-full inline-flex items-center gap-1">
              <Leaf className="w-3 h-3 md:w-3.5 md:h-3.5" />
              <span>Gastronomy Archive</span>
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-charcoal tracking-tight">
              The Complete{" "}
              <span className="text-sunflower italic">Garden Menu</span>
            </h1>
            <p className="text-xs md:text-sm text-charcoal/70 max-w-2xl leading-relaxed">
              Every creation is culinary craftsmanship—fusing freshly picked
              garden botanicals, premium regional spices, and heirloom grains.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:max-w-md shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-4.5 md:h-4.5 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search dishes, coffees, or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 md:pl-11 pr-12 py-2.5 md:py-3 rounded-full bg-white border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none text-xs text-charcoal shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] md:text-[10px] font-mono font-bold text-charcoal/40 hover:text-charcoal"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-1 md:p-2 md:bg-cream/30 md:border md:border-sunflower/15 rounded-2xl md:rounded-full -mx-4 px-4 md:mx-0 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-2 md:px-6 md:py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap snap-clamp transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? "bg-sunflower text-charcoal shadow-sm md:shadow-md font-bold scale-102"
                  : "bg-white/60 text-charcoal/70 border border-sunflower/10 md:border-transparent md:bg-transparent md:hover:bg-white/50 md:hover:text-charcoal"
              }`}
            >
              {cat !== "All" && getCategoryIcon(cat)}
              <span>{cat}</span>
              <span
                className={`text-[9px] md:text-[10px] font-mono px-1.5 py-0.2 md:py-0.5 rounded-full ${
                  activeCategory === cat
                    ? "bg-white/40 text-charcoal"
                    : "bg-charcoal/5 text-charcoal/40"
                }`}
              >
                {categoryCounts[cat] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Items Rendering Grid/Slider Layouts */}
        {totalDisplayCount === 0 ? (
          <div className="text-center py-12 md:py-20 bg-white border border-dashed border-sunflower/25 rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-xl mx-auto space-y-3 md:space-y-4 shadow-sm">
            <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-sunflower mx-auto opacity-50" />
            <h3 className="font-serif font-bold text-sm md:text-lg text-charcoal">
              No Dishes Found
            </h3>
            <p className="text-[11px] md:text-xs text-charcoal/60 leading-relaxed">
              We couldn't find any garden delicacies matching "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-sunflower text-white text-[10px] md:text-xs font-bold shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12 pt-2">
            {categoryRows.map((row) => (
              <div key={row.title} className="space-y-3 md:space-y-4">
                {/* Section header */}
                <div className="flex items-center justify-between tracking-wide px-1">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(row.title)}
                    <h2 className="font-serif font-bold text-sm md:text-xl text-charcoal">
                      {row.title}
                    </h2>
                  </div>
                  {/* Visual swipe hint only shown on mobile screen sizes */}
                  <span className="md:hidden text-[10px] text-sunflower font-mono flex items-center gap-0.5 opacity-80">
                    Swipe <ChevronRight className="w-3 h-3" />
                  </span>
                </div>

                {/* Container Switcher: Mobile Touch Slider vs Desktop Grid Layout */}
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 md:gap-8 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory">
                  <AnimatePresence mode="popLayout">
                    {row.items.map((item, idx) => (
                      <div
                        key={item.id}
                        className="w-[78vw] sm:w-[50vw] max-w-[280px] md:w-auto md:max-w-none shrink-0 md:shrink snap-start snap-always"
                      >
                        <MenuItemCard
                          item={item}
                          idx={idx}
                          isFavorite={favorites.includes(item.id)}
                          onToggleFavorite={toggleFavorite}
                          categoryIcon={getCategoryIcon(item.category)}
                        />
                      </div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dietary Guidelines & Advisories Info Stack */}
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
          <div className="bg-cream/40 border border-sunflower/20 p-5 md:p-8 rounded-2xl md:rounded-3xl flex items-start gap-3 md:gap-4 shadow-sm">
            <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-sunflower shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-xs md:text-sm text-charcoal">
                Dietary & Allergy Advisory
              </h4>
              <p className="text-[11px] md:text-xs text-charcoal/70 mt-1 md:mt-2 leading-relaxed">
                Please inform our service hosts if you have severe dietary
                limits or food allergies. We seamlessly swap dairy with organic
                oat or soy milk.
              </p>
            </div>
          </div>

          <div className="hidden md:flex bg-white border border-sunflower/15 p-8 rounded-3xl items-start gap-4 shadow-sm">
            <Leaf className="w-6 h-6 text-sunflower shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-charcoal">
                The Botanical Philosophy
              </h4>
              <p className="text-xs text-charcoal/70 mt-2 leading-relaxed">
                We believe that nature holds the purest flavors. Every single
                morning, our gardeners harvest fresh botanicals from the Secret
                Garden lawn.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-[#FFF9EC] border border-sunflower/15 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center space-y-4 md:space-y-6 relative overflow-hidden shadow-sm md:shadow-md">
          <h3 className="font-serif text-lg md:text-3xl font-bold text-charcoal">
            Desire an Unforgettable Garden Experience?
          </h3>
          <p className="text-[11px] md:text-sm text-charcoal/80 max-w-xs md:max-w-xl mx-auto leading-relaxed">
            Reserve a wooden gazebo, an autumn sofa, or a cozy dining glasshouse
            matching live visual aesthetics.
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenBooking}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full bg-sunflower text-white text-xs md:text-sm font-bold shadow-sm md:shadow-md hover:bg-yellow-500 hover:shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <CalendarDays className="w-4 h-4 md:w-5 md:h-5" />
              <span>Reserve Your Table Seclusion</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
