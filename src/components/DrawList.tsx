import type { DrawOption, Player } from "../types";

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
      <div className="flex items-end justify-between">
        <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
          Escolha um jogador
        </h3>
        <button
          onClick={onReroll}
          disabled={rerollsLeft <= 0 || rolling}
          className="font-sans text-[11px] font-semibold uppercase tracking-wider text-ink-soft transition enabled:hover:text-scarlet disabled:opacity-40"
        >
          ↻ Re-sortear · {rerollsLeft}
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {options.map((opt, i) => {
          const p = opt.player;
          const disabled = !opt.selectable || rolling;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(p)}
              disabled={disabled}
              style={{ animationDelay: `${i * 45}ms` }}
              className={[
                "flex w-full animate-slide-in items-center gap-3 rounded-xl border bg-paper-card px-3 py-3 text-left transition",
                disabled
                  ? "cursor-not-allowed border-ink/10 opacity-45"
                  : "border-ink/15 hover:border-ink hover:shadow-card active:scale-[0.99]",
              ].join(" ")}
            >
              <span className="w-8 shrink-0 text-center font-head text-sm font-bold text-ink-soft">
                #{p.shirtNumber}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-head text-base font-extrabold text-ink">
                  {p.shortName}
                </span>
                <span className="block font-sans text-[11px] text-ink-soft">
                  Copa {p.year}
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

      <p className="mt-3 text-center font-sans text-[11px] text-ink-soft/80">
        Jogadores apagados já têm a posição preenchida no seu time.
      </p>
    </div>
  );
}
