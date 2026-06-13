const STEPS = [
  {
    n: "01",
    title: "Role",
    text: "Sorteie uma seleção e uma Copa do Mundo.",
    icon: "🎲",
  },
  {
    n: "02",
    title: "Monte",
    text: "Escolha um craque daquele elenco para a posição da vez.",
    icon: "🧩",
  },
  {
    n: "03",
    title: "Simule",
    text: "Complete os 11 e veja se seu time chega ao 7 a 0.",
    icon: "🏆",
  },
];

interface HowItWorksProps {
  id?: string;
}

export default function HowItWorks({ id }: HowItWorksProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-turf-light">
          Como funciona
        </span>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-chalk sm:text-4xl">
          Três passos até a goleada
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-pitch-900/50 p-6 transition hover:border-turf/40"
          >
            <span className="font-display text-5xl text-white/5 transition group-hover:text-turf/15">
              {s.n}
            </span>
            <div className="mt-2 text-3xl">{s.icon}</div>
            <h3 className="mt-3 font-display text-xl tracking-wide text-chalk">
              {s.title}
            </h3>
            <p className="mt-1.5 text-sm text-chalk/55">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
