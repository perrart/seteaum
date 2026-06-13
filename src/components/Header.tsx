interface HeaderProps {
  onHome: () => void;
}

export default function Header({ onHome }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <button
          onClick={onHome}
          className="flex items-baseline gap-0.5 font-head text-2xl font-extrabold tracking-tight"
          aria-label="Voltar ao início"
        >
          <span className="text-ink">7</span>
          <span className="text-gold">x</span>
          <span className="text-ink">1</span>
        </button>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
          Seleção dos sonhos
        </span>
      </div>
    </header>
  );
}
