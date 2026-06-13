import { useEffect, useMemo, useRef, useState } from "react";
import type { CupResult, MatchResult } from "../types";
import Flag from "./Flag";

interface CupSimulationProps {
  cup: CupResult;
  onReplay: () => void;
  onSeeCard: () => void;
  onHome: () => void;
}

const ROUND_LABEL: Record<MatchResult["round"], string> = {
  GRUPOS: "GRUPOS",
  OITAVAS: "OITAVAS",
  QUARTAS: "QUARTAS",
  SEMI: "SEMI",
  FINAL: "FINAL",
};

type GoalItem = { type: "for" | "against"; minute: number; scorer: string };
type Ev = { kind: "match"; mi: number } | ({ kind: "goal"; mi: number } & GoalItem);

const STEP_MS = 550;

export default function CupSimulation({
  cup,
  onReplay,
  onSeeCard,
  onHome,
}: CupSimulationProps) {
  // monta a timeline plana: início do jogo, depois cada gol (em ordem de minuto)
  const { events, perMatchGoals } = useMemo(() => {
    const events: Ev[] = [];
    const perMatchGoals: number[] = [];
    cup.matches.forEach((m, mi) => {
      events.push({ kind: "match", mi });
      const items: GoalItem[] = [
        ...m.scorers.map((g) => ({ type: "for" as const, minute: g.minute, scorer: g.scorer })),
        ...m.conceded.map((g) => ({ type: "against" as const, minute: g.minute, scorer: g.scorer })),
      ].sort((a, b) => a.minute - b.minute);
      perMatchGoals[mi] = items.length;
      items.forEach((it) => events.push({ kind: "goal", mi, ...it }));
    });
    return { events, perMatchGoals };
  }, [cup]);

  const [step, setStep] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setStep(0);
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setStep((n) => {
        if (n >= events.length) {
          if (timer.current) window.clearInterval(timer.current);
          return n;
        }
        return n + 1;
      });
    }, STEP_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [events]);

  const allShown = step >= events.length;

  function skip() {
    if (timer.current) window.clearInterval(timer.current);
    setStep(events.length);
  }

  const shown = events.slice(0, step);
  const startedMatches: number[] = [];
  for (const e of shown) {
    if (e.kind === "match" && !startedMatches.includes(e.mi)) startedMatches.push(e.mi);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-6 animate-fade-up">
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={onHome}
          className="font-sans text-sm font-semibold text-ink-soft hover:text-ink"
        >
          ← Início
        </button>
        {!allShown && (
          <button
            onClick={skip}
            className="font-sans text-xs font-semibold uppercase tracking-wider text-ink-soft hover:text-ink"
          >
            Pular ⏭
          </button>
        )}
      </div>

      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        Campanha na Copa
      </p>
      <h2 className="mb-4 mt-1 font-head text-2xl font-extrabold tracking-tight text-ink">
        Jogo a jogo
      </h2>

      <div className="space-y-2.5">
        {startedMatches.map((mi) => {
          const m = cup.matches[mi];
          const goalsShown = shown.filter(
            (e): e is Extract<Ev, { kind: "goal" }> => e.kind === "goal" && e.mi === mi
          );
          const forShown = goalsShown.filter((g) => g.type === "for");
          const againstShown = goalsShown.filter((g) => g.type === "against");
          const complete = goalsShown.length >= perMatchGoals[mi];

          return (
            <div
              key={mi}
              className="animate-flip overflow-hidden rounded-xl border border-ink/12 bg-paper-card shadow-card"
            >
              <div className="flex items-center gap-2.5 border-b border-ink/10 px-4 py-2.5">
                <span className="w-14 shrink-0 font-sans text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  {ROUND_LABEL[m.round]}
                </span>
                <span className="font-sans text-[10px] text-ink-soft">vs</span>
                <Flag code={m.opponent.abbr} />
                <span className="font-head text-sm font-bold text-ink">
                  {m.opponent.abbr}
                </span>
                <span className="font-sans text-[10px] text-ink-soft">
                  {m.opponent.year}
                </span>
                <span
                  className={[
                    "ml-auto flex items-center gap-1.5 font-head text-lg font-extrabold tabular-nums",
                    !complete
                      ? "text-ink-soft"
                      : m.won
                      ? "text-grass-dark"
                      : "text-brick",
                  ].join(" ")}
                >
                  {forShown.length}-{againstShown.length}
                  {complete && <span className="text-sm">{m.won ? "✓" : "✗"}</span>}
                </span>
              </div>

              {goalsShown.length > 0 && (
                <div className="grid grid-cols-2 gap-x-3 px-4 py-2.5">
                  <ul className="space-y-1">
                    {forShown.map((g, i) => (
                      <li
                        key={`f${i}`}
                        className="flex animate-slide-in items-center gap-2 text-[12px]"
                      >
                        <span className="w-7 shrink-0 text-right font-head text-ink-soft">
                          {g.minute}'
                        </span>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-grass" />
                        <span className="truncate font-semibold text-ink">{g.scorer}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {againstShown.map((g, i) => (
                      <li
                        key={`a${i}`}
                        className="flex animate-slide-in items-center gap-2 text-[12px]"
                      >
                        <span className="w-7 shrink-0 text-right font-head text-ink-soft">
                          {g.minute}'
                        </span>
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brick" />
                        <span className="truncate text-ink-soft">{g.scorer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}

        {!allShown && (
          <div className="rounded-xl border border-dashed border-ink/20 px-4 py-4 text-center font-sans text-sm text-ink-soft animate-shuffle">
            ⚽ Bola rolando…
          </div>
        )}
      </div>

      {allShown && (
        <div className="mt-6 animate-fade-up">
          <div className="rounded-2xl bg-ink p-6 text-paper shadow-panel">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-paper/60">
              Campanha encerrada
            </p>
            <p className="mt-1 font-display text-6xl leading-none gold-3d">
              {cup.wins}-{cup.losses}
            </p>
            <div className="my-4 h-px w-full bg-paper/15" />
            <p className="font-head text-sm font-bold uppercase tracking-wider text-paper">
              {cup.outcomeLabel}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { v: cup.goalsFor, l: "Gols pró" },
                { v: cup.goalsAgainst, l: "Sofridos" },
                { v: cup.wins, l: "Vitórias" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl leading-none text-gold-light">
                    {s.v}
                  </p>
                  <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-paper/55">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onReplay}
              className="rounded-xl border border-ink/20 px-5 py-3 font-sans text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-ink/5"
            >
              ↻ Repetir
            </button>
            <button
              onClick={onSeeCard}
              className="flex-1 rounded-xl bg-scarlet px-6 py-3.5 font-head text-lg font-extrabold uppercase tracking-wide text-white shadow-card transition hover:bg-scarlet-dark active:scale-[0.99]"
            >
              Ver card →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
