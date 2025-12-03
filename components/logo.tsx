"use client";

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * DeveloperUtilityTools.com SVG Logo
 * A clean, modern logo combining coding brackets and utility wrench concept
 */
export function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="DeveloperUtilityTools.com logo"
    >
      {/* Background gradient circle */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" opacity="0.1" />

      {/* Left bracket < */}
      <path
        d="M 38 30 L 20 50 L 38 70"
        stroke="url(#logoGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right bracket > */}
      <path
        d="M 62 30 L 80 50 L 62 70"
        stroke="url(#logoGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Wrench/tool icon in the center */}
      <path
        d="M 45 40 L 45 50 M 55 40 L 55 50"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="55"
        r="8"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M 50 63 L 50 70"
        stroke="url(#logoGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Simplified version for favicon
 */
export function LogoIcon({ className = "", size = 24 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Left bracket */}
      <path
        d="M 38 20 L 15 50 L 38 80"
        stroke="url(#iconGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Right bracket */}
      <path
        d="M 62 20 L 85 50 L 62 80"
        stroke="url(#iconGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Tool symbol */}
      <circle cx="50" cy="50" r="10" fill="url(#iconGradient)" />
    </svg>
  );
}
