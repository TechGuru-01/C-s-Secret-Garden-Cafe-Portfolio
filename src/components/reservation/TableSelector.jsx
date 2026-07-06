import { CheckCircle2, ShieldCheck } from 'lucide-react';

export default function TableSelector({ 
  selectedArea, 
  currentAreaDetails, 
  selectedTable, 
  onSelectTable, 
  onNext, 
  onPrev,
  areaTables
}) {
  const tables = areaTables[selectedArea] || [];

  return (
    <div className="space-y-6">
      <div className="bg-cream/25 border border-sunflower/20 rounded-2xl p-4 text-center">
        <p className="text-xs text-charcoal/80 font-medium">
          Reserved Seating Area: <span className="text-sunflower font-bold font-serif">{currentAreaDetails?.name}</span>
        </p>
        <p className="text-[11px] text-charcoal/60 mt-0.5">
          Select your preferred table from the zone layout below.
        </p>
      </div>

      {/* Interactive Styled Grid-Map of Tables */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* SVG/Styled Table Grid Left Side */}
        <div className="md:col-span-8 flex flex-col items-center justify-center p-6 border-2 border-dashed border-sunflower/20 rounded-3xl bg-cream/10">
          <h4 className="font-serif text-sm font-semibold text-charcoal/80 mb-4">Garden Zone Floor Plan</h4>
          
          {/* Grid representation */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {tables.map((tbl) => (
              <div
                key={tbl.id}
                onClick={() => onSelectTable(tbl.id)}
                className={`p-5 rounded-2xl border-2 cursor-pointer text-center flex flex-col items-center justify-center gap-2 transition-all duration-300 relative ${
                  selectedTable === tbl.id
                    ? 'bg-sunflower border-sunflower text-charcoal shadow-md scale-105'
                    : 'bg-white border-sunflower/20 text-charcoal hover:border-sunflower'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center font-bold text-xs shadow-sm border border-sunflower/10">
                  {tbl.id}
                </div>
                <span className="font-serif font-bold text-xs">{tbl.name}</span>
                <span className="text-[10px] font-mono text-charcoal/50">{tbl.seats} Seats</span>
                
                {/* Checkmark indicator */}
                {selectedTable === tbl.id && (
                  <div className="absolute top-2 right-2 text-charcoal">
                    <CheckCircle2 className="w-4 h-4 fill-sunflower" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Information right side */}
        <div className="md:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-sunflower/15 text-xs text-charcoal/80 leading-relaxed">
            <span className="font-serif font-semibold text-sunflower">Table Selection Info</span>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-charcoal/70 text-left">
              <li>Table assignment guarantees your zone choice.</li>
              <li>Each table is spaced 2 meters apart for privacy.</li>
              <li>Decorations like fairy lights are fully standard!</li>
            </ul>
          </div>
          
          {/* Shield check badge */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-sunflower bg-sunflower/5 border border-sunflower/20 p-3 rounded-xl text-left">
            <ShieldCheck className="w-4.5 h-4.5 text-sunflower flex-shrink-0" />
            <span>Instant secure booking confirmation. No credit card required.</span>
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          onClick={onPrev}
          className="px-6 py-3 rounded-full border border-charcoal/30 text-charcoal/70 hover:bg-cream/40 text-sm font-medium transition-all cursor-pointer"
        >
          &larr; Previous Details
        </button>
        <button
          onClick={onNext}
          disabled={selectedTable === null}
          className="px-8 py-3 rounded-full bg-sunflower hover:bg-yellow-500 text-white font-bold shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          Fill Contact Info &rarr;
        </button>
      </div>
    </div>
  );
}
