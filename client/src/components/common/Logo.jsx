import React from 'react';

export const LogoFullWhite = ({ className = '' }) => (
  <svg width="200" height="50" viewBox="0 0 260 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    
    {/* Icon box — green */}
    <rect x="0" y="0" width="60" height="60" rx="14" fill="#1D9E75"/>
    <rect x="26" y="8" width="8" height="44" rx="3" fill="white"/>
    <rect x="8" y="26" width="44" height="8" rx="3" fill="white"/>
    <polyline points="8,30 16,30 20,20 26,40 30,24 34,30 44,30 52,30"
      fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>

    {/* Single text element — no overlap possible */}
    <text x="76" y="38" fontFamily="Georgia,serif" fontSize="24" letterSpacing="-0.5">
      <tspan fontWeight="700" fill="white">Medi</tspan><tspan fontWeight="400" fill="white" opacity="0.8">Book</tspan>
    </text>

    {/* Tagline */}
    <text x="76" y="52" fontFamily="system-ui,sans-serif" fontSize="8" fill="white" fillOpacity="0.45" letterSpacing="2">YOUR HEALTH, SIMPLIFIED</text>

  </svg>
);

export const LogoIcon = ({ size = 40, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="32" height="32" rx="8" fill="#1D9E75"/>
    <rect x="14" y="4" width="4" height="24" rx="2" fill="white"/>
    <rect x="4" y="14" width="24" height="4" rx="2" fill="white"/>
  </svg>
);

export const LogoCompact = ({ className = '' }) => (
  <svg width="130" height="40" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="0" y="0" width="60" height="60" rx="14" fill="#1D9E75"/>
    <rect x="26" y="8" width="8" height="44" rx="3" fill="white"/>
    <rect x="8" y="26" width="44" height="8" rx="3" fill="white"/>
    <text x="76" y="40" fontFamily="Georgia,serif" fontSize="26" fontWeight="700" fill="#1D9E75" letterSpacing="-0.5">Medi<tspan fontWeight="400" fill="#0F6E56">Book</tspan></text>
  </svg>
);

export default LogoFullWhite;
