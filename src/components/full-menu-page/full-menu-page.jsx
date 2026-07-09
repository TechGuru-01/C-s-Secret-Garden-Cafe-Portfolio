import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { menuItems } from "../../data";
import {
  AlertCircle,
  ArrowLeft,
  Boxes,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Citrus,
  Coffee,
  CupSoda,
  Beer,
  HelpCircle,
  Layers,
  Leaf,
  Sandwich,
  Search,
  Soup,
  Sparkles,
  Utensils,
  Bone, // For Pork / Spare ribs
  Egg, // For All Day Breakfast
  Fish, // For Seafood
  Footprints, // Alternative variant, or we can use Drumstick for Chicken
  Drumstick, // For Chicken
  Flame,
} from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  TreeSilhouette,
} from "../silhouettes/silhouettes";
import MenuItemCard from "./MenuItemCard";

export default function FullMenuPage({ onBackToHome, onOpenBooking }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Numeric Pagination for Categories (3 Categories per page when viewing "All")
  const [currentPage, setCurrentPage] = useState(1);
  const CATEGORIES_PER_PAGE = 3;
  const VISIBLE_ITEMS_LIMIT = 8; // Max items per category row on dashboard view

  // Reset page position to 1 whenever main active tab choices shift
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubCategory, searchQuery]);

  // Setup Refs for tracking custom desktop horizontal click-and-drag actions
  const scrollRef = useRef(null);
  const subScrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftState = useRef(0);

  // Main categories list
  const categories = [
    "All",
    "Budget Meals (Buy 1 take 1)",
    "Sharing Plates",
    "Rice Meals",
    "On A Bun",
    "Pasta",
    "Drinks",
    "Add ons",
  ];

  // Sub-categories exclusively for Budget Meals
  const budgetSubCategories = [
    "All",
    "Meals",
    "Iced Coffee",
    "On A Bun Combo",
    "Juices",
  ];
  const riceMealSubCategories = [
    "All",
    "Pork",
    "Beef",
    "Chicken",
    "Seafood",
    "All Day Breakfast",
  ];
  const drinksSubCategories = [
    "All",
    "Iced Coffee",
    "Loose Tea",
    "Lemon Drinks",
    "Fruit Soda",
    "Soda",
    "Juices",
    "Alcoholic Drinks",
  ];

  const createDragHandlers = (ref) => ({
    onMouseDown: (e) => {
      isDown.current = true;
      ref.current.classList.add("cursor-grabbing");
      ref.current.classList.remove("cursor-grab");
      startX.current = e.pageX - ref.current.offsetLeft;
      scrollLeftState.current = ref.current.scrollLeft;
    },
    onMouseLeave: () => {
      isDown.current = false;
      if (ref.current) {
        ref.current.classList.remove("cursor-grabbing");
        ref.current.classList.add("cursor-grab");
      }
    },
    onMouseUp: () => {
      isDown.current = false;
      if (ref.current) {
        ref.current.classList.remove("cursor-grabbing");
        ref.current.classList.add("cursor-grab");
      }
    },
    onMouseMove: (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      ref.current.scrollLeft = scrollLeftState.current - walk;
    },
  });

  const mainScrollHandlers = createDragHandlers(scrollRef);
  const subScrollHandlers = createDragHandlers(subScrollRef);

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
    }
  };

