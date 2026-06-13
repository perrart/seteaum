import type { DiceRoll, Player, Position } from "../types";
import { POSITION_LABELS } from "../utils/gameLogic";
import PlayerCard from "./PlayerCard";

interface DiceRollerProps {
  currentPosition: Position;
  roll: DiceRoll | null;
  isRolling: boolean;
  rerollsLeft: number;
  onReroll: () => void;
  onSelectPlayer: (player: Player) => void;
}

export default function DiceRoller({
  currentPosition,
  roll,
  isRolling,
  rerollsLeft,
  onReroll,
  onSelectPlayer,
}: DiceRollerProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-pitch-900/50 p-4">
      {/* Cabeçalho do sorteio */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-12 w-12 place-items-center rounded-xl bg-pitch-950 text-2xl ring-1 ring-white/10 ${
              isRolling ? "animate-dice-roll" : ""
            }`}
          >
            🎲
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-chalk/40">
              Procurando um {POSITION_LABELS[currentPosition]}
            </p>
            {isRolling ? (
              <p className="font-display text-xl text-chalk/60">Sorteando…</p>
            ) : roll ? (
              <p className="font-display text-xl text-chalk">
                {roll.squad.flag} {roll.squad.team} {roll.squad.year}
              </p>
            ) : (
              <p className="font-display text-xl text-chalk/60">—</p>
            )}
          </div>
        </div>

        <button
          onClick={onReroll}
          disabled={rerollsLeft <= 0 || isRolling}
          className="shrink-0 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-right transition enabled:hover:border-flash/50 enabled:hover:bg-flash/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="block text-xs font-bold text-chalk">
            🎲 Rolar de novo
          </span>
          <span className="block text-[10px] text-chalk/50">
            {rerollsLeft} {rerollsLeft === 1 ? "reroll" : "rerolls"} restantes
          </span>
        </button>
      </div>

      <div className="my-3 flex items-center gap-2 text-[11px] text-chalk/50">
        <span className="rounded-md bg-flash/15 px-2 py-1 font-bold uppercase tracking-wide text-flash">
          Escolha 1 {currentPosition}
        </span>
        <span>do elenco sorteado para preencher o slot atual.</span>
      </div>

      {/* Lista de jogadores disponíveis */}
      <div className="no-scrollbar -mr-1 flex-1 space-y-2 overflow-y-auto pr-1">
        {isRolling && (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-28 animate-pulse rounded-2xl border border-white/5 bg-white/5"
              />
            ))}
          </div>
        )}

        {!isRolling &&
          roll &&
          roll.availablePlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              variant="select"
              onSelect={onSelectPlayer}
            />
          ))}

        {!isRolling && roll && roll.availablePlayers.length === 0 && (
          <p className="py-8 text-center text-sm text-chalk/40">
            Nenhum jogador compatível neste elenco. Rolando de novo…
          </p>
        )}
      </div>
    </div>
  );
}
