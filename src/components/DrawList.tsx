import type { DrawOption, Player } from "../types";
import Flag from "./Flag";

interface DrawListProps {
  options: DrawOption[];
  rerollsLeft: number;
  onSelect: (player: Player) => void;
  onReroll: () => void;
  rolling?: boolean;
}

function positionTag(p: Player): string {
  return [p.position, ...p.secondaryPositions].join("/");
}

export default function DrawList({
  options,
  rerollsLeft,
  onSelect,
  onReroll,
  rolling,
}: DrawListProps) {
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        Escolha um jogador
      </h3>

      <div className="mt-3 space-y-2">
        {options.map((opt, i) => {
          const p = opt.player;
          const faded = !opt.selectable;
          const disabled = faded || rolling;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              disabled={disabled}
              style={{ animationDelay: `${i * 45}ms` }}
              className={[
                "flex w-full animate-slide-in items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
                faded
                  ? "cursor-not-allowed border-ink/10 bg-paper-deep/40 opacity-40 saturate-0"
                  : "border-ink/15 bg-paper-card hover:border-ink hover:shadow-card active:scale-[0.99]",
              ].join(" ")}
            >
              <span className="w-8 shrink-0 text-center font-head text-sm font-bold text-ink-soft">
                #{p.shirtNumber}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={[
                    "block truncate font-head text-base font-extrabold",
                    faded ? "text-ink-soft line-through" : "text-ink",
                  ].join(" ")}
                >
                  {p.shortName}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 font-sans text-[11px] text-ink-soft">
                  <Flag code="BRA" />
                  {faded ? "posição já preenchida" : `Copa ${p.year}`}
                </span>
              </span>
              <span className="shrink-0 font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
                {positionTag(p)}
              </span>
              <span className="w-9 shrink-0 text-right font-head text-xl font-bold text-ink">
                {p.rating}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onReroll}
        disabled={rerollsLeft <= 0 || rolling}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-ink/20 bg-paper-card px-5 py-3.5 font-head text-base font-extrabold uppercase tracking-wide text-ink transition enabled:hover:border-ink enabled:hover:bg-ink/5 active:scale-[0.99] disabled:opacity-40"
      >
        <span className="text-xl leading-none">🎲</span>
        Re-sortear
        <span className="font-sans text-xs font-semibold text-ink-soft">
          {rerollsLeft} restantes
        </span>
      </button>

      <p className="mt-2 text-center font-sans text-[11px] text-ink-soft/80">
        Jogadores apagados já têm a posição preenchida no seu time.
      </p>
    </div>
  );
}
