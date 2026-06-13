import type {
  Player,
  Position,
  LineupSlot,
  DrawOption,
  Formation,
  FormationKey,
  CupResult,
  MatchResult,
  CupRound,
  Goal,
} from "../types";
import { allPlayers, findPlayerById } from "../data/brazilData";
import { FORMATIONS } from "./formations";

export const MAX_REROLLS = 3;
export const DRAW_SIZE = 5;

export const POSITION_LABELS: Record<Position, string> = {
  GOL: "Goleiro",
  LD: "Lateral-direito",
  ZAG: "Zagueiro",
  LE: "Lateral-esquerdo",
  VOL: "Volante",
  MEI: "Meia",
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
  VOL: ["VOL", "MEI"],
  MEI: ["MEI", "VOL", "PE", "PD"],
  PE: ["PE", "CA"],
  PD: ["PD", "CA"],
  CA: ["CA", "PE", "PD"],
};

export function canPlayPosition(player: Player, slotPosition: Position): boolean {
  const allowed = POSITION_COMPATIBILITY[slotPosition];
  const playerPositions = [player.position, ...player.secondaryPositions];
  return playerPositions.some((p) => allowed.includes(p));
}

/** Categoria de bucket para o sorteio */
export type DrawCategory = "GK" | "DEF" | "MID" | "ATT";
const CATEGORY_OF: Record<Position, DrawCategory> = {
  GOL: "GK",
  LD: "DEF",
  ZAG: "DEF",
  LE: "DEF",
  VOL: "MID",
  MEI: "MID",
  PE: "ATT",
  PD: "ATT",
  CA: "ATT",
};

// ============================================================
//  LINEUP
// ============================================================
export function createLineup(formation: Formation): LineupSlot[] {
  return formation.slots.map((position, i) => ({
    id: `slot-${i}-${position}`,
    position,
    player: null,
  }));
}

export function isLineupComplete(lineup: LineupSlot[]): boolean {
  return lineup.every((s) => s.player !== null);
}

export function filledCount(lineup: LineupSlot[]): number {
  return lineup.filter((s) => s.player !== null).length;
}

/** Existe um slot vazio em que esse jogador caiba? */
export function playerHasOpenSlot(player: Player, lineup: LineupSlot[]): boolean {
  return lineup.some((s) => s.player === null && canPlayPosition(player, s.position));
}

/** Coloca o jogador no melhor slot vazio compatível. Retorna {lineup, slotIndex} ou null. */
export function placePlayer(
  lineup: LineupSlot[],
  player: Player
): { lineup: LineupSlot[]; slotIndex: number } | null {
  let idx = lineup.findIndex(
    (s) => s.player === null && s.position === player.position
  );
  if (idx < 0) {
    idx = lineup.findIndex(
      (s) => s.player === null && canPlayPosition(player, s.position)
    );
  }
  if (idx < 0) return null;
  const next = lineup.map((s, i) => (i === idx ? { ...s, player } : s));
  return { lineup: next, slotIndex: idx };
}

// ============================================================
//  SORTEIO DE 5 JOGADORES
// ============================================================
function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Sorteia 5 jogadores: 1 goleiro, 1 defensor, 1 meio, 1 atacante e 1 aleatório.
 * Garante que ao menos um deles caiba em um slot ainda vazio do time.
 */
