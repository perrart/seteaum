import type {
  Player,
  Position,
  Squad,
  LineupSlot,
  SimulationResult,
  DiceRoll,
} from "../types";
import { squads, findPlayerById } from "../data/mockData";

// ============================================================
//  ORDEM DO DRAFT (posição fixa por rodada)
// ============================================================
export const DRAFT_ORDER: Position[] = [
  "GOL",
  "LD",
  "ZAG",
  "ZAG",
  "LE",
  "VOL",
  "MEI",
  "MEI",
  "PE",
  "CA",
  "PD",
];

export const MAX_REROLLS = 3;

export const POSITION_LABELS: Record<Position, string> = {
  GOL: "Goleiro",
  LD: "Lateral-direito",
  ZAG: "Zagueiro",
  LE: "Lateral-esquerdo",
  VOL: "Volante",
  MEI: "Meio-campista",
  PE: "Ponta-esquerda",
  PD: "Ponta-direita",
  CA: "Centroavante",
};

// ============================================================
//  COMPATIBILIDADE DE POSIÇÕES
// ============================================================
const POSITION_COMPATIBILITY: Record<Position, Position[]> = {
  GOL: ["GOL"],
  LD: ["LD"],
  ZAG: ["ZAG"],
  LE: ["LE"],
  VOL: ["VOL", "MEI"], // VOL ou MEI (recuado)
  MEI: ["MEI", "VOL", "PE", "PD"],
  PE: ["PE", "CA"],
  PD: ["PD", "CA"],
  CA: ["CA", "PE", "PD"],
};

/** Um jogador pode atuar na posição do slot? */
export function canPlayPosition(player: Player, slotPosition: Position): boolean {
  const allowed = POSITION_COMPATIBILITY[slotPosition];
  const playerPositions = [player.position, ...player.secondaryPositions];
  return playerPositions.some((p) => allowed.includes(p));
}

// ============================================================
//  LINEUP
// ============================================================
export function createEmptyLineup(): LineupSlot[] {
  return DRAFT_ORDER.map((position, i) => ({
    id: `slot-${i}-${position}`,
    position,
    player: null,
  }));
}

/** Índice do próximo slot vazio (ou -1 se completo) */
export function nextEmptySlotIndex(lineup: LineupSlot[]): number {
  return lineup.findIndex((s) => s.player === null);
}

export function isLineupComplete(lineup: LineupSlot[]): boolean {
  return lineup.every((s) => s.player !== null);
}

// ============================================================
//  SORTEIO DO DADO (seleção + Copa)
// ============================================================
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Sorteia um elenco que tenha pelo menos um jogador compatível com a posição
 * atual e ainda não escalado. Tenta várias vezes; se nenhum elenco servir
 * (caso extremamente raro), retorna null.
 */
export function rollDice(
  slotPosition: Position,
  usedPlayerIds: Set<string>
): DiceRoll | null {
  const candidates: Squad[] = [];
  for (const squad of squads) {
    const available = squad.players.filter(
      (p) => !usedPlayerIds.has(p.id) && canPlayPosition(p, slotPosition)
    );
    if (available.length > 0) candidates.push(squad);
  }

  if (candidates.length === 0) return null;

  const squad = randomItem(candidates);
  const availablePlayers = squad.players.filter(
    (p) => !usedPlayerIds.has(p.id) && canPlayPosition(p, slotPosition)
  );

  return { squad, availablePlayers };
}

// ============================================================
//  SIMULAÇÃO DA PARTIDA
// ============================================================
function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function playersAt(lineup: LineupSlot[], positions: Position[]): Player[] {
  return lineup
    .filter((s) => positions.includes(s.position) && s.player)
    .map((s) => s.player as Player);
}

/** Atributo relevante por posição para o cálculo do MVP */
function relevantAttribute(player: Player, slotPosition: Position): number {
  switch (slotPosition) {
    case "GOL":
    case "ZAG":
    case "LD":
    case "LE":
      return player.defense;
    case "VOL":
      return (player.defense + player.physical) / 2;
    case "MEI":
      return player.creativity;
    case "PE":
    case "PD":
    case "CA":
      return player.attack;
    default:
      return player.rating;
  }
}

