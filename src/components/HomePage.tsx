import { useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import ExampleLineup from "./ExampleLineup";
import HowItWorks from "./HowItWorks";

interface HomePageProps {
  onPlay: () => void;
}

const STATS = [
  { value: "52", label: "seleções" },
  { value: "250", label: "elencos" },
  { value: "5.729", label: "jogadores" },
];

export default function HomePage({ onPlay }: HomePageProps) {
  const howRef = useRef<HTMLDivElement>(null);

  function scrollToHow() {
    document
      .getElementById("como-funciona")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div ref={howRef} className="min-h-screen">
      <Header />
      <main>
        <HeroSection onPlay={onPlay} onHowItWorks={scrollToHow} />

        <ExampleLineup />

        <HowItWorks id="como-funciona" />

        {/* Estatísticas (fictícias) */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="grid grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-pitch-900/50 p-6 sm:p-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl text-flash sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-chalk/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-6xl px-4 pb-20 text-center sm:px-6">
          <h2 className="font-display text-3xl tracking-tight text-chalk sm:text-4xl">
            Pronto para buscar o 7 a 0?
          </h2>
          <button
            onClick={onPlay}
            className="mt-6 rounded-xl bg-turf px-8 py-4 font-bold text-pitch-950 shadow-glow transition hover:bg-turf-light active:scale-[0.98]"
          >
            Começar o draft
          </button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
