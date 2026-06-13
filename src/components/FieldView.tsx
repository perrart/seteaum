import type { LineupSlot } from "../types";
import { fieldCoords } from "../utils/formations";

interface FieldViewProps {
  lineup: LineupSlot[];
  /** índice recém-preenchido, para animar */
  highlightIndex?: number | null;
}

export default function FieldView({ lineup, highlightIndex }: FieldViewProps) {
  const coords = fieldCoords(lineup.map((s) => s.position));

  return (
    <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-ink/15 shadow-card">
      {/* gramado */}
      <div
        className="relative aspect-[3/4] w-full"
        style={{
          background:
            "repeating-linear-gradient(180deg,#2F8F3E 0 12.5%,#2c8639 12.5% 25%)",
        }}
      >
        {/* linhas do campo */}
        <div className="pointer-events-none absolute inset-3 rounded-lg border-2 border-white/35" />
        <div className="pointer-events-none absolute left-1/2 top-3 bottom-3 w-0 -translate-x-1/2 border-l-2 border-white/25" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />
        <div className="pointer-events-none absolute left-1/2 top-3 h-12 w-28 -translate-x-1/2 border-2 border-t-0 border-white/30" />
        <div className="pointer-events-none absolute bottom-3 left-1/2 h-12 w-28 -translate-x-1/2 border-2 border-b-0 border-white/30" />

        {lineup.map((slot, i) => {
          const c = coords[i];
          const p = slot.player;
          const isNew = highlightIndex === i;
          return (
            <div
              key={slot.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
              style={{ left: `${c.x}%`, top: `${c.y}%`, width: 64 }}
            >
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full border-2 text-[11px] font-extrabold shadow",
                  p
                    ? "border-white bg-paper text-ink"
                    : "border-white/60 border-dashed bg-white/10 text-white/70",
                  isNew ? "animate-pop-in ring-2 ring-gold" : "",
                ].join(" ")}
              >
                {p ? p.shirtNumber : slot.position}
              </div>
              <span
                className={[
                  "mt-0.5 max-w-[64px] truncate rounded px-1 text-center text-[9px] font-semibold leading-tight",
                  p ? "bg-ink/75 text-white" : "text-white/70",
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
