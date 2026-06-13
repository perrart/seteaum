import type { LineupSlot } from "../types";
import { fieldCoords } from "../utils/formations";

interface FieldViewProps {
  lineup: LineupSlot[];
  highlightIndex?: number | null;
}

export default function FieldView({ lineup, highlightIndex }: FieldViewProps) {
  const coords = fieldCoords(lineup.map((s) => s.position));

  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-ink/15 shadow-card">
      <div
        className="relative aspect-[3/4] w-full"
        style={{
          background:
            "repeating-linear-gradient(180deg,#2f8f3e 0 12.5%,#2b8638 12.5% 25%)",
        }}
      >
        {/* contorno + linhas */}
        <div className="pointer-events-none absolute inset-2.5 rounded-md border-2 border-white/35" />
        <div className="pointer-events-none absolute left-2.5 right-2.5 top-1/2 h-0 -translate-y-1/2 border-t-2 border-white/25" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />
        {/* área de cima (gol adversário) */}
        <div className="pointer-events-none absolute left-1/2 top-2.5 h-10 w-24 -translate-x-1/2 border-2 border-t-0 border-white/30" />
        <div className="pointer-events-none absolute left-1/2 top-2.5 h-4 w-12 -translate-x-1/2 border-2 border-t-0 border-white/30" />
        {/* área de baixo (nosso gol) */}
        <div className="pointer-events-none absolute bottom-2.5 left-1/2 h-10 w-24 -translate-x-1/2 border-2 border-b-0 border-white/30" />
        <div className="pointer-events-none absolute bottom-2.5 left-1/2 h-4 w-12 -translate-x-1/2 border-2 border-b-0 border-white/30" />

        {lineup.map((slot, i) => {
          const c = coords[i];
          const p = slot.player;
          const isNew = highlightIndex === i;
          return (
            <div
              key={slot.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${c.x}%`, top: `${c.y}%`, width: 58 }}
            >
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-[11px] font-extrabold shadow",
                  p
                    ? "border-white bg-paper text-ink"
                    : "border-dashed border-white/70 bg-black/10 text-white/80",
                  isNew ? "animate-pop-in ring-2 ring-gold" : "",
                ].join(" ")}
              >
                {p ? p.shirtNumber : slot.position}
              </div>
              <span
                className={[
                  "mt-1 max-w-[58px] truncate rounded px-1 text-center text-[9px] font-bold leading-tight",
                  p ? "bg-ink/80 text-white" : "text-white/85",
                ].join(" ")}
              >
                {p ? p.shortName : slot.position}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
