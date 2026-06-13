import type { LineupSlot } from "../types";
import PositionSlot from "./PositionSlot";

interface LineupFieldProps {
  lineup: LineupSlot[];
  currentIndex?: number; // índice do slot que está sendo preenchido
}

// Coordenadas (% x, % y) alinhadas à ordem do DRAFT_ORDER.
// Campo na vertical, ataque no topo.
const COORDS: { x: number; y: number }[] = [
  { x: 50, y: 90 }, // GOL
  { x: 83, y: 70 }, // LD
  { x: 61, y: 73 }, // ZAG
  { x: 39, y: 73 }, // ZAG
  { x: 17, y: 70 }, // LE
  { x: 50, y: 55 }, // VOL
  { x: 31, y: 42 }, // MEI
  { x: 69, y: 42 }, // MEI
  { x: 19, y: 21 }, // PE
  { x: 50, y: 14 }, // CA
  { x: 81, y: 21 }, // PD
];

export default function LineupField({ lineup, currentIndex }: LineupFieldProps) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-turf/25 bg-gradient-to-b from-turf-dark/30 via-pitch-800 to-pitch-900 shadow-card">
      {/* Marcações do campo */}
      <FieldMarkings />

      {/* Slots posicionados */}
      {lineup.map((slot, i) => {
        const c = COORDS[i];
        return (
          <div
            key={slot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <PositionSlot slot={slot} isCurrent={i === currentIndex} />
          </div>
        );
      })}
    </div>
  );
}

function FieldMarkings() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-chalk/15"
      viewBox="0 0 100 133"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* faixas de gramado */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="0"
          y={i * 22.2}
          width="100"
          height="11.1"
          fill="currentColor"
          opacity="0.25"
        />
      ))}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        opacity="0.9"
      >
        <rect x="2" y="2" width="96" height="129" rx="2" />
        <line x1="2" y1="66.5" x2="98" y2="66.5" />
        <circle cx="50" cy="66.5" r="12" />
        <circle cx="50" cy="66.5" r="0.8" fill="currentColor" />
        {/* área de cima */}
        <rect x="28" y="2" width="44" height="18" />
        <rect x="40" y="2" width="20" height="7" />
        {/* área de baixo */}
        <rect x="28" y="113" width="44" height="18" />
        <rect x="40" y="124" width="20" height="7" />
      </g>
    </svg>
  );
}
