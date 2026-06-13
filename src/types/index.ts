// ===== Tipos centrais do jogo "7x1" =====

export type Position =
  | "GOL"
  | "LD"
  | "ZAG"
  | "LE"
  | "VOL"
  | "MEI"
  | "PE"
  | "PD"
  | "CA";

export type Rarity = "comum" | "raro" | "épico" | "lendário";

export interface Player {
  id: string;
  name: string;
  shortName: string;
  shirtNumber: number;
  position: Position;
  secondaryPositions: Position[];
  team: string;
  year: number;
  rating: number;
  attack: number;
  defense: number;
  creativity: number;
  physical: number;
  legacy: number;
  rarity: Rarity;
}

export interface LineupSlot {
  id: string;
  position: Position;
  player: Player | null;
}

// ===== Formações =====
export type FormationKey =
  | "4-3-3"
  | "4-4-2"
  | "4-2-3-1"
  | "4-2-4"
  | "3-5-2"
  | "5-3-2"
  | "4-5-1"
  | "3-4-3";

export interface Formation {
  key: FormationKey;
  /** 11 posições, na ordem usada para montar o campo */
  slots: Position[];
}

// ===== Sorteio (5 jogadores) =====
export interface DrawOption {
  player: Player;
  /** O jogador cabe em algum slot ainda vazio do time atual? */
  selectable: boolean;
}

// ===== Simulação da Copa =====
export type CupRound =
  | "GRUPOS"
  | "OITAVAS"
  | "QUARTAS"
  | "SEMI"
  | "FINAL";

export interface Goal {
  minute: number;
  scorer: string; // nome curto
}

export interface MatchResult {
  round: CupRound;
  opponent: { flag: string; abbr: string; name: string; year: number };
  goalsFor: number;
  goalsAgainst: number;
  scorers: Goal[]; // gols do nosso time
  conceded: Goal[]; // gols sofridos
  won: boolean;
}

export type CampaignOutcome =
  | "CAMPEÃO"
  | "VICE"
  | "ELIMINADO";

export interface CupResult {
  matches: MatchResult[];
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  overall: number;
  attack: number;
  midfield: number;
  defense: number;
  chemistry: number;
  finalStrength: number;
  outcome: CampaignOutcome;
  /** Rótulo descritivo, ex.: "Eliminado nas semifinais" */
  outcomeLabel: string;
  mvp: Player;
  seed: string;
}

/** Telas / estados de navegação do app */
export type Screen =
  | "home"
  | "formation"
  | "game"
  | "simulation"
  | "card"
  | "shared";
