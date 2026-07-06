import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Table Query');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate sending email
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 100);
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-sunflower/15 shadow-lg text-left">
      <h3 className="font-serif font-bold text-lg text-charcoal mb-6">Send an Inquiry Message</h3>
      
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="E.g., Clara Mendoza"
                  className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none text-xs sm:text-sm font-medium text-charcoal"
                />
              </div>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="clara@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none text-xs sm:text-sm font-medium text-charcoal"
                />
              </div>
            </div>

            {/* Subject Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">Inquiry Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none text-xs sm:text-sm font-medium text-charcoal"
              >
                <option value="Table Query">Table Seating Inquiry</option>
                <option value="Proposal Event">Private Proposals & Romance setups</option>
                <option value="Private Booking">Intimate Parties & Celebrations</option>
                <option value="Feedback">Feedback or Food suggestions</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">Message Content</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Detail your request here. Our coordinators reply within 12 hours..."
                className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none text-xs sm:text-sm font-medium text-charcoal resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </div>

          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center py-10 space-y-4"
          >
            <CheckCircle2 className="w-14 h-14 text-sunflower" />
            <h4 className="font-serif font-bold text-xl text-charcoal">Thank You! Message Sent</h4>
            <p className="text-xs text-charcoal/70 max-w-sm leading-relaxed">
              Your message about <strong>{subject}</strong> has been transmitted to C&apos;s Cafe coordinators. We will reach back to you at <strong>{email}</strong> shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2 rounded-xl border border-sunflower text-sunflower text-xs font-bold hover:bg-cream/40 transition-all cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