export function drawFive(lineup: LineupSlot[], usedIds: Set<string>): DrawOption[] {
  const pool = allPlayers.filter((p) => !usedIds.has(p.id));
  const picked: Player[] = [];
  const pickedIds = new Set<string>();

  const pickFrom = (cat: DrawCategory) => {
    const cands = pool.filter(
      (p) => CATEGORY_OF[p.position] === cat && !pickedIds.has(p.id)
    );
    if (cands.length === 0) return;
    const p = randomItem(cands);
    picked.push(p);
    pickedIds.add(p.id);
  };

  (["GK", "DEF", "MID", "ATT"] as DrawCategory[]).forEach(pickFrom);

  // 5º jogador: aleatório de qualquer categoria
  while (picked.length < DRAW_SIZE) {
    const rest = pool.filter((p) => !pickedIds.has(p.id));
    if (rest.length === 0) break;
    const p = randomItem(rest);
    picked.push(p);
    pickedIds.add(p.id);
  }

  // Garante ao menos um selecionável
  const anySelectable = picked.some((p) => playerHasOpenSlot(p, lineup));
  if (!anySelectable) {
    const openPositions = lineup
      .filter((s) => s.player === null)
      .map((s) => s.position);
    if (openPositions.length > 0) {
      const targetPos = randomItem(openPositions);
      const fixCands = shuffle(
        pool.filter((p) => !pickedIds.has(p.id) && canPlayPosition(p, targetPos))
      );
      if (fixCands.length > 0) {
        const replaced = picked.pop();
        if (replaced) pickedIds.delete(replaced.id);
        picked.push(fixCands[0]);
      }
    }
  }

  return shuffle(
    picked.map((player) => ({
      player,
      selectable: playerHasOpenSlot(player, lineup),
    }))
  );
}

// ============================================================
//  ESTATÍSTICAS DO TIME
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
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
function variation(): number {
  return Math.floor(Math.random() * 3) - 1; // -1, 0, +1
}

export interface TeamStats {
  overall: number;
  attack: number;
  midfield: number;
  defense: number;
  chemistry: number;
  finalStrength: number;
}

export function computeTeamStats(lineup: LineupSlot[]): TeamStats {
  const players = lineup
    .map((s) => s.player)
    .filter((p): p is Player => p !== null);

  const overall = avg(players.map((p) => p.rating));
  const attackers = playersAt(lineup, ["PE", "PD", "CA"]);
  const attack = avg(attackers.flatMap((p) => [p.attack, p.creativity]));
  const mids = playersAt(lineup, ["VOL", "MEI"]);
  const midfield = avg(mids.flatMap((p) => [p.creativity, p.physical, p.defense]));
  const defenders = playersAt(lineup, ["LD", "ZAG", "LE", "GOL"]);
  const defense = avg(defenders.flatMap((p) => [p.defense, p.physical]));

  // Química: todos são do Brasil; o que conta é a sintonia de ERA (mesmo ano)
  const groups = new Map<number, number>();
  for (const p of players) groups.set(p.year, (groups.get(p.year) ?? 0) + 1);
  let pairs = 0;
  for (const n of groups.values()) pairs += (n * (n - 1)) / 2;
  const chemistry = clamp(58 + pairs * 4, 0, 100);

  const finalStrength =
    overall * 0.35 +
    attack * 0.25 +
    midfield * 0.2 +
    defense * 0.1 +
    chemistry * 0.1;

  return {
    overall: Math.round(overall),
    attack: Math.round(attack),
    midfield: Math.round(midfield),
    defense: Math.round(defense),
    chemistry: Math.round(chemistry),
    finalStrength: Math.round(finalStrength),
  };
}

