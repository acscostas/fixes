import { useId } from "react";
import { cn } from "@/lib/utils";

type BloomProps = {
  className?: string;
  /** Rotação das pétalas, para variar a flor entre seções */
  rotate?: number;
  /** Posição do centro da flor, em % do viewBox */
  cx?: number;
  cy?: number;
  scale?: number;
};

const PETALS = [0, 72, 144, 216, 288];

export function Bloom({ className, rotate = 0, cx = 52, cy = 58, scale = 1 }: BloomProps) {
  const id = useId().replace(/:/g, "");
  const x = (cx / 100) * 1600;
  const y = (cy / 100) * 900;

  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#CFC8CC" />
          <stop offset="0.55" stopColor="#B9BCC9" />
          <stop offset="0.85" stopColor="#D9B39A" />
          <stop offset="1" stopColor="#E6A378" />
        </linearGradient>
        <radialGradient id={`core-${id}`}>
          <stop offset="0" stopColor="#E9E2E6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E9E2E6" stopOpacity="0" />
        </radialGradient>
        <filter id={`soft-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="80" />
        </filter>
        <filter id={`softer-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="48" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill={`url(#bg-${id})`} />

      <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
        <g filter={`url(#soft-${id})`} fill="#9CC3E6" opacity="0.95">
          {PETALS.map((a) => (
            <ellipse key={a} cx="0" cy="-250" rx="220" ry="330" transform={`rotate(${a})`} />
          ))}
          <circle r="300" />
        </g>
        <g filter={`url(#softer-${id})`} fill="#3B1E27">
          {PETALS.map((a) => (
            <ellipse key={a} cx="0" cy="-190" rx="120" ry="230" transform={`rotate(${a + 4})`} />
          ))}
          <circle r="200" />
        </g>
        <circle r="90" fill={`url(#core-${id})`} />
      </g>
    </svg>
  );
}

export function Grain({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-[0.55] mix-blend-overlay", className)}
    >
      <filter id={`grain-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${id})`} />
    </svg>
  );
}
