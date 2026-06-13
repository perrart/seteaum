interface HeaderProps {
  compact?: boolean;
  onHome?: () => void;
  right?: React.ReactNode;
}

export default function Header({ compact, onHome, right }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-40 border-b border-white/10 bg-pitch-950/80 backdrop-blur-md ${
        compact ? "py-3" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <button
          onClick={onHome}
          className="group flex items-center gap-2.5 text-left"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-turf/15 text-lg ring-1 ring-turf/30 transition group-hover:bg-turf/25">
            ⚽
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg tracking-wide text-chalk">
              7X1
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-turf-light">
              busque o 7 a 0
            </span>
          </span>
        </button>
        {right}
      </div>
    </header>
  );
}
