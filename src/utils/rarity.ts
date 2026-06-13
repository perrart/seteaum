import type { Rarity } from "../types";

interface RarityStyle {
  label: string;
  /** classes da borda + brilho do card */
  ring: string;
  /** classes do selo/etiqueta */
  badge: string;
  /** cor de texto de destaque */
  text: string;
}

export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  comum: {
    label: "Comum",
    ring: "border-white/10",
    badge: "bg-white/10 text-chalk/70",
    text: "text-chalk/70",
  },
  raro: {
    label: "Raro",
    ring: "border-sky-400/30",
    badge: "bg-sky-400/15 text-sky-300",
    text: "text-sky-300",
  },
  épico: {
    label: "Épico",
    ring: "border-fuchsia-400/40 shadow-[0_0_24px_-8px_rgba(232,121,249,0.5)]",
    badge: "bg-fuchsia-400/15 text-fuchsia-300",
    text: "text-fuchsia-300",
  },
  lendário: {
    label: "Lendário",
    ring: "border-trophy/60 shadow-glow-gold",
    badge: "bg-trophy/20 text-trophy",
    text: "text-trophy",
  },
};
