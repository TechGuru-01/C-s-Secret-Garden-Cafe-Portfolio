import { motion } from 'motion/react';
import { CalendarDays, ArrowRight, Flower } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, WildFlowerSilhouette, SunflowerSilhouette } from '../silhouettes/silhouettes';

export default function ReservationPromo({ onOpenBooking }) {
  return (
    <section 
      id="reservation-promo" 
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#FFF9EC] overflow-hidden border-y border-sunflower/10"
    >
      {/* Soft atmospheric background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-sunflower/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Silhouette Watermark Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-8 -right-16 w-[380px] h-[240px] text-emerald-950 opacity-[0.14] rotate-12" />
        <FernSilhouette className="absolute -bottom-16 -left-16 w-80 h-80 text-emerald-950 opacity-[0.15] rotate-[25deg]" />
        <WildFlowerSilhouette className="absolute bottom-5 right-12 w-44 h-64 text-emerald-950 opacity-[0.12]" />
        <SunflowerSilhouette className="absolute top-1/4 left-10 w-36 h-36 text-sunflower opacity-[0.08] animate-spin" style={{ animationDuration: '90s' }} />
      </div>
      
      {/* Decorative floral icon backgrounds */}
      <div className="absolute top-12 right-12 text-sunflower/5 w-32 h-32 rotate-12 pointer-events-none">
        <Flower className="w-full h-full stroke-[1]" />
      </div>
      <div className="absolute bottom-12 left-12 text-sunflower/5 w-24 h-24 -rotate-12 pointer-events-none">
        <Flower className="w-full h-full stroke-[1]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        
        {/* Elegant badge */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.8 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 100, damping: 11 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-sunflower/25 text-charcoal font-mono text-[11px] font-bold uppercase tracking-widest shadow-sm"
        >
          <Flower className="w-3.5 h-3.5 text-sunflower animate-pulse" />
          <span>Exclusive Seating Available</span>
        </motion.div>

        {/* Catchy display header */}
        <motion.h2 
          initial={{ opacity: 0, y: 45, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-charcoal max-w-2xl mx-auto leading-tight"
        >
          Secure Your Secluded <br />
          <span className="text-sunflower italic">Garden Sanctuary</span>
        </motion.h2>

        {/* Narrative description */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.2 }}
          className="text-sm sm:text-base text-charcoal/80 max-w-2xl mx-auto leading-relaxed"
        >
          Whether you desire a cozy wooden gazebo canopy draped in orchids, a plush outdoor autumn sofa lounge, or an exclusive dining table in our fern glasshouse conservatory, reserve your sanctuary space in advance for the perfect dining getaway.
        </motion.p>

        {/* Big CTA action */}
        <motion.div 
          initial={{ opacity: 0, y: 45, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: 'spring', stiffness: 85, damping: 12, delay: 0.3 }}
          className="pt-4"
        >
          <button
            onClick={onOpenBooking}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-sunflower hover:bg-yellow-400 text-charcoal font-bold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          >
            <CalendarDays className="w-5 h-5 text-charcoal group-hover:rotate-6 transition-transform" />
            <span>Book a Secluded Table</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Miniature trust/benefit tags */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.4 }}
          className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto text-[10px] font-mono uppercase tracking-wider text-charcoal/60"
        >
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sunflower">✦</span> Zero Reservation Fees
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sunflower">✦</span> Real-time Allocation
          </div>
          <div className="flex items-center justify-center gap-1.5 sm:col-span-1 col-span-2">
            <span className="text-sunflower">✦</span> Flexible Cancellations
          </div>
        </motion.div>

      </div>
    </section>
  );
}