// ============================================================
//  ADVERSÁRIOS
// ============================================================
const OPPONENTS: { flag: string; abbr: string; name: string; years: number[] }[] = [
  { flag: "🇦🇷", abbr: "ARG", name: "Argentina", years: [1978, 1986, 2022] },
  { flag: "🇫🇷", abbr: "FRA", name: "França", years: [1998, 2018] },
  { flag: "🇩🇪", abbr: "GER", name: "Alemanha", years: [1974, 1990, 2014] },
  { flag: "🇮🇹", abbr: "ITA", name: "Itália", years: [1982, 2006] },
  { flag: "🇪🇸", abbr: "ESP", name: "Espanha", years: [2010] },
  { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", abbr: "ENG", name: "Inglaterra", years: [1966, 2018] },
  { flag: "🇳🇱", abbr: "NED", name: "Holanda", years: [1974, 2010] },
  { flag: "🇺🇾", abbr: "URU", name: "Uruguai", years: [1950, 2010] },
  { flag: "🇵🇹", abbr: "POR", name: "Portugal", years: [2006, 2018] },
  { flag: "🇲🇽", abbr: "MEX", name: "México", years: [1970, 1986] },
  { flag: "🇧🇪", abbr: "BEL", name: "Bélgica", years: [2018] },
  { flag: "🇭🇷", abbr: "CRO", name: "Croácia", years: [1998, 2022] },
];

const OPP_SCORERS = [
  "Müller", "González", "Rossi", "Hughes", "Moreno", "Dubois", "Ferrari",
  "Yılmaz", "Nakamura", "Andersen", "De Boer", "López", "Schmidt", "Costa",
  "Ibáñez", "Novák", "Petrov", "Okafor",
];

// ============================================================
//  SIMULAÇÃO DA COPA
// ============================================================
const ROUND_DIFFICULTY: Record<CupRound, [number, number]> = {
  GRUPOS: [64, 78],
  OITAVAS: [72, 82],
  QUARTAS: [76, 86],
  SEMI: [80, 90],
  FINAL: [84, 93],
};

function rand(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function attackingScorerPool(lineup: LineupSlot[]): { name: string; weight: number }[] {
  const out: { name: string; weight: number }[] = [];
  for (const s of lineup) {
    const p = s.player;
    if (!p || s.position === "GOL") continue;
    let w = p.attack * 1.0 + p.creativity * 0.4;
    if (["PE", "PD", "CA"].includes(s.position)) w += 40;
    if (s.position === "MEI") w += 12;
    out.push({ name: p.shortName, weight: Math.max(1, w) });
  }
  return out.length ? out : [{ name: "Brasil", weight: 1 }];
}

function weightedPick(pool: { name: string; weight: number }[]): string {
  const total = pool.reduce((a, b) => a + b.weight, 0);
  let r = Math.random() * total;
  for (const item of pool) {
    r -= item.weight;
    if (r <= 0) return item.name;
  }
  return pool[pool.length - 1].name;
}

function makeGoals(count: number, names: string[]): Goal[] {
  if (count === 0) return [];
  const minutes = new Set<number>();
  while (minutes.size < count) minutes.add(rand(1, 90));
  const sorted = [...minutes].sort((a, b) => a - b);
  return sorted.map((minute, i) => ({ minute, scorer: names[i] }));
}

function simulateOneMatch(
  round: CupRound,
  stats: TeamStats,
  lineup: LineupSlot[]
): MatchResult {
  const opp = randomItem(OPPONENTS);
  const oppYear = randomItem(opp.years);
  const [lo, hi] = ROUND_DIFFICULTY[round];
  const oppStrength = rand(lo, hi);

  const fs = stats.finalStrength;
  let baseFor: number;
  if (fs < 75) baseFor = 2;
  else if (fs < 83) baseFor = 3;
  else if (fs < 89) baseFor = 4;
  else if (fs < 94) baseFor = 5;
  else baseFor = 6;
  baseFor += Math.round(Math.random());
  const oppResist = Math.max(0, Math.round((oppStrength - 72) / 7));
  const goalsFor = clamp(baseFor - oppResist + variation(), 0, 7);

  const oppAttack = Math.max(0, Math.round((oppStrength - 76) / 7));
  let baseAgainst = 0;
  if (stats.defense < 78) baseAgainst = 1;
  else if (stats.defense < 84) baseAgainst = Math.round(Math.random());
  const goalsAgainst = clamp(
    baseAgainst +
      oppAttack +
      (Math.random() < 0.4 ? 1 : 0) -
      (stats.defense > 92 ? 1 : 0),
    0,
    5
  );

  const pool = attackingScorerPool(lineup);
  const scorerNames = Array.from({ length: goalsFor }, () => weightedPick(pool));
  const scorers = makeGoals(goalsFor, scorerNames);
  const concededNames = Array.from({ length: goalsAgainst }, () =>
    randomItem(OPP_SCORERS)
  );
  const conceded = makeGoals(goalsAgainst, concededNames);

  return {
    round,
    opponent: { flag: opp.flag, abbr: opp.abbr, name: opp.name, year: oppYear },
    goalsFor,
    goalsAgainst,
    scorers,
    conceded,
    won: goalsFor > goalsAgainst,
  };
}

const KNOCKOUTS: CupRound[] = ["OITAVAS", "QUARTAS", "SEMI", "FINAL"];
const ROUND_NOUN: Record<CupRound, string> = {
  GRUPOS: "fase de grupos",
  OITAVAS: "oitavas de final",
  QUARTAS: "quartas de final",
  SEMI: "semifinais",
  FINAL: "final",
};

export function simulateCup(lineup: LineupSlot[]): CupResult {
  const stats = computeTeamStats(lineup);
  const matches: MatchResult[] = [];

  for (let i = 0; i < 3; i++) {
    matches.push(simulateOneMatch("GRUPOS", stats, lineup));
  }
  const groupWins = matches.filter((m) => m.won).length;

  let outcome: CupResult["outcome"] = "ELIMINADO";
  let outcomeLabel = "Eliminado na fase de grupos";

  if (groupWins >= 1) {
    for (const round of KNOCKOUTS) {
      const m = simulateOneMatch(round, stats, lineup);
      matches.push(m);
      if (m.won) {
        if (round === "FINAL") {
          outcome = "CAMPEÃO";
          outcomeLabel = "CAMPEÃO DO MUNDO!";
        }
        continue;
      } else {
        outcome = round === "FINAL" ? "VICE" : "ELIMINADO";
        outcomeLabel =
          round === "FINAL"
            ? "Vice-campeão do mundo"
            : `Eliminado nas ${ROUND_NOUN[round]}`;
        break;
      }
    }
  }

  const wins = matches.filter((m) => m.won).length;
  const losses = matches.length - wins;
  const goalsFor = matches.reduce((a, m) => a + m.goalsFor, 0);
  const goalsAgainst = matches.reduce((a, m) => a + m.goalsAgainst, 0);

  const goalsByName = new Map<string, number>();
  for (const m of matches) {
    for (const g of m.scorers) {
      goalsByName.set(g.scorer, (goalsByName.get(g.scorer) ?? 0) + 1);
    }
  }
  const players = lineup
    .map((s) => s.player)
    .filter((p): p is Player => p !== null);
  let mvp = players[0];
  let best = -Infinity;
  for (const p of players) {
    const goals = goalsByName.get(p.shortName) ?? 0;
    const score = goals * 100 + p.rating + p.legacy * 0.5;
    if (score > best) {
      best = score;
      mvp = p;
    }
  }

  return {
    matches,
    wins,
    losses,
    goalsFor,
    goalsAgainst,
    overall: stats.overall,
    attack: stats.attack,
    midfield: stats.midfield,
    defense: stats.defense,
    chemistry: stats.chemistry,
    finalStrength: stats.finalStrength,
    outcome,
    outcomeLabel,
    mvp,
    seed: buildSeed(lineup),
  };
}

// ============================================================
//  SEED + COMPARTILHAMENTO
// ============================================================
export function buildSeed(lineup: LineupSlot[]): string {
  const str = lineup.map((s) => s.player?.id ?? "").join("|");
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h.toString(36).toUpperCase().padStart(6, "0").slice(0, 7);
}

export function buildShareUrl(lineup: LineupSlot[], formationKey: FormationKey): string {
  const ids = lineup
    .map((s) => s.player?.id)
    .filter((id): id is string => Boolean(id));
  const base =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "";
  return `${base}?f=${encodeURIComponent(formationKey)}&team=${ids.join(",")}`;
}

export function parseSharedLineup(
  search: string
): { lineup: LineupSlot[]; formationKey: FormationKey } | null {
  const params = new URLSearchParams(search);
  const teamParam = params.get("team");
  const fParam = params.get("f") as FormationKey | null;
  if (!teamParam || !fParam || !FORMATIONS[fParam]) return null;

  const formation = FORMATIONS[fParam];
  const ids = teamParam.split(",").filter(Boolean);
  if (ids.length !== formation.slots.length) return null;

  const lineup = createLineup(formation);
  for (let i = 0; i < ids.length; i++) {
    const player = findPlayerById(ids[i]);
    if (!player) return null;
    lineup[i] = { ...lineup[i], player };
  }
  return { lineup, formationKey: fParam };
}
