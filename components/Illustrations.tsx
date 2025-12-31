
import React from 'react';
import { SceneryType } from '../types';

export const Scenery: React.FC<{ type: SceneryType }> = ({ type }) => {
  switch (type) {
    case 'seed':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
          <defs>
            <radialGradient id="soilGrad" cx="50%" cy="100%" r="100%">
              <stop offset="0%" stopColor="#4e342e" />
              <stop offset="100%" stopColor="#3e2723" />
            </radialGradient>
            <linearGradient id="sunBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fff9c4" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#sunBeam)" />
          <path d="M0 70 Q50 65 100 80 L100 100 L0 100 Z" fill="url(#soilGrad)" />
          <ellipse cx="50" cy="82" rx="6" ry="3" fill="#21120d" />
          <path d="M50 82 Q52 65 58 55" stroke="#aed581" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M58 55 Q65 45 70 52" fill="#c5e1a5" />
          <path d="M58 55 Q50 45 45 52" fill="#c5e1a5" />
        </svg>
      );
    case 'mountain-night':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a237e" />
              <stop offset="100%" stopColor="#3f51b5" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#nightSky)" />
          {[...Array(20)].map((_, i) => (
            <circle key={i} cx={Math.random() * 100} cy={Math.random() * 60} r={Math.random() * 0.8} fill="white" opacity={Math.random()} />
          ))}
          <circle cx="75" cy="25" r="12" fill="#fff9c4" filter="blur(1px)" />
          <circle cx="70" cy="22" r="2" fill="#fbc02d" opacity="0.2" />
          <path d="M-10 100 L30 40 L65 100 Z" fill="#283593" />
          <path d="M30 100 L70 50 L110 100 Z" fill="#1a237e" />
          <path d="M30 40 L35 50 L25 50 Z" fill="white" opacity="0.6" />
          <path d="M70 50 L75 60 L65 60 Z" fill="white" opacity="0.4" />
        </svg>
      );
    case 'rainy-lake':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0277bd" />
              <stop offset="100%" stopColor="#01579b" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="#e1f5fe" opacity="0.3" />
          <rect y="60" width="100" height="40" fill="url(#waterGrad)" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1={5 + i * 8} y1={-10 + (i % 3) * 5} x2={2 + i * 8} y2={20 + (i % 3) * 5} stroke="white" strokeWidth="0.5" opacity="0.6" />
          ))}
          <path d="M20 75 Q30 72 40 75" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
          <path d="M60 85 Q75 82 90 85" stroke="white" strokeWidth="0.5" fill="none" opacity="0.5" />
          <circle cx="30" cy="75" r="5" fill="none" stroke="white" strokeWidth="0.2" opacity="0.3" />
        </svg>
      );
    case 'sprout':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9ccc65" />
              <stop offset="100%" stopColor="#689f38" />
            </linearGradient>
          </defs>
          <path d="M0 100 Q50 60 100 100 Z" fill="url(#hillGrad)" />
          <path d="M50 85 Q50 50 50 40" stroke="#33691e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M50 55 Q30 40 35 60" fill="#aed581" />
          <path d="M50 55 Q70 40 65 60" fill="#aed581" />
          <path d="M50 40 Q40 25 55 35" fill="#8bc34a" />
          <circle cx="20" cy="85" r="2" fill="#ef5350" />
          <circle cx="80" cy="90" r="2.5" fill="#ffca28" />
        </svg>
      );
    case 'misty-forest':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#f5f5f5" />
          {[...Array(6)].map((_, i) => (
            <path key={i} d={`M${i * 20 - 10} 100 L${i * 20 + 5} 40 L${i * 20 + 20} 100 Z`} fill="#455a64" opacity={0.1 + i * 0.05} />
          ))}
          {[...Array(4)].map((_, i) => (
            <path key={i} d={`M${i * 30 - 15} 100 L${i * 30 + 10} 60 L${i * 30 + 35} 100 Z`} fill="#263238" opacity={0.2} />
          ))}
          <rect width="100" height="100" fill="url(#mist)" />
          <defs>
            <linearGradient id="mist" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.8" />
              <stop offset="50%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'stormy-sea':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#37474f" />
          <path d="M0 20 L20 15 L25 25 L40 10 L45 30" stroke="#fff176" fill="none" strokeWidth="1" opacity="0.6" />
          <path d="M0 70 Q25 50 50 70 T100 70 L100 100 L0 100 Z" fill="#01579b" />
          <path d="M-10 85 Q20 65 50 85 T110 85 L110 100 L-10 100 Z" fill="#0277bd" />
          <path d="M20 65 L25 60 Q28 62 24 67 Z" fill="white" opacity="0.5" />
          <path d="M70 65 L75 60 Q78 62 74 67 Z" fill="white" opacity="0.5" />
        </svg>
      );
    case 'meadow-path':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#e8f5e9" />
          <path d="M0 100 Q50 30 100 100 Z" fill="#81c784" />
          <path d="M30 100 Q50 60 70 100" fill="#d7ccc8" />
          {[...Array(15)].map((_, i) => (
            <circle key={i} cx={Math.random() * 100} cy={70 + Math.random() * 30} r={1.5} fill={['#f06292', '#ffd54f', '#ba68c8'][i % 3]} />
          ))}
          <path d="M80 40 Q85 35 90 40 Q85 45 80 40" fill="#f06292" opacity="0.8" />
          <path d="M80 40 Q75 35 70 40 Q75 45 80 40" fill="#f06292" opacity="0.8" />
        </svg>
      );
    case 'sunrise-hills':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffab91" />
              <stop offset="100%" stopColor="#ffe0b2" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#skyGrad)" />
          <circle cx="50" cy="55" r="30" fill="#ffcc80" opacity="0.8" />
          <path d="M-20 100 Q20 60 60 100 Z" fill="#66bb6a" />
          <path d="M40 100 Q70 70 110 100 Z" fill="#4caf50" />
          <path d="M10 20 Q15 18 20 20" stroke="#bf360c" strokeWidth="0.5" fill="none" />
          <path d="M30 15 Q35 13 40 15" stroke="#bf360c" strokeWidth="0.5" fill="none" />
        </svg>
      );
    case 'golden-field':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#fff9c4" />
          <rect y="60" width="100" height="40" fill="#fff176" />
          {[...Array(30)].map((_, i) => (
            <path key={i} d={`M${i * 4} 100 Q${i * 4 + 2} 80 ${i * 4 + 5} 60`} stroke="#fbc02d" strokeWidth="0.5" fill="none" />
          ))}
          <circle cx="80" cy="30" r="10" fill="#ffeb3b" opacity="0.3" />
          <path d="M10 60 L15 50 L10 55 L20 45" stroke="#795548" strokeWidth="1" fill="none" />
        </svg>
      );
    case 'holding-flower':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <radialGradient id="flowerGlow">
              <stop offset="0%" stopColor="#f48fb1" />
              <stop offset="100%" stopColor="#f48fb1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="#fce4ec" />
          <path d="M10 100 Q30 40 50 60 Q70 40 90 100" fill="#ffe0b2" stroke="#ccb997" strokeWidth="0.5" />
          <circle cx="50" cy="40" r="15" fill="url(#flowerGlow)" />
          <path d="M50 40 L50 60" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" />
          {[0, 72, 144, 216, 288].map((rot) => (
            <ellipse key={rot} cx="50" cy="35" rx="4" ry="7" fill="#ec407a" transform={`rotate(${rot}, 50, 40)`} />
          ))}
          <circle cx="50" cy="40" r="3" fill="#fbc02d" />
        </svg>
      );
    default:
      return null;
  }
};
