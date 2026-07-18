import { AlertCircle, Loader2 } from "lucide-react";

export default function ContactStep({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  notes,
  setNotes,
  onSubmit,
  onPrev,
  errors = {},
  isSending = false, // 🧠 Added this missing prop destructuring
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider">
            Full Name *
          </label>
          <input
            type="text"
            disabled={isSending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="E.g., Clara Mendoza"
            className={`w-full px-4 py-3 rounded-xl bg-cream/30 border focus:ring-1 outline-none text-sm text-charcoal font-medium transition-all ${
              errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-sunflower/20 focus:border-sunflower focus:ring-sunflower"
            } ${isSending ? "opacity-60 cursor-not-allowed" : ""}`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider">
            Contact Phone Number *
          </label>
          <input
            type="tel"
            disabled={isSending}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="E.g., +63 917 123 4567"
            className={`w-full px-4 py-3 rounded-xl bg-cream/30 border focus:ring-1 outline-none text-sm text-charcoal font-medium transition-all ${
              errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-sunflower/20 focus:border-sunflower focus:ring-sunflower"
            } ${isSending ? "opacity-60 cursor-not-allowed" : ""}`}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider">
          Email Address *
        </label>
        <input
          type="email"
          disabled={isSending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="clara.mendoza@gmail.com"
          className={`w-full px-4 py-3 rounded-xl bg-cream/30 border focus:ring-1 outline-none text-sm text-charcoal font-medium transition-all ${
            errors.email
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-sunflower/20 focus:border-sunflower focus:ring-sunflower"
          } ${isSending ? "opacity-60 cursor-not-allowed" : ""}`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs flex items-center gap-1 mt-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.email}
          </p>
        )}
      </div>

      {/* Special Requests */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-charcoal/80 uppercase tracking-wider">
          Special Notes / Occasions (Optional)
        </label>
        <textarea
          disabled={isSending}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="E.g., Birthday surprise setup requested, high-chair needed for a toddler, or severe food allergies..."
          className={`w-full px-4 py-3 rounded-xl bg-cream/30 border border-sunflower/20 focus:border-sunflower focus:ring-1 focus:ring-sunflower outline-none text-sm text-charcoal font-medium resize-none ${isSending ? "opacity-60 cursor-not-allowed" : ""}`}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4 border-t border-sunflower/10">
        <button
          type="button"
          disabled={isSending}
          onClick={onPrev}
          className="px-6 py-3 rounded-full border border-charcoal/30 text-charcoal/70 hover:bg-cream/40 text-sm font-medium transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &larr; Previous Step
        </button>

        <button
          type="submit"
          disabled={isSending}
          className="px-10 py-3 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 animate-none"
        >
          {isSending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>Confirm Booking</span>
          )}
        </button>
      </div>
    </form>
  );
}
