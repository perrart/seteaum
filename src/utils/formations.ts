import type { Formation, FormationKey, Position } from "../types";

// 11 posições por formação (GOL sempre primeiro).
export const FORMATIONS: Record<FormationKey, Formation> = {
  "4-3-3": { key: "4-3-3", slots: ["GOL", "LD", "ZAG", "ZAG", "LE", "VOL", "MEI", "MEI", "PE", "CA", "PD"] },
  "4-4-2": { key: "4-4-2", slots: ["GOL", "LD", "ZAG", "ZAG", "LE", "PE", "VOL", "MEI", "PD", "CA", "CA"] },
  "4-2-3-1": { key: "4-2-3-1", slots: ["GOL", "LD", "ZAG", "ZAG", "LE", "VOL", "VOL", "PE", "MEI", "PD", "CA"] },
  "4-2-4": { key: "4-2-4", slots: ["GOL", "LD", "ZAG", "ZAG", "LE", "VOL", "MEI", "PE", "PD", "CA", "CA"] },
  "3-5-2": { key: "3-5-2", slots: ["GOL", "ZAG", "ZAG", "ZAG", "LD", "MEI", "VOL", "MEI", "LE", "CA", "CA"] },
  "5-3-2": { key: "5-3-2", slots: ["GOL", "LD", "ZAG", "ZAG", "ZAG", "LE", "VOL", "MEI", "MEI", "CA", "CA"] },
  "4-5-1": { key: "4-5-1", slots: ["GOL", "LD", "ZAG", "ZAG", "LE", "PE", "VOL", "MEI", "MEI", "PD", "CA"] },
  "3-4-3": { key: "3-4-3", slots: ["GOL", "ZAG", "ZAG", "ZAG", "LD", "VOL", "MEI", "LE", "PE", "CA", "PD"] },
};

export const FORMATION_ORDER: FormationKey[] = [
  "4-3-3",
  "4-4-2",
  "4-2-3-1",
  "4-2-4",
  "3-5-2",
  "5-3-2",
  "4-5-1",
  "3-4-3",
];

// Linha (de trás p/ frente) de cada posição. Gol embaixo (defesa do nosso time).
const ROW_OF: Record<Position, number> = {
  GOL: 0,
  LD: 1,
  ZAG: 1,
  LE: 1,
  VOL: 2,
  MEI: 3,
  PE: 4,
  PD: 4,
  CA: 5,
};

// y (%) por linha — 0 (gol, embaixo) … 5 (ataque, em cima)
const ROW_Y = [90, 73, 58, 44, 30, 16];

// Tendência horizontal: -1 esquerda, 0 centro, +1 direita
const SIDE_OF: Record<Position, number> = {
  GOL: 0,
  LE: -1,
  LD: 1,
  ZAG: 0,
  VOL: 0,
  MEI: 0,
  PE: -1,
  PD: 1,
  CA: 0,
};

export interface FieldCoord {
  x: number; // %
  y: number; // %
}

/**
 * Coordenadas (x,y em %) de cada slot, agrupando por LINHA e distribuindo na
 * horizontal (laterais nas pontas, centrais no meio) — sem sobreposição.
 */
export function fieldCoords(slots: Position[]): FieldCoord[] {
  // agrupa índices por linha
  const rows = new Map<number, number[]>();
  slots.forEach((pos, i) => {
    const r = ROW_OF[pos];
    if (!rows.has(r)) rows.set(r, []);
    rows.get(r)!.push(i);
  });

  const coords: FieldCoord[] = new Array(slots.length);
  for (const [row, idxs] of rows) {
    // ordena dentro da linha: esquerda → centro → direita (mantém estável)
    const ordered = [...idxs].sort((a, b) => {
      const sa = SIDE_OF[slots[a]];
      const sb = SIDE_OF[slots[b]];
      if (sa !== sb) return sa - sb;
      return a - b;
    });
    const n = ordered.length;
    const y = ROW_Y[row];
    ordered.forEach((slotIdx, k) => {
      const x = n === 1 ? 50 : 15 + k * (70 / (n - 1));
      coords[slotIdx] = { x, y };
    });
  }
  return coords;
}
