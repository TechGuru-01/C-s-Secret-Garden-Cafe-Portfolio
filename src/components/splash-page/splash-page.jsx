import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { FernSilhouette, CascadingBranchSilhouette, SunflowerSilhouette, PalmSilhouette } from '../silhouettes/silhouettes';
import cafeLogo from "/logo/logo.jpg";

export default function SplashPage({ onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate organic floating golden/white sparkles
    const generated = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 5, // delay in seconds
      scale: Math.random() * 0.6 + 0.4,
      duration: Math.random() * 6 + 5, // float speed
    }));
    setParticles(generated);

    // Auto-complete splash page after 3.2 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      id="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] } }}
      onClick={() => {
        if (onComplete) onComplete();
      }}
      className="fixed inset-0 z-50 bg-[#F7C948] overflow-hidden flex flex-col items-center justify-center py-12 px-6 select-none cursor-pointer"
    >
      {/* Elegantly overlayed radial gradient for premium depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_100%)] pointer-events-none" />

      {/* Decorative Botanical Silhouettes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <CascadingBranchSilhouette className="absolute -top-10 -right-16 w-[350px] h-[250px] text-white opacity-[0.25] rotate-12" />
        <FernSilhouette className="absolute -bottom-16 -left-16 w-80 h-80 text-white opacity-[0.28] rotate-[25deg]" />
        <PalmSilhouette className="absolute -bottom-20 -right-10 w-96 h-96 text-white opacity-[0.24] -rotate-[35deg]" />
        <SunflowerSilhouette className="absolute top-1/4 -left-16 w-48 h-48 text-white opacity-[0.16] animate-spin" style={{ animationDuration: '80s' }} />
      </div>

      {/* Hint to click to skip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 text-[10px] font-mono text-white tracking-widest uppercase">
        Click anywhere to skip intro
      </div>

      {/* Aesthetic white double circle rings echoing the logo in the background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.12]">
        <div className="w-[85vw] h-[85vw] max-w-[600px] max-h-[600px] rounded-full border-4 border-white flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
          <div className="w-[78vw] h-[78vw] max-w-[550px] max-h-[550px] rounded-full border border-white border-dashed" />
        </div>
      </div>

      {/* Floating Golden & White Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{ 
              y: '-10vh', 
              opacity: [0, 0.8, 0.8, 0],
              x: [0, 20, -20, 0]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear'
            }}
            className="absolute text-white pointer-events-none"
            style={{ 
              left: `${p.left}%`,
              transform: `scale(${p.scale})` 
            }}
          >
            {p.id % 2 === 0 ? (
              <Sparkles className="w-4 h-4 text-white/50" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 blur-[1px]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Main Centered Branding - No buttons, no loading bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center text-center z-10 max-w-xl"
      >
        {/* Logo Container with glass-reflective backdrop */}
        <div className="relative p-6 mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <img 
            src={cafeLogo} 
            alt="The C's Secret Garden Cafe Logo" 
            className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-full border-4 border-white shadow-lg"
          />
          
          {/* Pulsating Logo Ring */}
          <div className="absolute -inset-1 rounded-full border border-white/30 animate-ping opacity-25 pointer-events-none" style={{ animationDuration: '4s' }} />
        </div>

        {/* Cafe Tagline */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-serif italic text-2xl sm:text-3xl text-white tracking-wider drop-shadow-sm"
        >
          &ldquo;Where blooms meet brews, discover the garden secret.&rdquo;
        </motion.p>

        {/* Coffee Cup Visual & Rising Steam Animation */}
        <div className="relative mt-10 flex flex-col items-center">
          {/* Steam Strands */}
          <div className="absolute -top-10 flex gap-2 justify-center">
            <span className="w-1 h-8 bg-white/30 rounded-full blur-[1px] animate-steam-1" />
            <span className="w-[1.5px] h-10 bg-white/40 rounded-full blur-[1px] animate-steam-2" />
            <span className="w-1 h-7 bg-white/20 rounded-full blur-[1px] animate-steam-3" />
          </div>
          
          {/* Coffee Mug Icon */}
          <svg className="w-8 h-8 text-white/80 drop-shadow-md" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}
