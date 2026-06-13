interface StatCardProps {
  label: string;
  value: number | string;
  /** valor 0-100 para a barra; se omitido, não mostra barra */
  meter?: number;
  accent?: "turf" | "trophy" | "flash";
  icon?: string;
}

const ACCENTS = {
  turf: "from-turf-dark to-turf-light",
  trophy: "from-trophy-dark to-trophy",
  flash: "from-turf to-flash",
};

export default function StatCard({
  label,
  value,
  meter,
  accent = "turf",
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-pitch-900/60 p-4 transition hover:border-white/20">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-chalk/50">
          {icon ? `${icon} ` : ""}
          {label}
        </span>
        <span className="font-display text-2xl text-chalk">{value}</span>
      </div>
      {typeof meter === "number" && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${ACCENTS[accent]} transition-all duration-700`}
            style={{ width: `${Math.max(0, Math.min(100, meter))}%` }}
          />
        </div>
      )}
    </div>
  );
}
