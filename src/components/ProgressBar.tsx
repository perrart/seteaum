interface ProgressBarProps {
  current: number; // rodada atual (1-based)
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const filled = Math.min(current - 1, total);
  const pct = (filled / total) * 100;

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
        <span className="text-turf-light">
          Rodada {Math.min(current, total)} de {total}
        </span>
        <span className="text-chalk/50">{filled}/{total} escalados</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-turf-dark via-turf to-turf-light transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
