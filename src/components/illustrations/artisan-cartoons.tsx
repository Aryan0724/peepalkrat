"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";

/**
 * 1. Animated Cartoon Illustration: Woman Artisan at the Pit Loom
 */
export function CartoonWomanAtLoom({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 280 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Wooden Loom Frame */}
        <rect x="30" y="40" width="12" height="190" rx="3" fill="#6B3A1E" />
        <rect x="238" y="40" width="12" height="190" rx="3" fill="#6B3A1E" />
        <rect x="20" y="50" width="240" height="14" rx="4" fill="#8B4513" />
        <rect x="20" y="215" width="240" height="14" rx="4" fill="#8B4513" />

        {/* Warp Threads (Vertical) */}
        {Array.from({ length: 22 }).map((_, i) => (
          <line
            key={i}
            x1={55 + i * 8}
            y1={64}
            x2={55 + i * 8}
            y2={215}
            stroke="#84592B"
            strokeWidth="1.2"
            strokeOpacity="0.65"
          />
        ))}

        {/* Woven Fabric Section (Vibrant Terracotta, Pink & Saffron) */}
        <path
          d="M 50 140 Q 140 135 230 140 L 230 215 L 50 215 Z"
          fill="#743014"
        />
        <path
          d="M 50 165 Q 140 160 230 165 L 230 195 L 50 195 Z"
          fill="#84592B"
        />
        <path
          d="M 50 180 Q 140 178 230 180 L 230 190 L 50 190 Z"
          fill="#442D1C"
        />

        {/* Traditional Geometric Phulkari diamond on fabric */}
        <polygon points="140,150 152,165 140,180 128,165" fill="#E8D1A7" />
        <polygon points="95,150 105,165 95,180 85,165" fill="#E8D1A7" />
        <polygon points="185,150 195,165 185,180 175,165" fill="#E8D1A7" />

        {/* Animated Moving Shuttle (Left to Right) */}
        <g className="animate-shuttle">
          <rect x="120" y="132" width="40" height="10" rx="5" fill="#D4AF37" stroke="#68140B" strokeWidth="1.5" />
          <circle cx="140" cy="137" r="2.5" fill="#743014" />
          {/* Thread trailing from shuttle */}
          <path d="M 120 137 Q 100 135 80 138" stroke="#84592B" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
        </g>

        {/* Woman Artisan Character (Smiling, Colorful, Stylized Cartoon) */}
        <g transform="translate(90, 30)">
          {/* Traditional Odhni (Veil) Backdrop */}
          <path
            d="M 15 35 C 0 85, -15 150, -10 180 C 15 185, 85 185, 110 180 C 115 150, 100 85, 85 35 Z"
            fill="#E05638"
            stroke="#84592B"
            strokeWidth="2"
          />

          {/* Hair */}
          <circle cx="50" cy="50" r="32" fill="#1C1917" />
          
          {/* Face */}
          <circle cx="50" cy="52" r="24" fill="#F8CBA6" />

          {/* Eyebrows */}
          <path d="M 37 45 Q 43 42 47 45" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 53 45 Q 57 42 63 45" stroke="#1C1917" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Happy Closed Eyes with Eyelashes */}
          <path d="M 38 49 Q 42 53 46 49" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 54 49 Q 58 53 62 49" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Red Bindi & Nath (Nose Ring) */}
          <circle cx="50" cy="44" r="2" fill="#743014" />
          <circle cx="43" cy="54" r="2" fill="#D4AF37" stroke="#1C1917" strokeWidth="0.5" />

          {/* Rosy Cheeks */}
          <circle cx="37" cy="56" r="3.5" fill="#FF8A80" opacity="0.6" />
          <circle cx="63" cy="56" r="3.5" fill="#FF8A80" opacity="0.6" />

          {/* Sweet Smile */}
          <path d="M 44 58 Q 50 65 56 58" stroke="#743014" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Kurti / Dress */}
          <path d="M 28 75 C 35 68, 65 68, 72 75 L 85 140 L 15 140 Z" fill="#442D1C" />

          {/* Gold Necklace */}
          <path d="M 38 74 Q 50 83 62 74" stroke="#84592B" strokeWidth="2.5" fill="none" />
          <circle cx="50" cy="83" r="2" fill="#743014" />

          {/* Arms reaching to Loom with colorful glass bangles */}
          {/* Left arm */}
          <path d="M 25 80 Q 0 100, -5 120" stroke="#F8CBA6" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 5 95 L 0 100" stroke="#00B0FF" strokeWidth="3" />
          <path d="M 3 98 L -2 103" stroke="#D4AF37" strokeWidth="3" />
          <path d="M 1 101 L -4 106" stroke="#E05638" strokeWidth="3" />

          {/* Right arm */}
          <path d="M 75 80 Q 100 100, 105 120" stroke="#F8CBA6" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 95 95 L 100 100" stroke="#00B0FF" strokeWidth="3" />
          <path d="M 97 98 L 102 103" stroke="#D4AF37" strokeWidth="3" />
          <path d="M 99 101 L 104 106" stroke="#E05638" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. Animated Cartoon Illustration: Woman Artisan with Spinning Charkha
 */
