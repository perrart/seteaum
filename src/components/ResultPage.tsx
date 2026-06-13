import { useMemo } from "react";
import type { LineupSlot, SimulationResult } from "../types";
import { buildShareUrl, POSITION_LABELS } from "../utils/gameLogic";
import { findSquadFlag } from "../utils/flags";
import { RARITY_STYLES } from "../utils/rarity";
import Header from "./Header";
import Footer from "./Footer";
import LineupField from "./LineupField";
import StatCard from "./StatCard";
import ShareButton from "./ShareButton";

interface ResultPageProps {
  lineup: LineupSlot[];
  result: SimulationResult;
  /** Modo somente-leitura (tela de time compartilhado) */
  shared?: boolean;
  onPlayAgain: () => void;
  onHome: () => void;
}

const OUTCOME_STYLES: Record<
  SimulationResult["outcome"],
  { tag: string; tagClass: string }
> = {
  win: { tag: "Vitória", tagClass: "border-turf/40 bg-turf/10 text-turf-light" },
  draw: { tag: "Empate", tagClass: "border-chalk/20 bg-white/5 text-chalk/60" },
  loss: { tag: "Derrota", tagClass: "border-red-500/40 bg-red-500/10 text-red-300" },
};

export default function ResultPage({
  lineup,
  result,
  shared = false,
  onPlayAgain,
  onHome,
}: ResultPageProps) {
  const shareUrl = useMemo(() => buildShareUrl(lineup), [lineup]);
  const oc = OUTCOME_STYLES[result.outcome];
  const mvp = result.mvp;
  const mvpFlag = findSquadFlag(mvp.team, mvp.year);
  const mvpRarity = RARITY_STYLES[mvp.rarity];

  // Cores do placar: lime no 7–0, ouro nas demais vitórias, branco no resto.
  const homeScoreClass = result.isPerfect
    ? "text-flash drop-shadow-[0_0_30px_rgba(182,255,77,0.45)]"
    : result.outcome === "win"
    ? "text-trophy drop-shadow-[0_0_24px_rgba(255,197,61,0.35)]"
    : "text-chalk";

  return (
    <div className="flex min-h-screen flex-col">
      <Header compact onHome={onHome} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {shared && (
          <div className="mb-6 animate-fade-up rounded-2xl border border-turf/25 bg-turf/5 px-4 py-3 text-center text-sm text-chalk/70">
            🔗 Você está vendo uma <strong className="text-chalk">seleção compartilhada</strong>.
            Monte a sua para tentar bater esse placar.
          </div>
        )}

        {/* ===== Placar ===== */}
        <section className="animate-fade-up text-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${oc.tagClass}`}
          >
            {oc.tag}
            {result.isPerfect && <span className="text-flash">· Perfeito</span>}
          </span>

          <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6">
            <span className="text-right">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-chalk/40">
                Sonhos
              </span>
            </span>
            <span
              className={`font-display text-[5.5rem] leading-none sm:text-[8rem] ${homeScoreClass}`}
            >
              {result.goalsFor}
            </span>
            <span className="font-display text-5xl text-chalk/25 sm:text-7xl">–</span>
            <span className="font-display text-[5.5rem] leading-none text-chalk/80 sm:text-[8rem]">
              {result.goalsAgainst}
            </span>
            <span className="text-left">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-chalk/40">
                Rivais
              </span>
            </span>
          </div>

          <p
            className={`mx-auto mt-4 max-w-lg text-balance font-display text-xl tracking-wide sm:text-2xl ${
              result.isPerfect ? "text-flash" : "text-turf-light"
            }`}
          >
            {result.message}
          </p>
        </section>

        {/* ===== MVP + Estatísticas ===== */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* MVP */}
          <section
            className={`animate-pop-in rounded-3xl border bg-gradient-to-b from-pitch-800 to-pitch-900 p-6 shadow-card ${mvpRarity.ring}`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-trophy">
              ⭐ Craque do jogo
            </span>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-pitch-950 font-display text-xl text-flash">
                {mvp.shirtNumber}
              </span>
              <div className="min-w-0">
                <p className="truncate font-display text-2xl text-chalk">
                  {mvp.shortName}
                </p>
                <p className="truncate text-sm text-chalk/50">
                  {mvpFlag} {mvp.team} {mvp.year}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-pitch-950/50 px-4 py-3">
              <span className="text-xs uppercase tracking-wider text-chalk/50">
                Nota geral
              </span>
              <span className="font-display text-3xl text-trophy">{mvp.rating}</span>
            </div>
            <span
              className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${mvpRarity.badge}`}
            >
              {mvp.rarity}
            </span>
          </section>

          {/* Estatísticas */}
          <section>
            <h2 className="mb-3 font-display text-lg uppercase tracking-wide text-chalk/70">
              Desempenho do time
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatCard
                label="Força final"
                value={result.finalStrength}
                meter={result.finalStrength}
                accent="flash"
                icon="🔥"
              />
              <StatCard label="Geral" value={result.overall} meter={result.overall} icon="📊" />
              <StatCard label="Ataque" value={result.attack} meter={result.attack} accent="trophy" icon="⚔️" />
              <StatCard label="Meio-campo" value={result.midfield} meter={result.midfield} icon="🎯" />
              <StatCard label="Defesa" value={result.defense} meter={result.defense} icon="🛡️" />
              <StatCard label="Química" value={result.chemistry} meter={result.chemistry} accent="trophy" icon="🤝" />
            </div>
          </section>
        </div>

        {/* ===== Escalação final ===== */}
        <section className="mt-10">
          <h2 className="mb-3 font-display text-lg uppercase tracking-wide text-chalk/70">
            Escalação final
          </h2>
          <div className="mx-auto max-w-md">
            <LineupField lineup={lineup} />
          </div>
        </section>

        {/* ===== Lista compacta (acessível / fallback) ===== */}
        <section className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {lineup.map((slot) =>
            slot.player ? (
              <div
                key={slot.id}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-pitch-900/60 px-2.5 py-2"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-pitch-950 font-display text-xs text-flash">
                  {slot.player.shirtNumber}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-chalk">
                    {slot.player.shortName}
                  </p>
                  <p className="truncate text-[10px] uppercase tracking-wider text-chalk/40">
                    {POSITION_LABELS[slot.position]} · {slot.player.year}
                  </p>
                </div>
              </div>
            ) : null
          )}
        </section>

        {/* ===== Ações ===== */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onPlayAgain}
            className="rounded-xl bg-turf px-6 py-3.5 font-bold text-pitch-950 shadow-glow transition hover:bg-turf-light active:scale-[0.98]"
          >
            {shared ? "Montar minha seleção" : "Jogar de novo"}
          </button>
          {!shared && <ShareButton url={shareUrl} />}
          <button
            onClick={onHome}
            className="rounded-xl border border-white/15 px-6 py-3.5 font-bold text-chalk transition hover:border-white/30 hover:bg-white/5"
          >
            Voltar para a home
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
