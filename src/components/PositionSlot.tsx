import type { LineupSlot } from "../types";
import { findSquadFlag } from "../utils/flags";
import { RARITY_STYLES } from "../utils/rarity";

interface PositionSlotProps {
  slot: LineupSlot;
  isCurrent?: boolean;
}

export default function PositionSlot({ slot, isCurrent }: PositionSlotProps) {
  const { player, position } = slot;

  if (!player) {
    return (
      <div
        className={`flex w-[68px] flex-col items-center gap-1 rounded-xl border-2 border-dashed px-1.5 py-1.5 text-center transition sm:w-[84px] ${
          isCurrent
            ? "animate-pulse border-flash bg-flash/10 shadow-glow"
            : "border-white/20 bg-pitch-950/40"
        }`}
      >
        <span
          className={`text-lg leading-none ${
            isCurrent ? "text-flash" : "text-chalk/30"
          }`}
        >
          +
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wide ${
            isCurrent ? "text-flash" : "text-chalk/40"
          }`}
        >
          {position}
        </span>
      </div>
    );
  }

  const r = RARITY_STYLES[player.rarity];
  const flag = findSquadFlag(player.team, player.year);

  return (
    <div
      className={`flex w-[68px] animate-pop-in flex-col items-center gap-0.5 rounded-xl border bg-pitch-900/90 px-1 py-1.5 text-center backdrop-blur-sm sm:w-[84px] ${r.ring}`}
    >
      <div className="flex w-full items-center justify-center gap-1">
        <span className="font-display text-xs text-flash">
          {player.shirtNumber}
        </span>
        <span className="grid h-5 min-w-5 place-items-center rounded bg-turf/20 px-1 font-display text-[11px] text-turf-light">
          {player.rating}
        </span>
      </div>
      <p className="w-full truncate text-[11px] font-bold leading-tight text-chalk">
        {player.shortName}
      </p>
      <p className="w-full truncate text-[9px] text-chalk/50">
        {flag} {player.year}
      </p>
    </div>
  );
}
