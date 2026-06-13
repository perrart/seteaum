import { useEffect, useMemo, useState } from "react";
import type { FormationKey, LineupSlot, Player, DrawOption } from "../types";
import { FORMATIONS } from "../utils/formations";
import {
  createLineup,
  drawFive,
  placePlayer,
  isLineupComplete,
  filledCount,
  MAX_REROLLS,
} from "../utils/gameLogic";
import FieldView from "./FieldView";
import DrawList from "./DrawList";

interface GamePageProps {
  formationKey: FormationKey;
  onHome: () => void;
  onSimulate: (lineup: LineupSlot[]) => void;
}

export default function GamePage({
  formationKey,
  onHome,
  onSimulate,
}: GamePageProps) {
  const formation = useMemo(() => FORMATIONS[formationKey], [formationKey]);

  const [lineup, setLineup] = useState<LineupSlot[]>(() =>
    createLineup(formation)
  );
  const [usedIds, setUsedIds] = useState<Set<string>>(() => new Set());
  const [options, setOptions] = useState<DrawOption[]>([]);
  const [rerollsLeft, setRerollsLeft] = useState(MAX_REROLLS);
  const [highlight, setHighlight] = useState<number | null>(null);

  const complete = isLineupComplete(lineup);
  const done = filledCount(lineup);
  const total = lineup.length;

  useEffect(() => {
    setOptions(drawFive(lineup, usedIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSelect(player: Player) {
    const placed = placePlayer(lineup, player);
    if (!placed) return;
    const nextUsed = new Set(usedIds);
    nextUsed.add(player.id);
    setLineup(placed.lineup);
    setUsedIds(nextUsed);
    setHighlight(placed.slotIndex);

    if (isLineupComplete(placed.lineup)) {
      setOptions([]);
    } else {
      setOptions(drawFive(placed.lineup, nextUsed));
      setRerollsLeft(MAX_REROLLS);
    }
  }

  function handleReroll() {
    if (rerollsLeft <= 0) return;
    setOptions(drawFive(lineup, usedIds));
    setRerollsLeft((n) => n - 1);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 animate-fade-up">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onHome}
          className="font-sans text-sm font-semibold text-ink-soft hover:text-ink"
        >
          ← Início
        </button>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-ink/15 px-3 py-1 font-head text-xs font-bold tracking-wide text-ink">
            {formationKey}
          </span>
          <span className="font-sans text-xs font-semibold text-ink-soft">
            {done}/{total}
          </span>
        </div>
      </div>

      <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-gold transition-all duration-500"
          style={{ width: `${(done / total) * 100}%` }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <FieldView lineup={lineup} highlightIndex={highlight} />

        <div>
          {complete ? (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-ink/15 bg-paper-card px-6 py-10 text-center shadow-card animate-pop-in">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                Time completo
              </p>
              <h3 className="mt-2 font-head text-2xl font-extrabold tracking-tight text-ink">
                Onze escalado!
              </h3>
              <p className="mt-2 max-w-xs font-sans text-sm text-ink-soft">
                Sua seleção está pronta. Agora é hora de buscar o 7 a 0 rumo ao
                título.
              </p>
              <button
                onClick={() => onSimulate(lineup)}
                className="mt-6 w-full rounded-xl bg-scarlet px-6 py-4 font-head text-lg font-extrabold uppercase tracking-wide text-white shadow-card transition hover:bg-scarlet-dark active:scale-[0.99]"
              >
                ⚽ Simular Copa
              </button>
            </div>
          ) : (
            <DrawList
              options={options}
              rerollsLeft={rerollsLeft}
              onSelect={handleSelect}
              onReroll={handleReroll}
            />
          )}
        </div>
      </div>
    </div>
  );
}
