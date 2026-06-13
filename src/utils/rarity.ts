import type { Rarity } from "../types";

interface RarityStyle {
  label: string;
  /** cor do texto de destaque */
  text: string;
  /** classes do selo */
  badge: string;
  /** ponto/indicador */
  dot: string;
}

export const RARITY_STYLES: Record<Rarity, RarityStyle> = {
  comum: {
    label: "Comum",
    text: "text-ink-soft",
    badge: "bg-ink/5 text-ink-soft",
    dot: "bg-ink-soft/50",
  },
  raro: {
    label: "Raro",
    text: "text-grass-dark",
    badge: "bg-grass/10 text-grass-dark",
    dot: "bg-grass",
  },
  épico: {
    label: "Épico",
    text: "text-scarlet-dark",
    badge: "bg-scarlet/10 text-scarlet-dark",
    dot: "bg-scarlet",
  },
  lendário: {
    label: "Lendário",
    text: "text-gold-dark",
    badge: "bg-gold/15 text-gold-dark",
    dot: "bg-gold",
  },
};
