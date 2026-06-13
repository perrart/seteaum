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

// Banda vertical (y, em %) por categoria de posição. Quanto menor, mais perto do gol adversário.
const Y_BAND: Record<Position, number> = {
  GOL: 90,
  LD: 70,
  ZAG: 72,
  LE: 70,
  VOL: 55,
  MEI: 42,
  PE: 28,
  PD: 28,
  CA: 16,
};

export interface FieldCoord {
  x: number; // %
  y: number; // %
}

/**
 * Gera coordenadas (x,y em %) para cada slot da formação, distribuindo na
 * horizontal os jogadores que ficam na mesma linha vertical.
 */
export function fieldCoords(slots: Position[]): FieldCoord[] {
  // Agrupa índices por banda y
  const byBand = new Map<number, number[]>();
  slots.forEach((pos, i) => {
    const y = Y_BAND[pos];
    if (!byBand.has(y)) byBand.set(y, []);
    byBand.get(y)!.push(i);
  });

  const coords: FieldCoord[] = new Array(slots.length);
  for (const [y, idxs] of byBand) {
    const n = idxs.length;
    idxs.forEach((slotIdx, k) => {
      // distribui de forma simétrica: margens de 16% a 84%
      const x = n === 1 ? 50 : 18 + (k * (64 / (n - 1)));
      coords[slotIdx] = { x, y };
    });
  }
  return coords;
}
