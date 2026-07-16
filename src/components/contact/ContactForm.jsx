import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState({});

  const isValidEmail = (emailStr) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!message.trim()) {
      newErrors.message = "Please enter your message content.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    const templateParams = {
      name: name, 
      email: email, 
      title: subject,
      message: message, 
    };

    const SERVICE_ID = "service_hrfynlq";
    const TEMPLATE_ID = "template_aw4k4sea";
    const PUBLIC_KEY = "Qmsf7IWCoqDT7OL35";

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setIsSubmitted(true);
          // Don't clear inputs here so the success card can still display the summary values!
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Something went wrong. Please try again later.");
        },
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  
  const handleResetForm = () => {
    setName("");
    setEmail("");
    setSubject("Table Query");
    setMessage("");
    setIsSubmitted(false);
  };

  
  const handleInputChange = (field, value, setter) => {
    setter(value);
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-sunflower/15 shadow-lg text-left">
      <h3 className="font-serif font-bold text-lg text-charcoal mb-6">
        Send an Inquiry Message
      </h3>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value, setName)
                  }
                  placeholder="E.g., Clara Mendoza"
                  className={`w-full px-4 py-3 rounded-xl bg-cream/30 border outline-none text-xs sm:text-sm font-medium text-charcoal transition-colors ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower"
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value, setEmail)
                  }
                  placeholder="clara@example.com"
                  className={`w-full px-4 py-3 rounded-xl bg-cream/30 border outline-none text-xs sm:text-sm font-medium text-charcoal transition-colors ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower"
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Subject Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">
                Inquiry Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none text-xs sm:text-sm font-medium text-charcoal"
              >
                <option value="Proposal Event">
                  Private Proposals & Romance setups
                </option>
                <option value="Private Booking">
                  Intimate Parties & Celebrations
                </option>
                <option value="Feedback">Feedback or Food suggestions</option>
              </select>
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-charcoal/75 uppercase tracking-wider">
                Message Content
              </label>
              <textarea
                value={message}
                onChange={(e) =>
                  handleInputChange("message", e.target.value, setMessage)
                }
                rows={4}
                placeholder="Detail your request here. Our coordinators reply within 12 hours..."
                className={`w-full px-4 py-3 rounded-xl bg-cream/30 border outline-none text-xs sm:text-sm font-medium text-charcoal resize-none transition-colors ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower"
                }`}
              />
              {errors.message && (
                <span className="text-[10px] font-semibold text-red-500 flex items-center gap-1 mt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
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
            <h4 className="font-serif font-bold text-xl text-charcoal">
              Thank You! Message Sent
            </h4>
            <p className="text-xs text-charcoal/70 max-w-sm leading-relaxed">
              Your message about <strong>{subject}</strong> has been transmitted
              to C&apos;s Cafe coordinators. We will reach back to you at{" "}
              <strong>{email}</strong> shortly.
            </p>
            <button
              onClick={handleResetForm}
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