export function CartoonWomanSpinningCharkha({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 280 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Ground Base / Mat */}
        <ellipse cx="140" cy="225" rx="120" ry="16" fill="#F4ECE0" stroke="#84592B" strokeWidth="1" strokeDasharray="3 3" />

        {/* Charkha Wooden Stand */}
        <rect x="150" y="210" width="100" height="12" rx="3" fill="#8B4513" />
        <rect x="220" y="130" width="10" height="85" rx="2" fill="#6B3A1E" />
        <rect x="160" y="160" width="8" height="55" rx="2" fill="#6B3A1E" />

        {/* Animated Rotating Charkha Wheel */}
        <g transform="translate(225, 130)">
          <g className="animate-charkha">
            {/* Outer Rim */}
            <circle cx="0" cy="0" r="54" stroke="#D4AF37" strokeWidth="3.5" fill="none" />
            <circle cx="0" cy="0" r="50" stroke="#8B4513" strokeWidth="2" fill="none" />

            {/* 8 Wooden Spokes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={0}
                  y1={0}
                  x2={Math.cos(angle) * 50}
                  y2={Math.sin(angle) * 50}
                  stroke="#8B4513"
                  strokeWidth="2.5"
                />
              );
            })}

            {/* Center Axle */}
            <circle cx="0" cy="0" r="8" fill="#D4AF37" stroke="#68140B" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#743014" />
          </g>
        </g>

        {/* Spindle on left with Cotton Thread */}
        <rect x="156" y="152" width="16" height="8" rx="2" fill="#D4AF37" />
        <line x1="164" y1="156" x2="225" y2="130" stroke="#E8D1A7" strokeWidth="2" strokeDasharray="3 2" />

        {/* Woman Artisan Character Sitting Elegantly */}
        <g transform="translate(45, 50)">
          {/* Saffron & Pink Dupatta */}
          <path
            d="M 25 35 C 0 80, -10 140, -5 170 C 15 175, 75 175, 95 170 C 105 140, 95 80, 75 35 Z"
            fill="#D4AF37"
            stroke="#743014"
            strokeWidth="2"
          />

          {/* Hair Bun */}
          <circle cx="50" cy="48" r="28" fill="#1C1917" />
          <circle cx="28" cy="45" r="10" fill="#1C1917" /> {/* Side bun with flowers */}
          <circle cx="26" cy="43" r="3" fill="#FF8A80" />
          <circle cx="31" cy="47" r="3" fill="#FFEB3B" />

          {/* Face */}
          <circle cx="52" cy="52" r="22" fill="#F8CBA6" />

          {/* Eyes with twinkle */}
          <ellipse cx="44" cy="50" rx="2.5" ry="3" fill="#1C1917" />
          <ellipse cx="60" cy="50" rx="2.5" ry="3" fill="#1C1917" />
          <circle cx="43" cy="49" r="0.8" fill="#FFFFFF" />
          <circle cx="59" cy="49" r="0.8" fill="#FFFFFF" />

          {/* Bindi & Smile */}
          <circle cx="52" cy="43" r="2" fill="#743014" />
          <path d="M 46 59 Q 52 65 58 59" stroke="#743014" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Teal & Gold Kurti */}
          <path d="M 32 74 C 40 68, 64 68, 72 74 L 85 145 L 20 145 Z" fill="#2E7D32" />
          <path d="M 42 74 Q 52 82 62 74" stroke="#84592B" strokeWidth="2.5" fill="none" />

          {/* Hand turning Charkha Handle */}
          <path d="M 70 85 Q 105 100, 125 110" stroke="#F8CBA6" strokeWidth="7" strokeLinecap="round" fill="none" />
          <circle cx="125" cy="110" r="4" fill="#F8CBA6" />

          {/* Hand holding Raw Cotton Fluff */}
          <path d="M 35 90 Q 55 110, 75 115" stroke="#F8CBA6" strokeWidth="7" strokeLinecap="round" fill="none" />
          <ellipse cx="75" cy="115" rx="7" ry="5" fill="#E8D1A7" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 3. Animated Cartoon Illustration: Empowered Woman Holding Bank Passbook
 */
