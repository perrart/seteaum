interface HeroSectionProps {
  onPlay: () => void;
  onHowItWorks: () => void;
}

export default function HeroSection({ onPlay, onHowItWorks }: HeroSectionProps) {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Coluna texto */}
        <div className="animate-fade-up text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-turf/30 bg-turf/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-turf-light">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-flash" />
            Jogo casual de futebol
          </span>

          <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] tracking-tight text-chalk sm:text-5xl lg:text-6xl">
            Role o dado. Monte sua seleção dos sonhos. Simule a goleada.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base text-chalk/60 lg:mx-0">
            O sistema sorteia uma seleção e uma Copa. Você escolhe um craque
            daquele elenco, completa os 11 e descobre se seu time consegue fazer
            7 a 0.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={onPlay}
              className="rounded-xl bg-turf px-6 py-3.5 font-bold text-pitch-950 shadow-glow transition hover:bg-turf-light active:scale-[0.98]"
            >
              Jogar agora
            </button>
            <button
              onClick={onHowItWorks}
              className="rounded-xl border border-white/15 px-6 py-3.5 font-bold text-chalk transition hover:border-white/30 hover:bg-white/5"
            >
              Como funciona
            </button>
            <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3.5 font-bold text-chalk/40">
              Modo amigos
              <span className="rounded-md bg-trophy/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-trophy">
                em breve
              </span>
            </span>
          </div>
        </div>

        {/* Coluna placar */}
        <div className="animate-fade-up [animation-delay:120ms]">
          <div className="relative mx-auto max-w-md rounded-3xl border border-turf/25 bg-gradient-to-b from-pitch-800 to-pitch-900 p-8 shadow-card">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-chalk/40">
              <span>Seu time</span>
              <span className="text-flash">VS</span>
              <span>Rivais</span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-5">
              <span className="font-display text-[7rem] leading-none text-flash drop-shadow-[0_0_30px_rgba(182,255,77,0.4)] sm:text-[9rem]">
                7
              </span>
              <span className="font-display text-6xl text-chalk/30 sm:text-7xl">
                –
              </span>
              <span className="font-display text-[7rem] leading-none text-chalk sm:text-[9rem]">
                0
              </span>
            </div>
            <p className="mt-4 text-center font-display text-lg tracking-wide text-turf-light">
              A GOLEADA PERFEITA
            </p>
            <p className="mt-1 text-center text-xs text-chalk/40">
              o placar dos sonhos de todo torcedor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
