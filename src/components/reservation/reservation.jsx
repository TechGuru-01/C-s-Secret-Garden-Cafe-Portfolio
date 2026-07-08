import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CalendarDays,
  Users,
  Clock,
  X,
  Info,
  CircleDollarSign,
  PartyPopper,
} from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  WildFlowerSilhouette,
} from "../silhouettes/silhouettes";
import ContactStep from "./ContactStep";
import ConfirmationTicket from "./ConfirmationTicket";
import MyBookingsList from "./MyBookingsList";

export default function Reservation({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [viewMyBookings, setViewMyBookings] = useState(false);

  // Form State
  const [date, setDate] = useState("");
  const [time, setTime] = useState("11:00 AM");
  const [guests, setGuests] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [completedBooking, setCompletedBooking] = useState(null);

  const VENUE_RENTAL_PRICE = 4500;
  const USE_DURATION_HOURS = 6;
  const MAX_CAFE_PAX = 50;

  const timeSlots = [
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const calculateEndTime = (startTimeStr) => {
    const [timePart, modifier] = startTimeStr.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const endHours = (hours + USE_DURATION_HOURS) % 24;
    const endModifier = endHours >= 12 ? "PM" : "AM";
    const displayHours = endHours % 12 === 0 ? 12 : endHours % 12;

    return `${displayHours}:${minutes < 10 ? "0" + minutes : minutes} ${endModifier}`;
  };

  useEffect(() => {
    const saved = localStorage.getItem("cs_garden_reservations");
    if (saved) {
      setReservations(JSON.parse(saved));
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  const saveReservations = (newResList) => {
    setReservations(newResList);
    localStorage.setItem("cs_garden_reservations", JSON.stringify(newResList));
  };

  const handleBookVenue = (e) => {
    if (e) e.preventDefault();
    if (!name || !email || !phone) return;

    const newReservation = {
      id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      date,
      time: `${time} - ${calculateEndTime(time)} (${USE_DURATION_HOURS} Hours)`,
      guests,
      seatingArea: "Whole Cafe Exclusive",
      notes: notes || "Exclusive Whole Venue Event",
      price: VENUE_RENTAL_PRICE,
      createdAt: new Date().toLocaleDateString(),
      status: "confirmed",
    };

    const updated = [...reservations, newReservation];
    saveReservations(updated);
    setCompletedBooking(newReservation);
    setStep(3);
  };

  const handleCancelReservation = (id) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      const updated = reservations.filter((r) => r.id !== id);
      saveReservations(updated);
    }
  };

  const handleResetForm = () => {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setCompletedBooking(null);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={
          window.innerWidth < 640
            ? { y: "100%" }
            : { opacity: 0, scale: 0.95, y: 20 }
        }
        animate={
          window.innerWidth < 640 ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }
        }
        exit={
          window.innerWidth < 640
            ? { y: "100%" }
            : { opacity: 0, scale: 0.95, y: 20 }
        }
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-4xl bg-[#FFFDF8] rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border border-sunflower/20 overflow-hidden h-[92vh] sm:h-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Watermarks - Hidden on ultra small screens for crisp readability */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 hidden xs:block">
          <CascadingBranchSilhouette className="absolute -top-10 left-[20%] w-[280px] sm:w-[380px] h-[240px] text-emerald-950 opacity-[0.05] sm:opacity-[0.08] rotate-6" />
          <FernSilhouette className="absolute bottom-[10%] -left-16 w-60 sm:w-80 h-60 sm:h-80 text-emerald-950 opacity-[0.05] sm:opacity-[0.09] rotate-[25deg]" />
          <WildFlowerSilhouette className="absolute bottom-10 right-10 w-36 sm:w-44 h-52 sm:h-64 text-emerald-950 opacity-[0.04] sm:opacity-[0.08]" />
        </div>

        {/* Responsive Header */}
        <div className="px-5 sm:px-10 pt-6 sm:pt-8 pb-4 border-b border-sunflower/10 flex items-center justify-between bg-[#FFFDF8]/95 backdrop-blur-sm relative z-10 shrink-0">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setViewMyBookings(false)}
              className={`font-serif text-base sm:text-xl font-bold pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                !viewMyBookings
                  ? "border-sunflower text-sunflower"
                  : "border-transparent text-charcoal/50 hover:text-charcoal"
              }`}
            >
              Exclusive Venue Rental
            </button>

            <button
              onClick={() => setViewMyBookings(true)}
              className={`font-mono text-[11px] sm:text-xs font-semibold pb-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                viewMyBookings
                  ? "border-sunflower text-sunflower"
                  : "border-transparent text-charcoal/50 hover:text-charcoal"
              }`}
            >
              My Bookings ({reservations.length})
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-charcoal/5 text-charcoal/70 hover:text-charcoal transition-all cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto px-5 sm:px-10 py-5 sm:py-8 flex-grow relative z-10 pb-12 sm:pb-8">
          {!viewMyBookings ? (
            <div className="space-y-6 sm:space-y-8">
              {/* Package Banner - Stacked layout on phone, row layout on desktop */}
              {step < 3 && (
                <div className="p-4 sm:p-5 bg-emerald-900/5 border border-emerald-900/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-serif font-bold text-emerald-950 text-sm sm:text-base">
                        Whole Venue Exclusive Booking
                      </p>
                      <p className="text-[11px] sm:text-xs text-charcoal/70 mt-0.5 leading-relaxed">
                        Inclusions: 6 Hours full exclusive use of the entire
                        cafe garden space. Includes tables, premium chairs
                        setup, and custom styling coordination. Max 50 guests.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-sunflower/20 self-start sm:self-auto shadow-sm shrink-0">
                    <CircleDollarSign className="w-4 h-4 text-sunflower" />
                    <span className="font-mono font-bold text-charcoal text-xs sm:text-sm">
                      ₱4,500 Flat Rate
                    </span>
                  </div>
                </div>
              )}

              {step < 3 && (
                <div className="flex items-center justify-between border-b border-sunflower/5 pb-2">
                  <div className="flex items-center gap-2">
                    <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-sunflower" />
                    <h3 className="font-serif font-bold text-lg sm:text-2xl text-charcoal">
                      {step === 1
                        ? "Schedule Details"
                        : "Organizer & Event Info"}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] sm:text-xs text-charcoal/60 bg-cream border border-sunflower/20 px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                    Step {step} of 2
                  </span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 sm:space-y-8"
                  >
                    {/* Input Fields Grid layout stack in mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] sm:text-xs font-bold text-charcoal/80 uppercase tracking-widest flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sunflower" />
                          <span>Select Event Date</span>
                        </label>
                        <input
                          type="date"
                          value={date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-cream/20 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none font-medium text-sm text-charcoal shadow-inner"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] sm:text-xs font-bold text-charcoal/80 uppercase tracking-widest flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sunflower" />
                          <span>Expected Attendance (Max {MAX_CAFE_PAX})</span>
                        </label>
                        <input
                          type="number"
                          min="0"
                          max={MAX_CAFE_PAX}
                          placeholder="0"
                          value={guests}
                          onChange={(e) => {
                            const val = Math.min(
                              MAX_CAFE_PAX,
                              Math.max(parseInt(e.target.value)),
                            );
                            setGuests(val);
                          }}
                          className="w-full px-4 py-3 sm:py-3.5 rounded-xl bg-cream/20 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none font-medium text-sm text-charcoal shadow-inner"
                        />
                      </div>
                    </div>

                    {/* TIME SLOTS - Dynamic multi-column responsive grid mapping */}
                    <div className="space-y-3">
                      <label className="text-[11px] sm:text-xs font-bold text-charcoal/80 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sunflower" />
                        <span>
                          Select Event Start Time ({USE_DURATION_HOURS}-Hour
                          Block)
                        </span>
                      </label>
                      <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`px-2 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold tracking-wide text-center transition-all cursor-pointer ${
                              time === slot
                                ? "bg-sunflower text-white shadow-md scale-102 sm:scale-105 font-bold"
                                : "bg-cream/30 border border-sunflower/20 text-charcoal/70 hover:bg-cream hover:text-charcoal shadow-sm"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      <p className="text-[11px] sm:text-sm text-emerald-800 font-mono mt-3 bg-emerald-50/50 inline-block px-3 py-1.5 rounded-lg border border-emerald-800/10 w-full sm:w-auto">
                        Your reserved frame:{" "}
                        <strong>
                          {time} to {calculateEndTime(time)}
                        </strong>
                      </p>
                    </div>

                    <div className="flex justify-end pt-4 sm:pt-6 border-t border-sunflower/5">
                      <button
                        onClick={() => setStep(2)}
                        disabled={!date}
                        className="w-full sm:w-auto px-10 py-3.5 rounded-xl sm:rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide text-center"
                      >
                        Continue to Contact Info &rarr;
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ContactStep
                      name={name}
                      setName={setName}
                      phone={phone}
                      setPhone={setPhone}
                      email={email}
                      setEmail={setEmail}
                      notes={notes}
                      setNotes={setNotes}
                      onSubmit={handleBookVenue}
                      onPrev={() => setStep(1)}
                    />
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && completedBooking && (
                  <ConfirmationTicket
                    completedBooking={completedBooking}
                    onPrint={() => window.print()}
                    onReset={handleResetForm}
                  />
                )}
              </AnimatePresence>
            </div>
          ) : (
            <MyBookingsList
              reservations={reservations}
              onViewTicket={(res) => {
                setCompletedBooking(res);
                setStep(3);
                setViewMyBookings(false);
              }}
              onCancel={handleCancelReservation}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