function randomVariation(): number {
  return Math.floor(Math.random() * 3) - 1; // -1, 0 ou +1
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function simulateMatch(lineup: LineupSlot[]): SimulationResult {
  const players = lineup
    .map((s) => s.player)
    .filter((p): p is Player => p !== null);

  // 1. Média geral
  const overall = avg(players.map((p) => p.rating));

  // 2. Ataque (PE, PD, CA): attack + creativity
  const attackers = playersAt(lineup, ["PE", "PD", "CA"]);
  const attack = avg(
    attackers.flatMap((p) => [p.attack, p.creativity])
  );

  // 3. Meio (VOL, MEI): creativity + physical + defense
  const midfielders = playersAt(lineup, ["VOL", "MEI"]);
  const midfield = avg(
    midfielders.flatMap((p) => [p.creativity, p.physical, p.defense])
  );

  // 4. Defesa (LD, ZAG, LE, GOL): defense + physical
  const defenders = playersAt(lineup, ["LD", "ZAG", "LE", "GOL"]);
  const defense = avg(defenders.flatMap((p) => [p.defense, p.physical]));

  // 5. Química
  let chemistry = 70;
  const countPairsBy = (key: (p: Player) => string) => {
    const groups = new Map<string, number>();
    for (const p of players) {
      const k = key(p);
      groups.set(k, (groups.get(k) ?? 0) + 1);
    }
    let pairs = 0;
    for (const n of groups.values()) pairs += (n * (n - 1)) / 2;
    return pairs;
  };
  chemistry += countPairsBy((p) => p.team) * 3; // mesma seleção
  chemistry += countPairsBy((p) => String(p.year)) * 2; // mesmo ano
  chemistry = clamp(chemistry, 0, 100);

  // 6. Força final
  const finalStrength =
    overall * 0.35 +
    attack * 0.25 +
    midfield * 0.2 +
    defense * 0.1 +
    chemistry * 0.1;

  // 7. Gols pró
  let baseGoals: number;
  if (finalStrength < 75) baseGoals = 2 + Math.round(Math.random());
  else if (finalStrength < 83) baseGoals = 3 + Math.round(Math.random());
  else if (finalStrength < 89) baseGoals = 4 + Math.round(Math.random());
  else if (finalStrength < 94) baseGoals = 5 + Math.round(Math.random());
  else baseGoals = 6 + Math.round(Math.random());
  const goalsFor = clamp(baseGoals + randomVariation(), 0, 7);

  // 8. Gols contra (baseado na defesa)
  let goalsAgainst: number;
  if (defense > 92) goalsAgainst = 0;
  else if (defense >= 85) goalsAgainst = Math.round(Math.random()); // 0-1
  else if (defense >= 78) goalsAgainst = 1 + Math.round(Math.random()); // 1-2
  else goalsAgainst = 2 + Math.round(Math.random()); // 2-3

  // 9. Vitória perfeita
  const isPerfect = goalsFor === 7 && goalsAgainst === 0;

  // 10. MVP
  let mvp = players[0];
  let bestScore = -Infinity;
  for (const slot of lineup) {
    const p = slot.player;
    if (!p) continue;
    const score =
      p.rating * 0.5 +
      p.legacy * 0.3 +
      relevantAttribute(p, slot.position) * 0.2;
    if (score > bestScore) {
      bestScore = score;
      mvp = p;
    }
  }

  // Resultado / mensagem
  let outcome: SimulationResult["outcome"];
  let message: string;
  if (goalsFor > goalsAgainst) {
    outcome = "win";
    message = isPerfect
      ? "Histórico. Sua seleção dos sonhos atropelou."
      : "Boa vitória, mas ainda não foi a goleada perfeita.";
  } else if (goalsFor === goalsAgainst) {
    outcome = "draw";
    message = "O futebol cobrou seu preço.";
  } else {
    outcome = "loss";
    message = "O futebol cobrou seu preço.";
  }

  return {
    goalsFor,
    goalsAgainst,
    overall: Math.round(overall),
    attack: Math.round(attack),
    midfield: Math.round(midfield),
    defense: Math.round(defense),
    chemistry: Math.round(chemistry),
    finalStrength: Math.round(finalStrength),
    mvp,
    message,
    isPerfect,
    outcome,
  };
}

// ============================================================
//  COMPARTILHAMENTO (link local, sem backend)
// ============================================================
export function buildShareUrl(lineup: LineupSlot[]): string {
  const ids = lineup
    .map((s) => s.player?.id)
    .filter((id): id is string => Boolean(id));
  const base =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "";
  return `${base}?team=${ids.join(",")}`;
}

/** Lê ?team=... da URL e reconstrói a escalação (na ordem do draft) */
export function parseSharedLineup(search: string): LineupSlot[] | null {
  const params = new URLSearchParams(search);
  const teamParam = params.get("team");
  if (!teamParam) return null;

  const ids = teamParam.split(",").filter(Boolean);
  if (ids.length !== DRAFT_ORDER.length) return null;

  const lineup = createEmptyLineup();
  for (let i = 0; i < ids.length; i++) {
    const player = findPlayerById(ids[i]);
    if (!player) return null;
    lineup[i].player = player;
  }
  return lineup;
}
