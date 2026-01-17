"use client";

import React from "react";

export const OrbitalLogo = ({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) => {
  // Unique IDs so multiple logos on the page don't break gradients/filters
  const uid = React.useId();
  const g1 = `g1-${uid}`;
  const g2 = `g2-${uid}`;
  const g3 = `g3-${uid}`;
  const glow = `glow-${uid}`;

  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={g1} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#2962FF" />
        </linearGradient>

        <linearGradient id={g2} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>

        <linearGradient id={g3} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB800" />
          <stop offset="100%" stopColor="#FF9100" />
        </linearGradient>

        {/* Mobile-safe neon glow */}
        <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Removed mixBlendMode. Use glow filter instead */}
      <g filter={`url(#${glow})`} opacity="0.95">
        <rect
          x="15"
          y="15"
          width="70"
          height="35"
          rx="17.5"
          fill={`url(#${g1})`}
          opacity="0.9"
          transform="rotate(45 50 50)"
          className={animated ? "animate-spin-slow origin-center" : ""}
        />

        <rect
          x="15"
          y="45"
          width="70"
          height="35"
          rx="17.5"
          fill={`url(#${g2})`}
          opacity="0.9"
          transform="rotate(-15 50 50)"
          className={animated ? "animate-pulse-slow" : ""}
        />

        <rect
          x="35"
          y="20"
          width="35"
          height="70"
          rx="17.5"
          fill={`url(#${g3})`}
          opacity="0.9"
          transform="rotate(-30 50 50)"
          className={animated ? "animate-float" : ""}
        />

        <circle cx="51" cy="51" r="4" fill="#fff" opacity="1" />
      </g>
    </svg>
  );
};

export const OrbitalLogoSmall = ({ className = "" }: { className?: string }) => {
  const uid = React.useId();
  const g1 = `g1s-${uid}`;
  const g2 = `g2s-${uid}`;
  const g3 = `g3s-${uid}`;
  const glow = `glows-${uid}`;

  return (
    <svg viewBox="0 0 50 50" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={g1} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#0dc3ff" />
        </linearGradient>

        <linearGradient id={g2} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e24295" />
          <stop offset="100%" stopColor="#c42878" />
        </linearGradient>

        <linearGradient id={g3} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB800" />
          <stop offset="100%" stopColor="#fa970c" />
        </linearGradient>

        <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${glow})`} opacity="0.95">
        <rect
          x="7"
          y="7"
          width="35"
          height="17"
          rx="8"
          fill={`url(#${g1})`}
          opacity="0.9"
          transform="rotate(45 25 25)"
        />
        <rect
          x="7"
          y="22"
          width="35"
          height="17"
          rx="8"
          fill={`url(#${g2})`}
          opacity="0.9"
          transform="rotate(-15 25 25)"
        />
        <rect
          x="17"
          y="10"
          width="17"
          height="35"
          rx="8"
          fill={`url(#${g3})`}
          opacity="0.9"
          transform="rotate(-30 25 25)"
        />
        <circle cx="25.5" cy="25.5" r="2" fill="#fff" opacity="1" />
      </g>
    </svg>
  );
};

// Wordmark with logo
export const StudentVerseLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <OrbitalLogoSmall className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0" />
      <div className="flex items-baseline gap-1 whitespace-nowrap">
        <span
          className="text-lg sm:text-2xl font-bold text-white"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Student
        </span>
        <span
          className="text-lg sm:text-2xl font-normal text-gray-400"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Verse
        </span>
      </div>
    </div>
  );
};
