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
  AlertCircle,
} from "lucide-react";
import {
  FernSilhouette,
  CascadingBranchSilhouette,
  WildFlowerSilhouette,
} from "../silhouettes/silhouettes";
import ContactStep from "./ContactStep";

export default function Reservation({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [errors, setErrors] = useState({});

  const [date, setDate] = useState("");
  const [time, setTime] = useState("7:00 AM");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const isEmailValid = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const VENUE_RENTAL_PRICE = 4500;
  const USE_DURATION_HOURS = 6;
  const MAX_CAFE_PAX = 50;
  const MIN_CAFE_PAX = 2;

  const timeSlots = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
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

  const handleNextStep = () => {
    const step1Errors = {};

    if (!date) {
      step1Errors.date = "Please pick a date for your event.";
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        step1Errors.date = "Event date cannot be in the past.";
      }
    }

    if (!guests || guests === "") {
      step1Errors.guests = "Please enter your expected attendance.";
    } else if (guests > MAX_CAFE_PAX) {
      step1Errors.guests = `Max capacity is ${MAX_CAFE_PAX} guests.`;
    } else if (guests < MIN_CAFE_PAX) {
      step1Errors.guests = `Attendance must be at least ${MIN_CAFE_PAX} guests.`;
    }

    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
    } else {
      setErrors({});
      setStep(2);
    }
  };

  const handleBookVenue = async (e) => {
    if (e) e.preventDefault();
    const step2Errors = {};

    if (!name.trim()) step2Errors.name = "Full name is required.";
    if (!email.trim()) {
      step2Errors.email = "Email address is required.";
    } else if (!isEmailValid(email)) {
      step2Errors.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) {
      step2Errors.phone = "Phone number is required.";
    } else if (phone.replace(/\D/g, "").length < 7) {
      step2Errors.phone = "Please enter a valid contact number.";
    }

    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return;
    }

    setErrors({});
    setIsSending(true);

    const formattedTime = `${time} - ${calculateEndTime(time)} (${USE_DURATION_HOURS} Hours)`;

    const bookingData = {
      name,
      email,
      phone,
      date,
      time: formattedTime,
      guests,
      title: "Exclusive Whole Venue Event",
      message: notes || "No additional notes.",
    };

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reservation.");
      }

      const newReservation = {
        id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
        ...bookingData,
        price: VENUE_RENTAL_PRICE,
        createdAt: new Date().toLocaleDateString(),
        status: "confirmed",
      };

      const updated = [...reservations, newReservation];
      saveReservations(updated);

      setShowSuccessModal(true);
      setStep(1);

      setDate(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
      });

      setTime("7:00 AM");
      setGuests("");
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setErrors({});
    } catch (error) {
      // FIX 1: Properly caught errors to trigger error display block in UI
      setErrors({
        submit: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
          {/* Watermarks */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 hidden xs:block">
            <CascadingBranchSilhouette className="absolute -top-10 left-[20%] w-[280px] sm:w-[380px] h-[240px] text-emerald-950 opacity-[0.05] sm:opacity-[0.08] rotate-6" />
            <FernSilhouette className="absolute bottom-[10%] -left-16 w-60 sm:w-80 h-60 sm:h-80 text-emerald-950 opacity-[0.05] sm:opacity-[0.09] rotate-[25deg]" />
            <WildFlowerSilhouette className="absolute bottom-10 right-10 w-36 sm:w-44 h-52 sm:h-64 text-emerald-950 opacity-[0.04] sm:opacity-[0.08]" />
          </div>

          {/* Header */}
          <div className="px-5 sm:px-10 pt-6 sm:pt-8 pb-4 border-b border-sunflower/10 flex items-center justify-between bg-[#FFFDF8]/95 backdrop-blur-sm relative z-10 shrink-0">
            <h2 className="font-serif text-base sm:text-xl font-bold pb-2 border-b-2 border-sunflower text-sunflower whitespace-nowrap">
              Exclusive Venue Rental
            </h2>

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
            <div className="space-y-6 sm:space-y-8">
              {/* Package Banner */}
              <div className="p-4 sm:p-5 bg-emerald-900/5 border border-emerald-900/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <Info className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif font-bold text-emerald-950 text-sm sm:text-base">
                      Whole Venue Exclusive Booking
                    </p>
                    <p className="text-[11px] sm:text-xs text-charcoal/70 mt-0.5 leading-relaxed">
                      Inclusions: 6 Hours full exclusive use of the entire cafe
                      garden space. Includes tables, premium chairs setup, and
                      custom styling coordination. Max 50 guests.
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

              <div className="flex items-center justify-between border-b border-sunflower/5 pb-2">
                <div className="flex items-center gap-2">
                  <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-sunflower" />
                  <h3 className="font-serif font-bold text-lg sm:text-2xl text-charcoal">
                    {step === 1 ? "Schedule Details" : "Organizer & Event Info"}
                  </h3>
                </div>
                <span className="font-mono text-[10px] sm:text-xs text-charcoal/60 bg-cream border border-sunflower/20 px-2.5 py-0.5 sm:py-1 rounded-full shrink-0">
                  Step {step} of 2
                </span>
              </div>

              {/* Multistep Form Wizard */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6 sm:space-y-8"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-8">
                      {/* Event Date Input */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[11px] sm:text-xs font-bold text-charcoal/80 uppercase tracking-widest flex items-center gap-1.5">
                          <CalendarDays className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sunflower" />
                          <span>Select Event Date</span>
                        </label>
                        <input
                          type="date"
                          value={date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => {
                            setDate(e.target.value);
                            if (errors.date) {
                              setErrors((prev) => ({ ...prev, date: null }));
                            }
                          }}
                          className={`w-full px-4 py-3 sm:py-3.5 rounded-xl bg-cream/20 border focus:ring-1 outline-none font-medium text-sm text-charcoal shadow-inner transition-all ${
                            errors.date
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-sunflower/20 focus:border-sunflower focus:ring-sunflower"
                          }`}
                        />
                        {errors.date && (
                          <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.date}
                          </p>
                        )}
                      </div>

                      {/* Attendance Input */}
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
                          value={guests || ""}
                          onChange={(e) => {
                            const parsed = parseInt(e.target.value, 10);
                            if (errors.guests) {
                              setErrors((prev) => ({ ...prev, guests: null }));
                            }
                            if (isNaN(parsed)) {
                              setGuests("");
                              return;
                            }
                            setGuests(parsed);
                          }}
                          className={`w-full px-4 py-3 sm:py-3.5 rounded-xl bg-cream/20 border focus:ring-1 outline-none font-medium text-sm text-charcoal shadow-inner transition-all ${
                            errors.guests
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : "border-sunflower/20 focus:border-sunflower focus:ring-sunflower"
                          }`}
                        />
                        {errors.guests && (
                          <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.guests}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Time Slots Selection */}
                    <div className="space-y-3">
                      <label className="text-[11px] sm:text-xs font-bold text-charcoal/80 uppercase tracking-widest flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sunflower" />
                        <span>
                          Select Event Start Time ({USE_DURATION_HOURS}-Hour
                          Block)
                        </span>
                      </label>

                      <div className="flex overflow-x-auto gap-2.5 sm:gap-3 pb-3 pt-1 scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-thumb-sunflower/20">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setTime(slot)}
                            className={`shrink-0 snap-center px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold tracking-wide text-center transition-all cursor-pointer ${
                              time === slot
                                ? "bg-sunflower text-white shadow-md scale-102 font-bold"
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

                    {/* Submission Error Alert Block */}
                    {errors.submit && (
                      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{errors.submit}</span>
                      </div>
                    )}

                    <div className="flex justify-end pt-4 sm:pt-6 border-t border-sunflower/5">
                      <button
                        onClick={handleNextStep}
                        className="w-full sm:w-auto px-10 py-3.5 rounded-xl sm:rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-lg transition-all cursor-pointer text-sm tracking-wide text-center"
                      >
                        Continue to Contact Info &rarr;
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <ContactStep
                      name={name}
                      setName={(val) => {
                        setName(val);
                        if (errors.name)
                          setErrors((prev) => ({ ...prev, name: null }));
                      }}
                      phone={phone}
                      setPhone={(val) => {
                        setPhone(val);
                        if (errors.phone)
                          setErrors((prev) => ({ ...prev, phone: null }));
                      }}
                      email={email}
                      setEmail={(val) => {
                        setEmail(val);
                        if (errors.email)
                          setErrors((prev) => ({ ...prev, email: null }));
                      }}
                      notes={notes}
                      setNotes={setNotes}
                      onSubmit={handleBookVenue}
                      onPrev={() => {
                        setErrors({});
                        setStep(1);
                      }}
                      errors={errors}
                      isSending={isSending}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* FIX 2: Success Modal extracted to root level so it animates independently from the wizard transitions */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <PartyPopper className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-2xl font-bold text-charcoal mb-2">
                Reservation Submitted!
              </h2>

              <p className="text-charcoal/70 mb-8">
                Thank you! We've received your reservation request. Our team
                will contact you shortly to confirm your booking.
              </p>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-sunflower hover:bg-yellow-500 text-white font-semibold transition cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