const getFilteredByCategory = (categoryName, subCategoryName = "All") => {
  return menuItems.filter((item) => {
    const matchesCategory =
      categoryName === "All" || item.category === categoryName;

    // Updated block to support sub-category routing for both Budget Meals and Rice Meals
    const isSubCategorizedSection =
      categoryName === "Budget Meals (Buy 1 take 1)" ||
      categoryName === "Rice Meals" ||
      categoryName === "Drinks"; // Included Drinks as well since it has sub-categories defined

    const matchesSubCategory =
      !isSubCategorizedSection ||
      subCategoryName === "All" ||
      item.subCategory === subCategoryName ||
      (item.tags &&
        item.tags.some(
          (t) => t.toLowerCase() === subCategoryName.toLowerCase(),
        ));

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tags &&
        item.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    return matchesCategory && matchesSubCategory && matchesSearch;
  });
};

  // 1. Gather rows dynamically based on layout specifications
  const allRows = useMemo(() => {
    if (activeCategory !== "All") {
      return [
        {
          title: activeCategory,
          items: getFilteredByCategory(activeCategory, activeSubCategory),
        },
      ];
    }

    return categories
      .filter((cat) => cat !== "All")
      .map((cat) => ({
        title: cat,
        items: getFilteredByCategory(cat),
      }))
      .filter((row) => row.items.length > 0);
  }, [activeCategory, activeSubCategory, searchQuery]);

  // 2. Slice the rows depending on if "All" is active (Applying 3 rows per page limit)
  const displayRows = useMemo(() => {
    if (activeCategory !== "All") return allRows;

    const startOffset = (currentPage - 1) * CATEGORIES_PER_PAGE;
    return allRows.slice(startOffset, startOffset + CATEGORIES_PER_PAGE);
  }, [allRows, activeCategory, currentPage]);

  const totalPages = Math.ceil(allRows.length / CATEGORIES_PER_PAGE);

  const totalDisplayCount = useMemo(() => {
    return displayRows.reduce((acc, row) => acc + row.items.length, 0);
  }, [displayRows]);

  const categoryCounts = useMemo(() => {
    const counts = { All: menuItems.length };
    categories.forEach((cat) => {
      if (cat !== "All") {
        counts[cat] = menuItems.filter((item) => item.category === cat).length;
      }
    });
    return counts;
  }, [searchQuery]);

  const getCategoryIcon = (category) => {
    const iconClass = "w-3.5 h-3.5 md:w-4 md:h-4";
    switch (category) {
      // Main Categories
      case "Budget Meals (Buy 1 take 1)":
      case "Meals":
      case "Rice Meals":
        return <Utensils className={iconClass} />;
      case "Sharing Plates":
        return <Boxes className={iconClass} />;
      case "Pasta":
        return <Soup className={iconClass} />;
      case "On A Bun":
        return <Sandwich className={iconClass} />;
      case "Add ons":
        return <CirclePlus className={iconClass} />;
      case "Drinks":
      case "Fruit Soda":
      case "Juices":
        return <CupSoda className={iconClass} />;
      case "Iced Coffee":
        return <Coffee className={iconClass} />;
      case "On A Bun Combo":
        return <Layers className={iconClass} />;
      case "Loose Tea":
        return <Leaf className={iconClass} />;
      case "Lemon Drinks":
        return <Citrus className={iconClass} />;
      case "Alcoholic Drinks":
        return <Beer className={iconClass} />;

      // Rice Meals Sub-Categories
      case "Pork":
        return <Bone className={iconClass} />;
      case "Beef":
        return <Flame className={iconClass} />;
      case "Chicken":
        return <Drumstick className={iconClass} />;
      case "Seafood":
        return <Fish className={iconClass} />;
      case "All Day Breakfast":
        return <Egg className={iconClass} />;

      default:
        return <Sparkles className={iconClass} />;
    }
  };

  // Direct router-like state shift to simulate diving into a specific item category view
  const handleSeeMoreClick = (categoryTitle) => {
    setActiveCategory(categoryTitle);
    setActiveSubCategory("All");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-20 md:pt-24 pb-24 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] min-h-screen text-left overflow-x-hidden relative"
    >
      <div className="absolute top-0 right-0 w-[70vw] md:w-[50vw] h-[70vw] md:h-[50vw] max-w-[600px] bg-sunflower/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[40vw] h-[40vw] max-w-[500px] bg-sunflower/3 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10">
        <CascadingBranchSilhouette className="absolute -top-6 md:-top-10 -right-12 md:-right-16 w-64 md:w-[450px] h-48 md:h-[300px] text-emerald-950 opacity-[0.08] md:opacity-[0.15] rotate-6" />
        <FernSilhouette className="absolute top-[40%] md:top-[35%] -left-12 md:-left-16 w-48 md:w-96 h-48 md:h-96 text-emerald-950 opacity-[0.06] md:opacity-[0.14] rotate-[20deg]" />
        <TreeSilhouette className="hidden md:block absolute bottom-12 right-12 w-[380px] h-[520px] text-emerald-950 opacity-[0.10]" />
      </div>

      <div className="max-w-md md:max-w-7xl mx-auto space-y-6 md:space-y-8">
        <div>
          {activeCategory !== "All" ? (
            <button
              onClick={() => setActiveCategory("All")}
              className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-mono font-bold text-sunflower tracking-wider cursor-pointer active:scale-95 md:hover:text-yellow-600 transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 md:group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO MAIN DASHBOARD</span>
            </button>
          ) : (
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-[10px] md:text-xs font-mono font-bold text-sunflower tracking-wider cursor-pointer active:scale-95 md:hover:text-yellow-600 transition-all group"
            >
              <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 md:group-hover:-translate-x-1 transition-transform" />
              <span>BACK TO HOME GARDEN</span>
            </button>
          )}
        </div>

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
          </div>

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

        <div className="space-y-3">
          <div
            ref={scrollRef}
            {...mainScrollHandlers}
            className="flex flex-nowrap items-center gap-2 md:gap-3 overflow-x-auto overflow-y-hidden pb-2 pt-1 -mx-4 px-4 scrollbar-none snap-x w-full auto-cols-max cursor-grab active:cursor-grabbing select-none"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveSubCategory("All");
                }}
                onDragStart={(e) => e.preventDefault()}
                className={`flex items-center gap-1.5 px-3.5 py-2 md:px-6 md:py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap snap-clamp transition-all duration-300 cursor-pointer shrink-0 pointer-events-auto ${
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

          <AnimatePresence>
            {(activeCategory === "Budget Meals (Buy 1 take 1)" ||
              activeCategory === "Drinks" ||
              activeCategory === "Rice Meals") && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="pl-2 border-l-2 border-sunflower/30 space-y-1.5"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/40 block font-bold">
                  Filter {activeCategory} Sub-Categories:
                </span>
                <div
                  ref={subScrollRef}
                  {...subScrollHandlers}
                  className="flex flex-nowrap items-center gap-2 overflow-x-auto overflow-y-hidden pb-2 -mx-4 px-4 scrollbar-none w-full auto-cols-max cursor-grab active:cursor-grabbing select-none"
                >
                  {(activeCategory === "Budget Meals (Buy 1 take 1)"
                    ? budgetSubCategories
                    : activeCategory === "Drinks"
                      ? drinksSubCategories
                      : riceMealSubCategories
                  ).map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => setActiveSubCategory(subCat)}
                      onDragStart={(e) => e.preventDefault()}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                        activeSubCategory === subCat
                          ? "bg-charcoal text-white shadow-sm font-semibold"
                          : "bg-white border border-charcoal/10 text-charcoal/60 hover:bg-charcoal/5"
                      }`}
                    >
                      {subCat !== "All" && getCategoryIcon(subCat)}
                      <span>{subCat}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {totalDisplayCount === 0 ? (
          <div className="text-center py-12 md:py-20 bg-white border border-dashed border-sunflower/25 rounded-2xl md:rounded-3xl p-6 md:p-10 max-w-xl mx-auto space-y-3 md:space-y-4 shadow-sm">
            <HelpCircle className="w-10 h-10 md:w-12 md:h-12 text-sunflower mx-auto opacity-50" />
            <h3 className="font-serif font-bold text-sm md:text-lg text-charcoal">
              No Dishes Found
            </h3>
            <p className="text-[11px] md:text-xs text-charcoal/60 leading-relaxed">
              We couldn't find any items matching your filter selections.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setActiveSubCategory("All");
              }}
              className="px-4 py-1.5 md:px-5 md:py-2 rounded-full bg-sunflower text-white text-[10px] md:text-xs font-bold shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8 md:space-y-12 pt-2">
            {displayRows.map((row) => {
              // Condition check to see if we should enforce the 8 item slice limit
              const isDashboardView = activeCategory === "All";
              const totalItemsCount = row.items.length;
              const hasMoreThanLimit = totalItemsCount > VISIBLE_ITEMS_LIMIT;

              const finalRenderedItems = isDashboardView
                ? row.items.slice(0, VISIBLE_ITEMS_LIMIT)
                : row.items;

              return (
                <div key={row.title} className="space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between tracking-wide px-1">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(row.title)}
                      <h2 className="font-serif font-bold text-sm md:text-xl text-charcoal">
                        {row.title}
                        {(activeCategory === "Budget Meals (Buy 1 take 1)" ||
                          activeCategory === "Rice Meals") &&
                          activeSubCategory !== "All" && (
                            <span className="text-xs font-sans text-charcoal/50 font-normal ml-2">
                              &rsaquo; {activeSubCategory}
                            </span>
                          )}
                      </h2>
                    </div>

                    {/* Dynamic See More display header button alternative */}
                    {isDashboardView && hasMoreThanLimit ? (
                      <button
                        onClick={() => handleSeeMoreClick(row.title)}
                        className="text-[11px] md:text-xs font-mono font-bold text-sunflower hover:text-yellow-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        SEE MORE ({totalItemsCount - VISIBLE_ITEMS_LIMIT}){" "}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="md:hidden text-[10px] text-sunflower font-mono flex items-center gap-0.5 opacity-80">
                        Swipe <ChevronRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 md:gap-8 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none snap-x snap-mandatory">
                    <AnimatePresence mode="popLayout">
                      {finalRenderedItems.map((item, idx) => (
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
              );
            })}

            {/* Traditional Page-by-Page Pagination Bar (Triggered on active "All" category state) */}
            {activeCategory === "All" && totalPages > 1 && (
              <div className="pt-6 flex justify-center items-center gap-1.5 md:gap-2 select-none">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={`p-2 rounded-full border border-sunflower/20 transition-all ${
                    currentPage === 1
                      ? "opacity-40 cursor-not-allowed text-charcoal/30 bg-gray-50"
                      : "bg-white text-charcoal hover:bg-sunflower/5 active:scale-90 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`min-w-[32px] h-8 md:min-w-[36px] md:h-9 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                        currentPage === pageNumber
                          ? "bg-sunflower border-sunflower text-charcoal font-bold shadow-sm"
                          : "bg-white border-charcoal/10 text-charcoal/70 hover:bg-charcoal/5 active:scale-95"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className={`p-2 rounded-full border border-sunflower/20 transition-all ${
                    currentPage === totalPages
                      ? "opacity-40 cursor-not-allowed text-charcoal/30 bg-gray-50"
                      : "bg-white text-charcoal hover:bg-sunflower/5 active:scale-90 cursor-pointer"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

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
