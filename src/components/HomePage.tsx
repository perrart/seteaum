import Footer from "./Footer";

interface HomePageProps {
  onPlay: () => void;
}

const STEPS = [
  {
    n: "01",
    t: "Escolha a formação",
    d: "Defina o esquema tático do seu Brasil, do 4-3-3 ao 3-5-2.",
  },
  {
    n: "02",
    t: "Sorteie e escale",
    d: "A cada rodada aparecem 5 craques de todas as Copas. Escolha um para a vaga.",
  },
  {
    n: "03",
    t: "Simule a Copa",
    d: "Veja a campanha jogo a jogo e gere um card pra compartilhar com a galera.",
  },
];

export default function HomePage({ onPlay }: HomePageProps) {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-12 text-center animate-fade-up">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
          🇧🇷 A seleção dos sonhos
        </p>
        <h1 className="mt-4 font-display text-7xl leading-[0.9] text-ink sm:text-8xl">
          MONTE O SEU
          <br />
          <span className="gold-3d">7 A 0</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md font-sans text-base text-ink-soft">
          Junte Pelé, Garrincha, Ronaldo, Romário e os maiores craques de todas
          as Copas no mesmo time. Escale, simule a campanha e busque o título.
        </p>
        <button
          onClick={onPlay}
          className="mt-8 rounded-xl bg-scarlet px-8 py-4 font-head text-lg font-extrabold uppercase tracking-wide text-white shadow-card transition hover:bg-scarlet-dark active:scale-[0.99]"
        >
          Montar minha seleção
        </button>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-14">
        <div className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-ink/12 bg-paper-card p-5 shadow-card"
            >
              <span className="font-display text-3xl text-gold">{s.n}</span>
              <h3 className="mt-2 font-head text-lg font-extrabold tracking-tight text-ink">
                {s.t}
              </h3>
              <p className="mt-1 font-sans text-sm text-ink-soft">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
