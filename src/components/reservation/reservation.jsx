import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { seatingAreas } from '../../data';
import { CalendarDays, Users, Map, Clock, X } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, WildFlowerSilhouette } from '../silhouettes/silhouettes';
import TableSelector from './TableSelector';
import ContactStep from './ContactStep';
import ConfirmationTicket from './ConfirmationTicket';
import MyBookingsList from './MyBookingsList';

export default function Reservation({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [reservations, setReservations] = useState([]);
  const [viewMyBookings, setViewMyBookings] = useState(false);

  // Form State
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00 PM');
  const [guests, setGuests] = useState(2);
  const [selectedArea, setSelectedArea] = useState('area-lawn');
  const [selectedTable, setSelectedTable] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [completedBooking, setCompletedBooking] = useState(null);

  const timeSlots = ['11:00 AM', '12:30 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM', '9:00 PM'];

  const areaTables = {
    'area-lawn': [
      { id: 1, seats: 2, name: 'Table 1 (Lawn)' },
      { id: 2, seats: 4, name: 'Table 2 (Lawn)' },
      { id: 3, seats: 6, name: 'Table 3 (Lawn)' },
      { id: 4, seats: 4, name: 'Table 4 (Lawn)' }
    ],
    'area-gazebo': [
      { id: 5, seats: 2, name: 'Gazebo Canopy 1' },
      { id: 6, seats: 2, name: 'Gazebo Canopy 2' },
      { id: 7, seats: 4, name: 'Gazebo Canopy 3' }
    ],
    'area-sofa': [
      { id: 8, seats: 4, name: 'Autumn Sofa Set A' },
      { id: 9, seats: 5, name: 'Autumn Sofa Set B' }
    ],
    'area-greenhouse': [
      { id: 10, seats: 4, name: 'Fern Conservatory 1' },
      { id: 11, seats: 6, name: 'Fern Conservatory 2' },
      { id: 12, seats: 8, name: 'Grand Greenhouse Table' }
    ]
  };

  useEffect(() => {
    const saved = localStorage.getItem('cs_garden_reservations');
    if (saved) {
      setReservations(JSON.parse(saved));
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  const saveReservations = (newResList) => {
    setReservations(newResList);
    localStorage.setItem('cs_garden_reservations', JSON.stringify(newResList));
  };

  const handleNextStep = () => {
    if (step === 1) {
      const tables = areaTables[selectedArea];
      if (tables && tables.length > 0) {
        setSelectedTable(tables[0].id);
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBookTable = (e) => {
    e.preventDefault();
    if (!name || !email || !phone) return;

    const assignedTableObj = areaTables[selectedArea].find(t => t.id === selectedTable);
    const assignedTableName = assignedTableObj ? assignedTableObj.name : 'Assigned Table';

    const newReservation = {
      id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea: seatingAreas.find(a => a.id === selectedArea)?.name || 'Main Lawn',
      notes: notes || `Reserved Table: ${assignedTableName}`,
      createdAt: new Date().toLocaleDateString(),
      status: 'confirmed'
    };

    const updated = [...reservations, newReservation];
    saveReservations(updated);
    setCompletedBooking(newReservation);
    setStep(4);
  };

  const handleCancelReservation = (id) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const updated = reservations.filter(r => r.id !== id);
      saveReservations(updated);
    }
  };

  const handleResetForm = () => {
    setStep(1);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setCompletedBooking(null);
    setSelectedTable(null);
  };

  const currentAreaDetails = seatingAreas.find((a) => a.id === selectedArea);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-4xl bg-[#FFFDF8] rounded-3xl shadow-2xl border border-sunflower/20 overflow-hidden max-h-[90vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Silhouette Watermark Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          <CascadingBranchSilhouette className="absolute -top-10 left-[20%] w-[380px] h-[240px] text-emerald-950 opacity-[0.14] rotate-6" />
          <FernSilhouette className="absolute bottom-[10%] -left-16 w-80 h-80 text-emerald-950 opacity-[0.15] rotate-[25deg]" />
          <WildFlowerSilhouette className="absolute bottom-10 right-10 w-44 h-64 text-emerald-950 opacity-[0.12]" />
        </div>

        {/* Modal Header */}
        <div className="px-6 sm:px-10 pt-6 pb-4 border-b border-sunflower/10 flex items-center justify-between bg-[#FFFDF8]/90 backdrop-blur-sm relative z-10 shrink-0">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setViewMyBookings(false)}
              className={`font-serif text-base sm:text-lg font-bold pb-1.5 border-b-2 transition-all cursor-pointer ${
                !viewMyBookings ? 'border-sunflower text-sunflower' : 'border-transparent text-charcoal/50 hover:text-charcoal'
              }`}
            >
              Book a Secluded Table
            </button>
            
            <button
              onClick={() => setViewMyBookings(true)}
              className={`font-mono text-xs font-semibold pb-1.5 border-b-2 transition-all cursor-pointer ${
                viewMyBookings ? 'border-sunflower text-sunflower' : 'border-transparent text-charcoal/50 hover:text-charcoal'
              }`}
            >
              My Reservations ({reservations.length})
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-charcoal/5 text-charcoal/70 hover:text-charcoal transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5.5 h-5.5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10 flex-grow relative">
          
          <div className="absolute top-10 left-10 w-44 h-44 text-sunflower/5 rotate-90 pointer-events-none -z-10">
            <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L2.18,20.66C4.08,15.9 6.5,9.74 15,8V2H17V8M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </div>

          <div className="relative z-10">
            {!viewMyBookings ? (
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl border border-sunflower/15 shadow-xl p-6 sm:p-10 text-left relative z-10">
                {step < 4 && (
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-6 h-6 text-sunflower" />
                      <h3 className="font-serif font-bold text-xl text-charcoal">Table Booking Wizard</h3>
                    </div>
                    <span className="font-mono text-xs text-charcoal/60 bg-cream border border-sunflower/20 px-3 py-1 rounded-full">
                      Step {step} of 3
                    </span>
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider flex items-center gap-1.5">
                            <CalendarDays className="w-3.5 h-3.5 text-sunflower" />
                            <span>Select Date</span>
                          </label>
                          <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none font-medium text-sm text-charcoal"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-sunflower" />
                            <span>Number of Guests</span>
                          </label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none font-medium text-sm text-charcoal"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider flex items-center gap-1.5">
                          <Map className="w-3.5 h-3.5 text-sunflower" />
                          <span>Choose Seating Sanctuary Zone</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {seatingAreas.map((area) => (
                            <div
                              key={area.id}
                              onClick={() => setSelectedArea(area.id)}
                              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-36 ${area.bgClass} ${
                                selectedArea === area.id 
                                  ? 'border-sunflower ring-1 ring-sunflower scale-[1.01] shadow-md' 
                                  : 'border-sunflower/10'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="font-serif font-bold text-sm text-charcoal">{area.name}</span>
                                  <span className="text-[10px] font-mono text-sunflower bg-sunflower/10 px-2 py-0.5 rounded-md">
                                    {area.capacity}
                                  </span>
                                </div>
                                <p className="text-[11px] text-charcoal/70 mt-2 leading-relaxed">
                                  {area.description}
                                </p>
                              </div>
                              <div className="flex justify-end items-center text-[10px] font-mono font-bold text-sunflower">
                                {selectedArea === area.id ? '✓ SELECTED' : 'SELECT ZONE'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-sunflower" />
                          <span>Available Evening Slots</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setTime(slot)}
                              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                                time === slot
                                  ? 'bg-sunflower text-white shadow-sm scale-105 font-bold'
                                  : 'bg-cream/40 border border-sunflower/20 text-charcoal/70 hover:bg-cream hover:text-charcoal'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          onClick={handleNextStep}
                          className="px-8 py-3 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-md transition-all cursor-pointer"
                        >
                          Choose Table Layout &rarr;
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <TableSelector
                        selectedArea={selectedArea}
                        currentAreaDetails={currentAreaDetails}
                        selectedTable={selectedTable}
                        onSelectTable={setSelectedTable}
                        onNext={handleNextStep}
                        onPrev={() => setStep(1)}
                        areaTables={areaTables}
                      />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
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
                        onSubmit={handleBookTable}
                        onPrev={() => setStep(2)}
                      />
                    </motion.div>
                  )}

                  {step === 4 && completedBooking && (
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
                  setStep(4);
                  setViewMyBookings(false);
                }}
                onCancel={handleCancelReservation}
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
