import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../../data';
import { HelpCircle, ChevronDown, AlertCircle } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, WildFlowerSilhouette } from '../silhouettes/silhouettes';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFDF8] overflow-hidden border-b border-sunflower/10">
      
      {/* Decorative floral backgrounds */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-garden/5 rounded-full blur-3xl pointer-events-none" />

      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 right-[10%] w-[420px] h-[280px] text-emerald-950 opacity-[0.14] rotate-6" />
        <FernSilhouette className="absolute bottom-[10%] -left-16 w-80 h-80 text-emerald-950 opacity-[0.15] rotate-[25deg]" />
        <WildFlowerSilhouette className="absolute top-[25%] left-10 w-48 h-72 text-emerald-950 opacity-[0.13]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 70, damping: 14 }}
          className="max-w-xl mx-auto text-center mb-12"
        >
          <span className="font-mono text-xs font-semibold text-sunflower tracking-widest uppercase bg-sunflower/10 px-4 py-1.5 rounded-full flex items-center gap-1.5 justify-center w-fit mx-auto">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>F.A.Q.</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal mt-4 leading-tight">
            Commonly Asked Questions
          </h2>
          <p className="text-sm text-charcoal/70 mt-3 leading-relaxed">
            Everything you need to know about dining, reservations, amenities, and location before entering the garden.
          </p>
        </motion.div>

        {/* Interactive Accordion Panel */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: 'spring', stiffness: 70, damping: 13, delay: idx * 0.08 }}
                className={`border border-sunflower/15 rounded-2xl bg-white shadow-sm hover:shadow transition-shadow overflow-hidden ${
                  isOpen ? 'border-sunflower ring-1 ring-sunflower/25' : ''
                }`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif font-bold text-sm sm:text-base text-charcoal hover:text-sunflower transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1 rounded-full bg-cream text-sunflower transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-sunflower text-white font-bold' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Expanded Answer with smooth height reveal */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-charcoal/75 leading-relaxed border-t border-dashed border-sunflower/10 bg-cream/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.93 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: 'spring', stiffness: 75, damping: 12, delay: 0.15 }}
          className="mt-12 bg-cream/40 border border-sunflower/25 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-sunflower flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-serif font-bold text-sm text-charcoal">Still have questions?</h4>
              <p className="text-xs text-charcoal/60 mt-0.5">
                Our team is always happy to assist with special arrangements or events.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-xl bg-sunflower hover:bg-yellow-500 text-white font-bold text-xs shadow-sm transition-all cursor-pointer self-start sm:self-auto"
          >
            Contact Support &rarr;
          </button>
        </motion.div>

      </div>
    </section>
  );
}