export function CartoonWomanWithPassbook({ className = "w-64 h-64" }: { className?: string }) {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg
        viewBox="0 0 280 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Floating Celebratory Gold Coins */}
        <g className="animate-coin-rise" style={{ animationDelay: "0s" }}>
          <circle cx="195" cy="50" r="10" fill="#84592B" stroke="#A67C2E" strokeWidth="1.5" />
          <text x="195" y="54" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#501007">â‚¹</text>
        </g>
        <g className="animate-coin-rise" style={{ animationDelay: "0.8s" }}>
          <circle cx="75" cy="40" r="8" fill="#84592B" stroke="#A67C2E" strokeWidth="1.5" />
          <text x="75" y="43" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#501007">$</text>
        </g>
        <g className="animate-coin-rise" style={{ animationDelay: "1.4s" }}>
          <circle cx="215" cy="90" r="7" fill="#84592B" stroke="#A67C2E" strokeWidth="1" />
          <text x="215" y="93" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#501007">Â£</text>
        </g>

        {/* Floating Stars */}
        <path d="M 80 80 L 82 85 L 87 86 L 83 89 L 84 94 L 80 91 L 76 94 L 77 89 L 73 86 L 78 85 Z" fill="#84592B" className="animate-pulse" />
        <path d="M 205 130 L 207 134 L 211 135 L 208 138 L 209 142 L 205 140 L 201 142 L 202 138 L 199 135 L 203 134 Z" fill="#84592B" className="animate-pulse" />

        {/* Empowered Woman Figure Standing Proudly */}
        <g transform="translate(90, 50)">
          {/* Royal Indigo Dupatta with Gold Polka Dots */}
          <path
            d="M 15 35 C -5 85, -15 155, -10 185 C 15 190, 85 190, 110 185 C 115 155, 105 85, 85 35 Z"
            fill="#442D1C"
            stroke="#84592B"
            strokeWidth="2"
          />

          {/* Dots on Dupatta */}
          <circle cx="20" cy="90" r="2" fill="#84592B" />
          <circle cx="35" cy="115" r="2" fill="#84592B" />
          <circle cx="75" cy="100" r="2" fill="#84592B" />
          <circle cx="85" cy="130" r="2" fill="#84592B" />

          {/* Hair & Top Bun */}
          <circle cx="50" cy="50" r="28" fill="#1C1917" />
          <circle cx="50" cy="22" r="12" fill="#1C1917" />
          {/* Hair Pin */}
          <line x1="38" y1="20" x2="62" y2="24" stroke="#84592B" strokeWidth="2.5" strokeLinecap="round" />

          {/* Confident, Radiant Face */}
          <circle cx="50" cy="52" r="24" fill="#F8CBA6" />

          {/* Big Happy Smile showing confidence */}
          <path d="M 42 58 Q 50 68 58 58 Z" fill="#FFFFFF" stroke="#743014" strokeWidth="1.5" />
          <path d="M 42 58 Q 50 68 58 58" stroke="#743014" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Sparkling Joyful Eyes */}
          <ellipse cx="42" cy="48" rx="3" ry="3.5" fill="#1C1917" />
          <ellipse cx="58" cy="48" rx="3" ry="3.5" fill="#1C1917" />
          <circle cx="41" cy="47" r="1.2" fill="#FFFFFF" />
          <circle cx="57" cy="47" r="1.2" fill="#FFFFFF" />

          {/* Vermilion Bindi */}
          <circle cx="50" cy="41" r="2.5" fill="#743014" />

          {/* Red & Gold Kurti */}
          <path d="M 28 75 C 35 68, 65 68, 72 75 L 85 155 L 15 155 Z" fill="#743014" />
          <path d="M 38 75 Q 50 84 62 75" stroke="#84592B" strokeWidth="2.5" fill="none" />

          {/* Right Arm Raised Holding the Bank Passbook */}
          <path d="M 70 80 Q 95 60, 100 25" stroke="#F8CBA6" strokeWidth="8" strokeLinecap="round" fill="none" />
          
          {/* Hand holding Passbook */}
          <circle cx="100" cy="24" r="5" fill="#F8CBA6" />

          {/* The Bank Passbook ("Ambala WOMEN SHG â€¢ SBI / INDEPENDENCE") */}
          <g transform="translate(85, -5) rotate(12)">
            <rect x="0" y="0" width="34" height="24" rx="3" fill="#1E88E5" stroke="#84592B" strokeWidth="1.5" />
            <rect x="3" y="3" width="28" height="6" fill="#0D47A1" />
            <line x1="5" y1="13" x2="29" y2="13" stroke="#E8D1A7" strokeWidth="1.5" />
            <line x1="5" y1="17" x2="23" y2="17" stroke="#84592B" strokeWidth="1.2" />
            <text x="17" y="7.5" fontSize="4" fontWeight="bold" textAnchor="middle" fill="#FFFFFF">PASSBOOK</text>
          </g>

          {/* Left Hand on Hip (Posture of Strength) */}
          <path d="M 30 80 Q 5 95, 18 115" stroke="#F8CBA6" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Colorful Bangles on wrists */}
          <circle cx="16" cy="110" r="4" stroke="#84592B" strokeWidth="2" fill="none" />
          <circle cx="98" cy="35" r="4" stroke="#84592B" strokeWidth="2" fill="none" />
        </g>
      </svg>
    </div>
  );
}

