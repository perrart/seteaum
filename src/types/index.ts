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

export interface Squad {
  id: string;
  team: string;
  year: number;
  /** Emoji da bandeira, usado na UI */
  flag: string;
  players: Player[];
}

export interface LineupSlot {
  id: string;
  position: Position;
  player: Player | null;
}

export interface SimulationResult {
  goalsFor: number;
  goalsAgainst: number;
  overall: number;
  attack: number;
  midfield: number;
  defense: number;
  chemistry: number;
  finalStrength: number;
  mvp: Player;
  message: string;
  /** Vitória perfeita por 7 a 0 */
  isPerfect: boolean;
  /** "win" | "draw" | "loss" para escolher o tom da mensagem */
  outcome: "win" | "draw" | "loss";
}

/** Telas / estados de navegação do app */
export type Screen = "home" | "game" | "result" | "shared";

/** Resultado de um sorteio de dado (seleção + Copa) */
export interface DiceRoll {
  squad: Squad;
  /** Jogadores do elenco compatíveis com a posição atual */
  availablePlayers: Player[];
}
