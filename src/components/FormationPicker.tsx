import { useState } from "react";
import type { FormationKey } from "../types";
import { FORMATION_ORDER, FORMATIONS, fieldCoords } from "../utils/formations";

interface FormationPickerProps {
  onConfirm: (key: FormationKey) => void;
  onBack: () => void;
}

function MiniPitch({ formationKey }: { formationKey: FormationKey }) {
  const coords = fieldCoords(FORMATIONS[formationKey].slots);
  return (
    <div className="relative h-12 w-9 rounded-sm bg-grass/15">
      {coords.map((c, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-grass-dark"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        />
      ))}
    </div>
  );
}

export default function FormationPicker({ onConfirm, onBack }: FormationPickerProps) {
  const [selected, setSelected] = useState<FormationKey>("4-3-3");

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 animate-fade-up">
      <button
        onClick={onBack}
        className="mb-6 font-sans text-sm font-semibold text-ink-soft hover:text-ink"
      >
        ← Voltar
      </button>

      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
        Formação
      </p>
      <h2 className="mt-1 font-head text-2xl font-extrabold tracking-tight text-ink">
        Como o seu Brasil vai jogar?
      </h2>
      <p className="mt-2 max-w-md font-sans text-sm text-ink-soft">
        Escolha o esquema tático. Ele define as posições que você vai preencher
        no sorteio.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FORMATION_ORDER.map((key) => {
          const active = selected === key;
          return (
            <button
              key={key}
              onClick={() => setSelected(key)}
              className={[
                "flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 transition",
                active
                  ? "border-ink bg-ink text-paper shadow-lift"
                  : "border-ink/15 bg-paper-card text-ink hover:border-ink/40",
              ].join(" ")}
            >
              <span className="font-head text-lg font-extrabold tracking-tight">
                {key}
              </span>
              <div className={active ? "opacity-90" : "opacity-70"}>
                <MiniPitch formationKey={key} />
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onConfirm(selected)}
        className="mt-8 w-full rounded-xl bg-scarlet px-6 py-4 font-head text-lg font-extrabold uppercase tracking-wide text-white shadow-card transition hover:bg-scarlet-dark active:scale-[0.99]"
      >
        Começar o sorteio →
      </button>
    </div>
  );
}
