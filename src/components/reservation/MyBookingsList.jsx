import { motion } from 'motion/react';
import { CalendarDays, Ticket, Trash2 } from 'lucide-react';

export default function MyBookingsList({ reservations, onViewTicket, onCancel }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/85 backdrop-blur-sm rounded-3xl border border-sunflower/15 shadow-xl p-6 sm:p-10 text-left space-y-6 relative z-10"
    >
      <div className="flex items-center gap-2 text-sunflower">
        <CalendarDays className="w-6 h-6" />
        <h3 className="font-serif font-bold text-xl text-charcoal">Manage My Bookings</h3>
      </div>
      
      <p className="text-xs text-charcoal/70 leading-relaxed">
        We have listed all of your current locally-registered tables below. Bookings are saved in your browser cache and can be managed directly.
      </p>

      {reservations.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-sunflower/25 rounded-2xl bg-cream/10 space-y-2">
          <Ticket className="w-8 h-8 text-sunflower mx-auto opacity-60" />
          <p className="font-serif font-bold text-sm text-charcoal">No Local Reservations Found</p>
          <p className="text-xs text-charcoal/50">You haven&apos;t booked any garden tables yet. Get started above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => (
            <div 
              key={res.id} 
              className="p-5 border border-sunflower/20 rounded-2xl bg-[#FFFDF8] hover:border-sunflower/30 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-charcoal">{res.name}</span>
                  <span className="font-mono text-[10px] bg-sunflower/15 text-sunflower px-2.5 py-0.5 rounded-full font-bold">
                    {res.id}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] text-charcoal/70 mt-2">
                  <p>Date: <span className="font-semibold text-charcoal">{res.date}</span></p>
                  <p>Time: <span className="font-semibold text-sunflower">{res.time}</span></p>
                  <p>Guests: <span className="font-semibold text-charcoal">{res.guests} Person(s)</span></p>
                  <p>Zone: <span className="font-semibold text-charcoal">{res.seatingArea}</span></p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                {/* Ticket details download / preview */}
                <button
                  onClick={() => onViewTicket(res)}
                  className="px-4 py-2 rounded-xl border border-sunflower text-sunflower text-xs font-bold hover:bg-cream/40 cursor-pointer"
                >
                  View Ticket
                </button>

                {/* Cancel Booking */}
                <button
                  onClick={() => onCancel(res.id)}
                  className="p-2 text-red-500 border border-red-200 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
                  title="Cancel Booking"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
