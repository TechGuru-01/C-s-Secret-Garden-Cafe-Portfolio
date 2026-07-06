import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { testimonials } from '../../data';
import { Star, ChevronLeft, ChevronRight, Quote, MessageSquareQuote } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, TreeSilhouette } from '../silhouettes/silhouettes';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1)),
      6000 // Rotate reviews every 6 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-cream/30 overflow-hidden border-b border-sunflower/10">
      
      {/* Decorative leaf / bloom graphic background */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 left-[20%] w-[420px] h-[280px] text-emerald-900 opacity-[0.14] rotate-6" />
        <FernSilhouette className="absolute bottom-[10%] -left-16 w-80 h-80 text-emerald-900 opacity-[0.15] rotate-[25deg]" />
        <TreeSilhouette className="absolute -bottom-16 right-10 w-[350px] h-[480px] text-emerald-900 opacity-[0.10]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          className="max-w-xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs font-semibold text-sunflower tracking-widest uppercase bg-sunflower/10 px-4 py-1.5 rounded-full flex items-center gap-1.5 justify-center w-fit mx-auto">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Guest Stories</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-4 leading-tight">
            Loved By Our Garden Community
          </h2>
          <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">
            Read authentic reviews from families, couples, and food lovers who visited C&apos;s Secret Garden Cafe.
          </p>
        </motion.div>

        {/* Carousel Slider Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 0.15 }}
          className="relative bg-white rounded-3xl border border-sunflower/15 shadow-xl p-8 sm:p-12 overflow-hidden min-h-[300px] flex flex-col justify-between"
        >
          
          {/* Decorative Giant Quote Vector */}
          <div className="absolute top-6 left-6 text-cream/50 pointer-events-none">
            <Quote className="w-20 h-20 rotate-180 opacity-40 text-sunflower" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 space-y-6"
            >
              {/* Star Rating Grid */}
              <div className="flex justify-center gap-1 text-sunflower">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-sunflower" />
                ))}
              </div>

              {/* Review Text content */}
              <p className="font-serif italic text-base sm:text-lg text-charcoal leading-relaxed max-w-2xl mx-auto">
                &ldquo;{current.text}&rdquo;
              </p>

              {/* Reviewer bio details */}
              <div className="flex items-center justify-center gap-4 pt-4">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-cream border border-sunflower/30 flex items-center justify-center font-mono font-bold text-sm text-sunflower">
                  {current.avatar}
                </div>
                {/* Text details */}
                <div className="text-left">
                  <h4 className="font-serif font-bold text-sm text-charcoal">{current.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    {current.role && (
                      <span className="text-[10px] font-mono text-sunflower bg-sunflower/10 px-2 py-0.5 rounded font-bold">
                        {current.role}
                      </span>
                    )}
                    <span className="text-[10px] font-sans text-charcoal/40 font-medium">{current.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-sunflower/10 relative z-10">
            {/* Dots navigation indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'bg-sunflower w-6' : 'bg-charcoal/20 hover:bg-charcoal/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex gap-2.5">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-sunflower/25 hover:bg-cream text-charcoal transition-all cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-sunflower/25 hover:bg-cream text-charcoal transition-all cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
