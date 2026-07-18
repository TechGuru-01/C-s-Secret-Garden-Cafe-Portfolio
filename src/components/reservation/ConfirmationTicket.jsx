import { motion } from "framer-motion"; // 🧠 Fixed the package import path
import { CheckCircle2, Ticket, Printer } from "lucide-react";

export default function ConfirmationTicket({
  completedBooking,
  onPrint,
  onReset,
}) {
  // Safe fallback if data hasn't hit state metrics yet during the step change
  if (!completedBooking) return null;

  return (
    <motion.div
      key="step-ticket-confirmation" // Fixed key structural string identifier
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-6 flex flex-col items-center text-center w-full"
    >
      <div className="w-16 h-16 rounded-full bg-sunflower/10 border border-sunflower/30 flex items-center justify-center text-sunflower mb-2">
        <CheckCircle2 className="w-10 h-10 animate-[bounce_1s_ease-in-out_1]" />
      </div>

      <h3 className="font-serif font-bold text-2xl text-charcoal">
        Table Reserved Successfully!
      </h3>
      <p className="text-xs text-charcoal/60 max-w-md">
        We have reserved your garden seating. A confirmation copy has been
        generated and saved locally. Present your digital ticket upon arrival.
      </p>

      {/* DIGITAL TICKET COMPONENT */}
      <div className="w-full max-w-md bg-cream border border-sunflower/25 rounded-3xl overflow-hidden shadow-lg relative print:shadow-none print:border-none">
        {/* Ticket Header */}
        <div className="bg-sunflower text-white p-5 text-left flex justify-between items-start">
          <div>
            <span className="font-mono text-[9px] tracking-widest text-white/90">
              OFFICIAL BOOKING
            </span>
            <h4 className="font-serif font-bold text-base mt-1">
              C&apos;s Garden Secret Cafe
            </h4>
          </div>
          <div className="text-right">
            <span className="font-mono text-xs font-semibold bg-white/20 px-3 py-1 rounded-full border border-white/10">
              {completedBooking.id || "N/A"}
            </span>
          </div>
        </div>

        {/* Ticket Body Details */}
        <div className="p-6 text-left space-y-4 font-sans text-xs text-charcoal/80 bg-white relative">
          {/* Ticket teeth cuts details */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFFDF8] rounded-full border-r border-sunflower/25 pointer-events-none" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#FFFDF8] rounded-full border-l border-sunflower/25 pointer-events-none" />

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-sunflower/25">
            <div>
              <p className="font-mono text-[9px] text-charcoal/40 uppercase">
                CUSTOMER
              </p>
              <p className="font-bold text-charcoal mt-1 text-sm">
                {completedBooking.name}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-charcoal/40 uppercase">
                PHONE
              </p>
              <p className="font-medium text-charcoal mt-1">
                {completedBooking.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-sunflower/25">
            <div>
              <p className="font-mono text-[9px] text-charcoal/40 uppercase">
                DATE
              </p>
              <p className="font-bold text-charcoal mt-1">
                {completedBooking.date}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-charcoal/40 uppercase">
                TIME
              </p>
              <p className="font-bold text-sunflower mt-1">
                {completedBooking.time}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-sunflower/25">
            <div>
              <p className="font-mono text-[9px] text-charcoal/40 uppercase">
                GARDEN ZONE
              </p>
              <p className="font-semibold text-charcoal mt-1">
                {completedBooking.seatingArea}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-charcoal/40 uppercase">
                GUESTS
              </p>
              <p className="font-bold text-charcoal mt-1">
                {completedBooking.guests} Person(s)
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[9px] text-charcoal/40 uppercase">
              SPECIAL REQUESTS / ASSIGNED TABLE
            </p>
            <p className="text-[11px] text-charcoal/70 mt-1 leading-relaxed italic">
              {completedBooking.notes
                ? `“${completedBooking.notes}”`
                : "“No special notes specified”"}
            </p>
          </div>
        </div>

        {/* Ticket Footer */}
        <div className="bg-cream/50 p-4 border-t border-dashed border-sunflower/25 text-center flex flex-col items-center gap-1">
          <Ticket className="w-5 h-5 text-sunflower" />
          <span className="text-[10px] font-mono text-charcoal/50 uppercase tracking-widest">
            SHOW TICKET UPON ARRIVAL
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-charcoal/30 text-charcoal/80 text-xs font-semibold hover:bg-cream/40 cursor-pointer transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print Ticket</span>
        </button>

        <button
          onClick={onReset}
          className="px-8 py-2.5 rounded-full bg-sunflower text-white text-xs font-bold hover:bg-yellow-500 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          Book Another Table
        </button>
      </div>
    </motion.div>
  );
}
