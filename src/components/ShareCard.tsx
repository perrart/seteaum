import { useState } from "react";
import type { CupResult, LineupSlot, FormationKey } from "../types";
import Flag from "./Flag";
import { downloadCard } from "../utils/cardCanvas";
import { buildShareUrl } from "../utils/gameLogic";

interface ShareCardProps {
  lineup: LineupSlot[];
  cup: CupResult;
  formationKey: FormationKey;
  onPlayAgain: () => void;
  onHome: () => void;
}

const OUTCOME_TEXT: Record<CupResult["outcome"], string> = {
  CAMPEÃO: "CAMPEÃO",
  VICE: "VICE-CAMPEÃO",
  ELIMINADO: "ELIMINADO",
};

export default function ShareCard({
  lineup,
  cup,
  formationKey,
  onPlayAgain,
  onHome,
}: ShareCardProps) {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleDownload() {
    try {
      setDownloading(true);
      await downloadCard(lineup, cup, formationKey);
    } catch {
      /* noop */
    } finally {
      setDownloading(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildShareUrl(lineup, formationKey));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-6 animate-fade-up">
      <div className="mb-4">
        <button
          onClick={onHome}
          className="font-sans text-sm font-semibold text-ink-soft hover:text-ink"
        >
          ← Início
        </button>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-gold p-1.5 shadow-panel">
        <div className="rounded-xl bg-paper-card px-6 py-7">
          {/* topo */}
          <div className="flex items-baseline justify-between">
            <span className="font-head text-2xl font-extrabold tracking-tight">
              <span className="text-ink">7</span>
              <span className="text-gold">x</span>
              <span className="text-ink">1</span>
            </span>
            <span className="font-sans text-xs font-semibold text-ink-soft">
              seed #{cup.seed}
            </span>
          </div>
          <div className="my-3 h-px w-full bg-ink/12" />

          {/* resultado */}
          <p className="text-center font-head text-3xl font-extrabold uppercase tracking-tight text-ink">
            {OUTCOME_TEXT[cup.outcome]}
          </p>
          <p className="text-center font-display text-7xl leading-none gold-3d">
            {cup.wins}-{cup.losses}
          </p>

          {/* caixa de stats */}
          <div className="mt-5 grid grid-cols-2 rounded-lg border-2 border-ink">
            {[
              { v: cup.goalsFor, l: "Gols pró", gold: false, br: true, bb: true },
              { v: cup.goalsAgainst, l: "Sofridos", gold: true, br: false, bb: true },
              { v: cup.overall, l: "Overall", gold: false, br: true, bb: false },
              { v: cup.wins, l: "Vitórias", gold: true, br: false, bb: false },
            ].map((s, i) => (
              <div
                key={i}
                className={[
                  "px-4 py-4 text-center",
                  s.br ? "border-r border-ink/15" : "",
                  s.bb ? "border-b border-ink/15" : "",
                ].join(" ")}
              >
                <p
                  className={[
                    "font-display text-4xl leading-none",
                    s.gold ? "text-gold" : "text-ink",
                  ].join(" ")}
                >
                  {s.v}
                </p>
                <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                  {s.l}
                </p>
              </div>
            ))}
          </div>

          {/* lista de jogadores */}
          <div className="mt-5 space-y-1.5">
            {lineup.map((slot) => {
              const p = slot.player;
              if (!p) return null;
              const isMvp = p.id === cup.mvp.id;
              return (
                <div
                  key={slot.id}
                  className={[
                    "flex items-center gap-3 rounded-lg px-3 py-2",
                    isMvp
                      ? "border border-gold bg-gold/10"
                      : "border-b border-ink/10",
                  ].join(" ")}
                >
                  <span className="w-6 text-center font-head text-sm font-bold text-ink-soft">
                    {p.shirtNumber}
                  </span>
                  <span
                    className={[
                      "min-w-0 flex-1 truncate font-head text-base font-extrabold",
                      isMvp ? "text-gold-dark" : "text-ink",
                    ].join(" ")}
                  >
                    {p.shortName}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 font-sans text-xs font-semibold text-ink-soft">
                    <Flag code="BRA" /> BRA{" "}
                    <span className="text-ink">{p.year}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 h-px w-full bg-ink/12" />
          <p className="mt-3 text-center font-sans text-xs text-ink-soft">
            7x1 · {formationKey} · monte o seu
          </p>
        </div>
      </div>

      {/* ações */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="mt-5 w-full rounded-xl bg-scarlet px-6 py-4 font-head text-lg font-extrabold uppercase tracking-wide text-white shadow-card transition hover:bg-scarlet-dark active:scale-[0.99] disabled:opacity-60"
      >
        {downloading ? "Gerando imagem…" : "📷 Compartilhar imagem"}
      </button>

      <div className="mt-3 flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 rounded-xl border border-ink/20 px-4 py-3 font-sans text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-ink/5"
        >
          {copied ? "Link copiado ✓" : "Compartilhar link"}
        </button>
        <button
          onClick={onPlayAgain}
          className="flex-1 rounded-xl border border-ink/20 px-4 py-3 font-sans text-sm font-bold uppercase tracking-wider text-ink transition hover:bg-ink/5"
        >
          Jogar de novo
        </button>
      </div>
    </div>
  );
}
