import type { Player } from "../types";
import { RARITY_STYLES } from "../utils/rarity";
import { findSquadFlag } from "../utils/flags";

interface PlayerCardProps {
  player: Player;
  variant?: "select" | "mini";
  onSelect?: (player: Player) => void;
  selected?: boolean;
}

function AttrBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-7 shrink-0 text-[10px] font-semibold uppercase text-chalk/40">
        {label}
      </span>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-turf"
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-5 shrink-0 text-right text-[10px] tabular-nums text-chalk/60">
        {value}
      </span>
    </div>
  );
}

export default function PlayerCard({
  player,
  variant = "select",
  onSelect,
  selected,
}: PlayerCardProps) {
  const r = RARITY_STYLES[player.rarity];
  const flag = findSquadFlag(player.team, player.year);

  if (variant === "mini") {
    return (
      <div
        className={`flex items-center gap-2 rounded-xl border bg-pitch-800/80 px-2.5 py-2 ${r.ring}`}
      >
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-pitch-950 font-display text-sm text-flash">
          {player.shirtNumber}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold leading-tight text-chalk">
            {player.shortName}
          </p>
          <p className="truncate text-[10px] text-chalk/50">
            {flag} {player.team} {player.year}
          </p>
        </div>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-turf/15 font-display text-sm text-turf-light ring-1 ring-turf/30">
          {player.rating}
        </span>
      </div>
    );
  }

  // variant "select"
  return (
    <div
      className={`animate-pop-in rounded-2xl border bg-pitch-900/70 p-3 transition ${r.ring} ${
        selected ? "ring-2 ring-flash" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-pitch-950 font-display text-lg text-flash">
            {player.shirtNumber}
          </span>
          <div>
            <p className="font-bold leading-tight text-chalk">
              {player.shortName}
            </p>
            <p className="text-[11px] text-chalk/50">{player.name}</p>
          </div>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-turf/15 font-display text-xl text-turf-light ring-1 ring-turf/30">
          {player.rating}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-chalk/70">
          {player.position}
        </span>
        {player.secondaryPositions.length > 0 && (
          <span className="text-[10px] text-chalk/40">
            também: {player.secondaryPositions.join(" · ")}
          </span>
        )}
        <span
          className={`ml-auto rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${r.badge}`}
        >
          {r.label}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5">
        <AttrBar label="ATA" value={player.attack} />
        <AttrBar label="DEF" value={player.defense} />
        <AttrBar label="CRI" value={player.creativity} />
        <AttrBar label="FÍS" value={player.physical} />
      </div>

      {onSelect && (
        <button
          onClick={() => onSelect(player)}
          className="mt-3 w-full rounded-xl bg-turf py-2 text-sm font-bold text-pitch-950 transition hover:bg-turf-light active:scale-[0.98]"
        >
          Escolher jogador
        </button>
      )}
    </div>
  );
}
