import type { Player } from "../types";

// ============================================================
//  ELENCO HISTÓRICO DA SELEÇÃO BRASILEIRA
//  Craques de todas as Copas. team = "Brasil"; o ano define a era
//  (usado para a química do time).
// ============================================================

type Raw = Omit<Player, "team">;

const RAW: Raw[] = [
  // ===================== GOLEIROS =====================
  { id: "gilmar-1958", name: "Gilmar dos Santos", shortName: "Gilmar", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 1958, rating: 86, attack: 12, defense: 87, creativity: 40, physical: 80, legacy: 80, rarity: "épico" },
  { id: "felix-1970", name: "Félix Mielli", shortName: "Félix", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 1970, rating: 78, attack: 10, defense: 78, creativity: 38, physical: 74, legacy: 66, rarity: "raro" },
  { id: "leao-1982", name: "Émerson Leão", shortName: "Leão", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 1982, rating: 82, attack: 12, defense: 83, creativity: 42, physical: 80, legacy: 70, rarity: "raro" },
  { id: "taffarel-1994", name: "Cláudio Taffarel", shortName: "Taffarel", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 1994, rating: 86, attack: 12, defense: 87, creativity: 44, physical: 80, legacy: 84, rarity: "épico" },
  { id: "marcos-2002", name: "Marcos Roberto", shortName: "Marcos", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 2002, rating: 87, attack: 12, defense: 88, creativity: 46, physical: 82, legacy: 82, rarity: "épico" },
  { id: "dida-2006", name: "Nélson de Jesus", shortName: "Dida", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 2006, rating: 84, attack: 12, defense: 85, creativity: 44, physical: 84, legacy: 74, rarity: "raro" },
  { id: "juliocesar-2010", name: "Júlio César", shortName: "Júlio César", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 2010, rating: 87, attack: 12, defense: 88, creativity: 48, physical: 82, legacy: 76, rarity: "épico" },
  { id: "alisson-2022", name: "Alisson Becker", shortName: "Alisson", shirtNumber: 1, position: "GOL", secondaryPositions: [], year: 2022, rating: 90, attack: 14, defense: 91, creativity: 55, physical: 85, legacy: 80, rarity: "lendário" },

  // ===================== LATERAIS-DIREITOS =====================
  { id: "djalmasantos-1962", name: "Djalma Santos", shortName: "Djalma Santos", shirtNumber: 4, position: "LD", secondaryPositions: [], year: 1962, rating: 86, attack: 62, defense: 86, creativity: 60, physical: 84, legacy: 85, rarity: "épico" },
  { id: "carlosalberto-1970", name: "Carlos Alberto Torres", shortName: "Carlos Alberto", shirtNumber: 4, position: "LD", secondaryPositions: [], year: 1970, rating: 90, attack: 72, defense: 86, creativity: 74, physical: 85, legacy: 92, rarity: "lendário" },
  { id: "cafu-2002", name: "Marcos Evangelista", shortName: "Cafu", shirtNumber: 2, position: "LD", secondaryPositions: [], year: 2002, rating: 89, attack: 72, defense: 84, creativity: 70, physical: 88, legacy: 90, rarity: "lendário" },
  { id: "maicon-2010", name: "Maicon Douglas", shortName: "Maicon", shirtNumber: 13, position: "LD", secondaryPositions: [], year: 2010, rating: 85, attack: 74, defense: 82, creativity: 68, physical: 86, legacy: 72, rarity: "raro" },
  { id: "danialves-2018", name: "Daniel Alves", shortName: "Dani Alves", shirtNumber: 13, position: "LD", secondaryPositions: [], year: 2018, rating: 84, attack: 78, defense: 76, creativity: 80, physical: 78, legacy: 78, rarity: "épico" },

  // ===================== ZAGUEIROS =====================
  { id: "bellini-1958", name: "Hilderaldo Bellini", shortName: "Bellini", shirtNumber: 3, position: "ZAG", secondaryPositions: [], year: 1958, rating: 82, attack: 30, defense: 84, creativity: 44, physical: 84, legacy: 78, rarity: "raro" },
  { id: "mauroramos-1962", name: "Mauro Ramos", shortName: "Mauro Ramos", shirtNumber: 2, position: "ZAG", secondaryPositions: [], year: 1962, rating: 80, attack: 28, defense: 82, creativity: 42, physical: 82, legacy: 70, rarity: "comum" },
  { id: "brito-1970", name: "Hércules Brito", shortName: "Brito", shirtNumber: 3, position: "ZAG", secondaryPositions: [], year: 1970, rating: 80, attack: 28, defense: 82, creativity: 40, physical: 84, legacy: 68, rarity: "comum" },
  { id: "luisinho-1982", name: "Luizinho", shortName: "Luizinho", shirtNumber: 3, position: "ZAG", secondaryPositions: [], year: 1982, rating: 79, attack: 30, defense: 80, creativity: 46, physical: 80, legacy: 64, rarity: "comum" },
  { id: "aldair-1994", name: "Aldair Santos", shortName: "Aldair", shirtNumber: 14, position: "ZAG", secondaryPositions: [], year: 1994, rating: 85, attack: 40, defense: 86, creativity: 52, physical: 84, legacy: 80, rarity: "épico" },
  { id: "lucio-2002", name: "Lúcio Lima", shortName: "Lúcio", shirtNumber: 3, position: "ZAG", secondaryPositions: [], year: 2002, rating: 87, attack: 58, defense: 87, creativity: 50, physical: 88, legacy: 82, rarity: "épico" },
  { id: "juan-2006", name: "Juan Silveira", shortName: "Juan", shirtNumber: 4, position: "ZAG", secondaryPositions: [], year: 2006, rating: 83, attack: 36, defense: 84, creativity: 48, physical: 83, legacy: 70, rarity: "raro" },
  { id: "davidluiz-2014", name: "David Luiz", shortName: "David Luiz", shirtNumber: 4, position: "ZAG", secondaryPositions: ["VOL"], year: 2014, rating: 84, attack: 52, defense: 82, creativity: 66, physical: 84, legacy: 72, rarity: "raro" },
  { id: "thiagosilva-2022", name: "Thiago Silva", shortName: "Thiago Silva", shirtNumber: 3, position: "ZAG", secondaryPositions: [], year: 2022, rating: 88, attack: 40, defense: 89, creativity: 58, physical: 85, legacy: 82, rarity: "épico" },
  { id: "marquinhos-2022", name: "Marquinhos Corrêa", shortName: "Marquinhos", shirtNumber: 4, position: "ZAG", secondaryPositions: [], year: 2022, rating: 88, attack: 44, defense: 88, creativity: 58, physical: 84, legacy: 80, rarity: "épico" },

  // ===================== LATERAIS-ESQUERDOS =====================
  { id: "niltonsantos-1962", name: "Nílton Santos", shortName: "Nílton Santos", shirtNumber: 16, position: "LE", secondaryPositions: [], year: 1962, rating: 88, attack: 70, defense: 86, creativity: 70, physical: 85, legacy: 88, rarity: "lendário" },
  { id: "junior-1982", name: "Leovegildo Júnior", shortName: "Júnior", shirtNumber: 6, position: "LE", secondaryPositions: ["MEI"], year: 1982, rating: 85, attack: 76, defense: 78, creativity: 80, physical: 80, legacy: 80, rarity: "épico" },
  { id: "branco-1994", name: "Cláudio Branco", shortName: "Branco", shirtNumber: 6, position: "LE", secondaryPositions: [], year: 1994, rating: 81, attack: 70, defense: 78, creativity: 64, physical: 82, legacy: 68, rarity: "raro" },
  { id: "leonardo-1998", name: "Leonardo Araújo", shortName: "Leonardo", shirtNumber: 16, position: "LE", secondaryPositions: ["MEI"], year: 1998, rating: 82, attack: 74, defense: 70, creativity: 80, physical: 76, legacy: 70, rarity: "raro" },
  { id: "robertocarlos-2002", name: "Roberto Carlos", shortName: "R. Carlos", shirtNumber: 6, position: "LE", secondaryPositions: [], year: 2002, rating: 90, attack: 82, defense: 80, creativity: 78, physical: 90, legacy: 90, rarity: "lendário" },
  { id: "marcelo-2014", name: "Marcelo Vieira", shortName: "Marcelo", shirtNumber: 12, position: "LE", secondaryPositions: [], year: 2014, rating: 84, attack: 80, defense: 72, creativity: 80, physical: 78, legacy: 72, rarity: "raro" },

  // ===================== VOLANTES =====================
  { id: "zito-1962", name: "José Ely Miranda", shortName: "Zito", shirtNumber: 5, position: "VOL", secondaryPositions: ["MEI"], year: 1962, rating: 82, attack: 50, defense: 82, creativity: 64, physical: 80, legacy: 74, rarity: "raro" },
  { id: "clodoaldo-1970", name: "Clodoaldo Tavares", shortName: "Clodoaldo", shirtNumber: 5, position: "VOL", secondaryPositions: ["MEI"], year: 1970, rating: 83, attack: 52, defense: 80, creativity: 72, physical: 80, legacy: 76, rarity: "raro" },
  { id: "falcao-1982", name: "Paulo Roberto Falcão", shortName: "Falcão", shirtNumber: 15, position: "VOL", secondaryPositions: ["MEI"], year: 1982, rating: 88, attack: 68, defense: 80, creativity: 86, physical: 82, legacy: 84, rarity: "épico" },
  { id: "dunga-1994", name: "Carlos Dunga", shortName: "Dunga", shirtNumber: 8, position: "VOL", secondaryPositions: [], year: 1994, rating: 84, attack: 48, defense: 84, creativity: 62, physical: 86, legacy: 80, rarity: "épico" },
  { id: "maurosilva-1994", name: "Mauro Silva", shortName: "Mauro Silva", shirtNumber: 5, position: "VOL", secondaryPositions: [], year: 1994, rating: 82, attack: 40, defense: 84, creativity: 56, physical: 84, legacy: 70, rarity: "raro" },
  { id: "gilbertosilva-2002", name: "Gilberto Silva", shortName: "Gilberto Silva", shirtNumber: 8, position: "VOL", secondaryPositions: [], year: 2002, rating: 84, attack: 46, defense: 84, creativity: 60, physical: 85, legacy: 76, rarity: "raro" },
  { id: "fernandinho-2018", name: "Fernando Luiz", shortName: "Fernandinho", shirtNumber: 17, position: "VOL", secondaryPositions: [], year: 2018, rating: 82, attack: 48, defense: 82, creativity: 64, physical: 84, legacy: 66, rarity: "comum" },
  { id: "casemiro-2022", name: "Carlos Casemiro", shortName: "Casemiro", shirtNumber: 5, position: "VOL", secondaryPositions: [], year: 2022, rating: 86, attack: 52, defense: 87, creativity: 62, physical: 88, legacy: 78, rarity: "épico" },

  // ===================== MEIAS =====================
  { id: "didi-1958", name: "Waldyr Pereira", shortName: "Didi", shirtNumber: 6, position: "MEI", secondaryPositions: ["VOL"], year: 1958, rating: 89, attack: 78, defense: 60, creativity: 90, physical: 76, legacy: 88, rarity: "lendário" },
  { id: "gerson-1970", name: "Gérson de Oliveira", shortName: "Gérson", shirtNumber: 8, position: "MEI", secondaryPositions: ["VOL"], year: 1970, rating: 86, attack: 74, defense: 64, creativity: 88, physical: 74, legacy: 82, rarity: "épico" },
  { id: "rivelino-1970", name: "Roberto Rivelino", shortName: "Rivelino", shirtNumber: 11, position: "MEI", secondaryPositions: ["PE"], year: 1970, rating: 88, attack: 82, defense: 56, creativity: 88, physical: 75, legacy: 86, rarity: "lendário" },
  { id: "zico-1982", name: "Arthur Antunes", shortName: "Zico", shirtNumber: 10, position: "MEI", secondaryPositions: ["CA"], year: 1982, rating: 93, attack: 88, defense: 52, creativity: 94, physical: 72, legacy: 92, rarity: "lendário" },
  { id: "socrates-1982", name: "Sócrates Brasileiro", shortName: "Sócrates", shirtNumber: 8, position: "MEI", secondaryPositions: ["VOL", "CA"], year: 1982, rating: 90, attack: 80, defense: 58, creativity: 90, physical: 80, legacy: 88, rarity: "lendário" },
  { id: "rai-1994", name: "Raí Souza", shortName: "Raí", shirtNumber: 10, position: "MEI", secondaryPositions: ["CA"], year: 1994, rating: 83, attack: 76, defense: 54, creativity: 82, physical: 76, legacy: 72, rarity: "raro" },
  { id: "rivaldo-2002", name: "Rivaldo Ferreira", shortName: "Rivaldo", shirtNumber: 10, position: "MEI", secondaryPositions: ["PE", "CA"], year: 2002, rating: 90, attack: 88, defense: 50, creativity: 90, physical: 76, legacy: 86, rarity: "lendário" },
  { id: "ronaldinho-2002", name: "Ronaldinho Gaúcho", shortName: "Ronaldinho", shirtNumber: 11, position: "MEI", secondaryPositions: ["PE"], year: 2002, rating: 92, attack: 86, defense: 46, creativity: 95, physical: 76, legacy: 90, rarity: "lendário" },
  { id: "kaka-2006", name: "Ricardo Kaká", shortName: "Kaká", shirtNumber: 10, position: "MEI", secondaryPositions: ["CA"], year: 2006, rating: 89, attack: 86, defense: 50, creativity: 88, physical: 80, legacy: 84, rarity: "épico" },
  { id: "coutinho-2018", name: "Philippe Coutinho", shortName: "Coutinho", shirtNumber: 11, position: "MEI", secondaryPositions: ["PE"], year: 2018, rating: 83, attack: 80, defense: 48, creativity: 84, physical: 70, legacy: 64, rarity: "raro" },
  { id: "paqueta-2022", name: "Lucas Paquetá", shortName: "Paquetá", shirtNumber: 7, position: "MEI", secondaryPositions: ["VOL"], year: 2022, rating: 80, attack: 72, defense: 56, creativity: 80, physical: 76, legacy: 58, rarity: "comum" },

  // ===================== PONTAS =====================
  { id: "garrincha-1962", name: "Manuel Francisco", shortName: "Garrincha", shirtNumber: 7, position: "PD", secondaryPositions: ["PE"], year: 1962, rating: 95, attack: 92, defense: 40, creativity: 96, physical: 80, legacy: 95, rarity: "lendário" },
  { id: "jairzinho-1970", name: "Jair Ventura", shortName: "Jairzinho", shirtNumber: 7, position: "PD", secondaryPositions: ["CA"], year: 1970, rating: 89, attack: 88, defense: 44, creativity: 80, physical: 84, legacy: 84, rarity: "épico" },
  { id: "bebeto-1994", name: "José Roberto Gama", shortName: "Bebeto", shirtNumber: 7, position: "PE", secondaryPositions: ["CA"], year: 1994, rating: 85, attack: 86, defense: 40, creativity: 78, physical: 74, legacy: 78, rarity: "épico" },
  { id: "denilson-1998", name: "Denílson de Oliveira", shortName: "Denílson", shirtNumber: 18, position: "PE", secondaryPositions: [], year: 1998, rating: 80, attack: 80, defense: 38, creativity: 82, physical: 76, legacy: 62, rarity: "comum" },
  { id: "robinho-2010", name: "Robson de Souza", shortName: "Robinho", shirtNumber: 7, position: "PE", secondaryPositions: ["CA"], year: 2010, rating: 82, attack: 82, defense: 36, creativity: 84, physical: 70, legacy: 66, rarity: "raro" },
  { id: "neymar-2022", name: "Neymar Júnior", shortName: "Neymar", shirtNumber: 10, position: "PE", secondaryPositions: ["CA"], year: 2022, rating: 91, attack: 90, defense: 42, creativity: 92, physical: 72, legacy: 86, rarity: "lendário" },
  { id: "vinicius-2022", name: "Vinícius Júnior", shortName: "Vini Jr", shirtNumber: 20, position: "PE", secondaryPositions: ["CA"], year: 2022, rating: 88, attack: 88, defense: 38, creativity: 86, physical: 75, legacy: 72, rarity: "épico" },
  { id: "raphinha-2022", name: "Raphael Dias", shortName: "Raphinha", shirtNumber: 19, position: "PD", secondaryPositions: ["PE"], year: 2022, rating: 83, attack: 82, defense: 44, creativity: 80, physical: 76, legacy: 60, rarity: "raro" },

  // ===================== CENTROAVANTES =====================
  { id: "vava-1962", name: "Edvaldo Neto", shortName: "Vavá", shirtNumber: 9, position: "CA", secondaryPositions: [], year: 1962, rating: 84, attack: 86, defense: 38, creativity: 66, physical: 84, legacy: 78, rarity: "épico" },
  { id: "pele-1970", name: "Edson Arantes", shortName: "Pelé", shirtNumber: 10, position: "CA", secondaryPositions: ["MEI", "PE"], year: 1970, rating: 99, attack: 95, defense: 50, creativity: 96, physical: 88, legacy: 99, rarity: "lendário" },
  { id: "tostao-1970", name: "Eduardo Andrade", shortName: "Tostão", shirtNumber: 9, position: "CA", secondaryPositions: ["MEI"], year: 1970, rating: 87, attack: 86, defense: 44, creativity: 84, physical: 76, legacy: 82, rarity: "épico" },
  { id: "careca-1986", name: "Antônio de Oliveira", shortName: "Careca", shirtNumber: 9, position: "CA", secondaryPositions: [], year: 1986, rating: 85, attack: 86, defense: 40, creativity: 72, physical: 82, legacy: 76, rarity: "épico" },
  { id: "romario-1994", name: "Romário Faria", shortName: "Romário", shirtNumber: 11, position: "CA", secondaryPositions: ["PE"], year: 1994, rating: 93, attack: 95, defense: 36, creativity: 84, physical: 72, legacy: 90, rarity: "lendário" },
  { id: "ronaldo-2002", name: "Ronaldo Nazário", shortName: "Ronaldo", shirtNumber: 9, position: "CA", secondaryPositions: ["PE"], year: 2002, rating: 96, attack: 96, defense: 38, creativity: 86, physical: 86, legacy: 95, rarity: "lendário" },
  { id: "adriano-2006", name: "Adriano Leite", shortName: "Adriano", shirtNumber: 7, position: "CA", secondaryPositions: [], year: 2006, rating: 85, attack: 87, defense: 40, creativity: 70, physical: 90, legacy: 70, rarity: "raro" },
  { id: "richarlison-2022", name: "Richarlison Andrade", shortName: "Richarlison", shirtNumber: 9, position: "CA", secondaryPositions: ["PE"], year: 2022, rating: 81, attack: 82, defense: 44, creativity: 70, physical: 82, legacy: 62, rarity: "comum" },
];

export const allPlayers: Player[] = RAW.map((p) => ({ ...p, team: "Brasil" }));

export const BRAZIL_FLAG = "🇧🇷";

const byId = new Map(allPlayers.map((p) => [p.id, p]));
export function findPlayerById(id: string): Player | undefined {
  return byId.get(id);
}
