import { motion } from 'motion/react';

// Highly detailed SVG silhouette paths for botanical garden vibes
export function FernSilhouette({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="currentColor" 
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path d="M10,190 C40,160 80,110 100,20 C95,50 80,80 60,95 C75,85 90,60 98,30 C94,55 83,85 55,105 C75,95 90,70 96,40 C91,65 78,95 45,115 C70,105 85,80 94,50 C88,75 72,105 35,125 C65,115 80,90 92,60 C84,85 65,115 25,135 C55,125 75,100 89,70 C80,95 55,125 15,145 C45,135 65,110 85,80 C75,105 45,135 5,155 C35,145 55,120 80,90" />
    </svg>
  );
}

export function CascadingBranchSilhouette({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 300 200" 
      fill="currentColor" 
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Branch main curve */}
      <path d="M0,20 C100,30 200,90 300,120 M10,21 C5,40 12,60 25,70 C20,55 18,40 10,21 M50,26 C40,55 55,80 70,95 C60,75 55,55 50,26 M100,38 C85,70 100,105 120,120 C105,95 100,70 100,38 M150,56 C135,90 150,125 170,140 C155,115 150,90 150,56 M200,76 C185,110 200,145 220,160 C205,135 200,110 200,76 M250,98 C235,130 250,165 270,178 C255,155 250,130 250,98" />
    </svg>
  );
}

export function PalmSilhouette({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="currentColor" 
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <path d="M100,195 C98,150 90,110 50,85 C75,90 90,105 97,125 C85,105 70,90 40,75 C68,80 85,95 95,118 C80,95 62,80 30,70 C60,75 80,90 92,110 C75,85 55,72 25,65 C55,70 75,85 88,102 C70,75 48,65 20,62 C50,65 70,80 84,95 C65,68 40,58 15,60 C45,62 65,75 80,90 C55,58 30,52 10,58 C40,58 60,70 76,85 C50,48 22,48 5,55 C35,52 55,65 72,80 C40,38 15,40 2,50 C30,45 50,58 68,75" />
    </svg>
  );
}

export function WildFlowerSilhouette({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 100 150" 
      fill="currentColor" 
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Stem */}
      <path d="M50,145 Q48,95 50,45 M50,100 Q30,90 20,70 Q35,80 50,100 M50,80 Q70,70 80,50 Q65,60 50,80" stroke="currentColor" strokeWidth="2.5" fill="none" />
      {/* Flower petals */}
      <path d="M50,45 C45,30 30,35 35,45 C20,40 18,55 30,55 C15,60 22,75 35,70 C30,85 45,85 48,70 C55,85 70,80 65,70 C80,75 85,60 70,55 C82,50 78,35 65,45 C70,30 55,25 50,45 Z" />
    </svg>
  );
}

export function TreeSilhouette({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 200 250" 
      fill="currentColor" 
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Trunk and primary limbs */}
      <path d="M95,245 C95,210 90,180 85,150 C80,120 70,100 60,90 C70,85 85,100 90,110 C93,90 85,70 75,55 C85,60 92,75 95,90 C97,70 95,50 90,30 C96,40 100,55 102,70 C105,50 110,35 115,20 C114,35 112,50 108,65 C115,55 125,45 135,35 C125,45 118,60 112,75 C120,68 135,62 145,58 C135,68 122,78 115,85 C122,82 138,80 150,82 C138,88 122,95 110,100 C118,105 130,110 140,115 C128,115 114,110 105,105 C108,125 112,150 110,245 Z" />
      {/* Dense detailed leaf crowns as organic shapes on limbs */}
      <circle cx="65" cy="55" r="22" className="opacity-80" />
      <circle cx="95" cy="30" r="18" className="opacity-80" />
      <circle cx="125" cy="35" r="20" className="opacity-80" />
      <circle cx="145" cy="70" r="16" className="opacity-80" />
      <circle cx="115" cy="85" r="15" className="opacity-80" />
      <circle cx="75" cy="85" r="15" className="opacity-80" />
    </svg>
  );
}

export function SunflowerSilhouette({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="currentColor" 
      className={`select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Dynamic central seed head */}
      <circle cx="60" cy="60" r="22" />
      {/* Ray petals radiating outwards */}
      <path d="M60,10 C57,25 63,25 60,10 Z M60,110 C57,95 63,95 60,110 Z M10,60 C25,57 25,63 10,60 Z M110,60 C95,57 95,63 110,60 Z" />
      <path d="M25,25 C37,37 31,43 25,25 Z M95,95 C83,83 89,77 95,95 Z M25,95 C37,83 31,77 25,95 Z M95,25 C83,37 89,43 95,25 Z" />
      <path d="M42,16 C46,31 52,27 42,16 Z M78,104 C74,89 68,93 78,104 Z M16,42 C31,46 27,52 16,42 Z M104,78 C89,74 93,68 104,78 Z" />
      <path d="M78,16 C74,31 68,27 78,16 Z M42,104 C46,89 52,93 42,104 Z M104,42 C89,46 93,52 104,42 Z M16,78 C31,74 27,68 16,78 Z" />
    </svg>
  );
}
