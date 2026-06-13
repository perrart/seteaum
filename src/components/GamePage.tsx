import { useEffect, useMemo, useState } from "react";
import type { DiceRoll, LineupSlot, Player, SimulationResult } from "../types";
import {
  MAX_REROLLS,
  createEmptyLineup,
  isLineupComplete,
  nextEmptySlotIndex,
  rollDice,
  simulateMatch,
} from "../utils/gameLogic";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import LineupField from "./LineupField";
import DiceRoller from "./DiceRoller";

interface GamePageProps {
  onHome: () => void;
  onFinish: (lineup: LineupSlot[], result: SimulationResult) => void;
}

const ROLL_MS = 650;

export default function GamePage({ onHome, onFinish }: GamePageProps) {
  const [lineup, setLineup] = useState<LineupSlot[]>(createEmptyLineup);
  const [roll, setRoll] = useState<DiceRoll | null>(null);
  const [isRolling, setIsRolling] = useState(true);
  const [rerollsLeft, setRerollsLeft] = useState(MAX_REROLLS);
  const [rollNonce, setRollNonce] = useState(0);
  const [justPicked, setJustPicked] = useState<Player | null>(null);

  const currentIndex = nextEmptySlotIndex(lineup);
  const complete = isLineupComplete(lineup);
  const currentPosition = currentIndex >= 0 ? lineup[currentIndex].position : "GOL";

  const usedPlayerIds = useMemo(
    () =>
      new Set(
        lineup.map((s) => s.player?.id).filter((id): id is string => !!id)
      ),
    [lineup]
  );

  // Sorteio automático sempre que muda a posição atual (ou em um reroll manual)
  useEffect(() => {
    if (currentIndex < 0) return;
    setIsRolling(true);
    setRoll(null);
    const id = window.setTimeout(() => {
      setRoll(rollDice(currentPosition, usedPlayerIds));
      setIsRolling(false);
    }, ROLL_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, rollNonce]);

  function handleSelectPlayer(player: Player) {
    if (currentIndex < 0) return;
    setLineup((prev) => {
      const next = [...prev];
      next[currentIndex] = { ...next[currentIndex], player };
      return next;
    });
    setJustPicked(player);
    window.setTimeout(() => setJustPicked(null), 1600);
  }

  function handleReroll() {
    if (rerollsLeft <= 0 || isRolling) return;
    setRerollsLeft((n) => n - 1);
    setRollNonce((n) => n + 1);
  }

  function handleRestart() {
    setLineup(createEmptyLineup());
    setRerollsLeft(MAX_REROLLS);
    setRoll(null);
    setJustPicked(null);
    setRollNonce((n) => n + 1);
  }

  function handleSimulate() {
    if (!complete) return;
    const result = simulateMatch(lineup);
    onFinish(lineup, result);
  }

  return (
    <div className="min-h-screen">
      <Header
        compact
        onHome={onHome}
        right={
          <button
            onClick={handleRestart}
            className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-bold text-chalk/80 transition hover:border-white/30 hover:bg-white/5"
          >
            ↻ Recomeçar
          </button>
        }
      />

      <main className="mx-auto max-w-6xl px-4 py-5 sm:px-6">
        {/* Barra superior: progresso + meta */}
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-pitch-900/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <ProgressBar current={Math.min(currentIndex + 1, 11) || 11} total={11} />
          </div>
          <div className="flex items-center gap-2 sm:pl-4">
            <span className="rounded-lg bg-flash/15 px-3 py-1.5 text-sm font-bold text-flash">
              🎯 Meta: vencer por 7 a 0
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Campo tático */}
          <div className="order-1">
            <LineupField
              lineup={lineup}
              currentIndex={complete ? undefined : currentIndex}
            />

            <button
              onClick={handleSimulate}
              disabled={!complete}
              className={`mt-4 w-full rounded-2xl py-4 font-display text-xl tracking-wide transition active:scale-[0.99] ${
                complete
                  ? "bg-gradient-to-r from-turf to-flash text-pitch-950 shadow-glow hover:brightness-110"
                  : "cursor-not-allowed border border-white/10 bg-white/5 text-chalk/30"
              }`}
            >
              {complete ? "SIMULAR PARTIDA ⚽" : `COMPLETE OS 11 (${usedPlayerIds.size}/11)`}
            </button>
          </div>

          {/* Painel do sorteio */}
          <div className="order-2 lg:max-h-[calc(100vh-9rem)]">
            {complete ? (
              <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-turf/30 bg-pitch-900/50 p-8 text-center">
                <span className="text-5xl">✅</span>
                <p className="mt-4 font-display text-2xl text-chalk">
                  Seleção completa!
                </p>
                <p className="mt-1 text-sm text-chalk/60">
                  Toque em <span className="text-flash">Simular partida</span>{" "}
                  para ver se o seu time faz 7 a 0.
                </p>
              </div>
            ) : (
              <DiceRoller
                currentPosition={currentPosition}
                roll={roll}
                isRolling={isRolling}
                rerollsLeft={rerollsLeft}
                onReroll={handleReroll}
                onSelectPlayer={handleSelectPlayer}
              />
            )}
          </div>
        </div>
      </main>

      {/* Toast: jogador escalado */}
      {justPicked && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
          <div className="animate-pop-in rounded-full border border-turf/40 bg-pitch-800/95 px-5 py-2.5 text-sm font-bold text-chalk shadow-glow backdrop-blur">
            ✓ {justPicked.shortName} escalado!
          </div>
        </div>
      )}
    </div>
  );
}