/**
 * 4. Ambient Cartoon Background Scene with Floating Peacocks, Cotton Reeds & Empowered Women
 */
export function AnimatedCartoonEmpowermentBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 select-none">
      {/* Soft animated gradient orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#84592B]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#743014]/10 blur-3xl" />

      {/* Floating illustrated cartoon elements */}
      {/* Floating Cotton Bobbin Left */}
      <div className="absolute top-24 left-[4%] animate-float-slow hidden lg:block">
        <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
          <ellipse cx="30" cy="30" rx="18" ry="12" fill="#E8D1A7" stroke="#84592B" strokeWidth="2" />
          <line x1="12" y1="30" x2="48" y2="30" stroke="#743014" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="30" cy="30" r="4" fill="#D4AF37" />
        </svg>
      </div>

      {/* Floating Haryana Peacock Right */}
      <div className="absolute top-16 right-[6%] animate-float-delay hidden lg:block">
        <svg width="56" height="56" viewBox="0 0 70 70" fill="none">
          {/* Peacock Crown & Body */}
          <path d="M 35 25 C 38 18, 48 18, 50 25 C 52 35, 42 45, 35 52 Z" fill="#00838F" />
          {/* Animated Feather Eye */}
          <circle cx="43" cy="22" r="3" fill="#D4AF37" />
          <circle cx="43" cy="22" r="1.5" fill="#442D1C" />
          {/* Feathers Fan */}
          <path d="M 25 45 C 10 35, 15 20, 28 28 Z" fill="#00ACC1" opacity="0.8" />
          <path d="M 20 50 C 5 45, 10 30, 24 38 Z" fill="#2E7D32" opacity="0.7" />
        </svg>
      </div>

      {/* Floating Golden Coin Center */}
      <div className="absolute bottom-20 left-[18%] animate-float-slow hidden md:block">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C8A253] to-[#F7E7B4] border border-[#A67C2E] flex items-center justify-center text-[#501007] text-[10px] font-bold shadow-md">
          $
        </div>
      </div>
    </div>
  );
}
