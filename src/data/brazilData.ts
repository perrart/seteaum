import type { Player, Position, Rarity } from "../types";

// ============================================================
//  ELENCO HISTÓRICO DA SELEÇÃO BRASILEIRA — 1950 a 2026
//  Titulares e reservas de cada Copa. team = "Brasil";
//  o ano define a era (usado na química do time).
// ============================================================

type Over = Partial<
  Pick<
    Player,
    "attack" | "defense" | "creativity" | "physical" | "legacy" | "rarity" | "secondaryPositions"
  >
>;

function clamp(v: number): number {
  return Math.max(1, Math.min(99, Math.round(v)));
}

function rarityFor(r: number): Rarity {
  if (r >= 93) return "lendário";
  if (r >= 86) return "épico";
  if (r >= 80) return "raro";
  return "comum";
}

function deriv(pos: Position, r: number) {
  switch (pos) {
    case "GOL":
      return { attack: 12, defense: r, creativity: r - 40, physical: r - 4 };
    case "ZAG":
      return { attack: r - 45, defense: r, creativity: r - 32, physical: r - 1 };
    case "LD":
    case "LE":
      return { attack: r - 12, defense: r - 4, creativity: r - 14, physical: r };
    case "VOL":
      return { attack: r - 28, defense: r - 2, creativity: r - 20, physical: r };
    case "MEI":
      return { attack: r - 8, defense: r - 34, creativity: r, physical: r - 12 };
    case "PE":
    case "PD":
      return { attack: r, defense: r - 44, creativity: r - 6, physical: r - 12 };
    case "CA":
      return { attack: r, defense: r - 48, creativity: r - 16, physical: r - 6 };
  }
}

type Raw = Omit<Player, "team">;

function mk(
  id: string,
  name: string,
  shortName: string,
  shirtNumber: number,
  position: Position,
  year: number,
  rating: number,
  over: Over = {}
): Raw {
  const d = deriv(position, rating);
  return {
    id,
    name,
    shortName,
    shirtNumber,
    position,
    secondaryPositions: over.secondaryPositions ?? [],
    year,
    rating,
    attack: clamp(over.attack ?? d.attack),
    defense: clamp(over.defense ?? d.defense),
    creativity: clamp(over.creativity ?? d.creativity),
    physical: clamp(over.physical ?? d.physical),
    legacy: clamp(over.legacy ?? rating - 12),
    rarity: over.rarity ?? rarityFor(rating),
  };
}

const L = "lendário" as const;
const E = "épico" as const;

const RAW: Raw[] = [
  // ===================== 1950 =====================
  mk("barbosa-1950", "Moacir Barbosa", "Barbosa", 1, "GOL", 1950, 78),
  mk("augusto-1950", "Augusto da Costa", "Augusto", 2, "LD", 1950, 75),
  mk("juvenal-1950", "Juvenal Amarijo", "Juvenal", 6, "LE", 1950, 73),
  mk("bauer-1950", "José Carlos Bauer", "Bauer", 5, "VOL", 1950, 78, { secondaryPositions: ["MEI"] }),
  mk("danilo-1950", "Danilo Alvim", "Danilo Alvim", 4, "MEI", 1950, 79, { secondaryPositions: ["VOL"] }),
  mk("zizinho-1950", "Thomaz Soares", "Zizinho", 8, "MEI", 1950, 90, { rarity: L, legacy: 88, secondaryPositions: ["CA"] }),
  mk("ademir-1950", "Ademir de Menezes", "Ademir", 9, "CA", 1950, 88, { rarity: E, legacy: 82 }),
  mk("jair-1950", "Jair Rosa Pinto", "Jair", 11, "MEI", 1950, 85, { secondaryPositions: ["CA"], rarity: E }),
  mk("chico-1950", "Chico", "Chico", 7, "PE", 1950, 80),
  mk("friaca-1950", "Friaça", "Friaça", 17, "PD", 1950, 78),
  mk("maneca-1950", "Maneca", "Maneca", 21, "PD", 1950, 74),

  // ===================== 1954 =====================
  mk("castilho-1954", "Carlos José Castilho", "Castilho", 1, "GOL", 1954, 79),
  mk("pinheiro-1954", "João Pinheiro", "Pinheiro", 3, "ZAG", 1954, 78),
  mk("brandaozinho-1954", "Brandãozinho", "Brandãozinho", 5, "VOL", 1954, 75),
  mk("julinho-1954", "Julinho Botelho", "Julinho", 7, "PD", 1954, 86, { rarity: E, legacy: 80 }),
  mk("baltazar-1954", "Baltazar", "Baltazar", 9, "CA", 1954, 80),
  mk("pinga-1954", "Pinga", "Pinga", 11, "PE", 1954, 76),

  // ===================== 1958 (campeão) =====================
  mk("gilmar-1958", "Gilmar dos Santos", "Gilmar", 1, "GOL", 1958, 86, { rarity: E, legacy: 80 }),
  mk("desordi-1958", "Vicente De Sordi", "De Sordi", 2, "LD", 1958, 78),
  mk("orlando-1958", "Orlando Peçanha", "Orlando", 3, "ZAG", 1958, 79),
  mk("bellini-1958", "Hilderaldo Bellini", "Bellini", 4, "ZAG", 1958, 82, { rarity: "raro", legacy: 78 }),
  mk("zagallo-1958", "Mário Zagallo", "Zagallo", 11, "PE", 1958, 84, { rarity: E, legacy: 84, secondaryPositions: ["MEI"] }),
  mk("didi-1958", "Waldyr Pereira", "Didi", 6, "MEI", 1958, 89, { rarity: L, legacy: 88, secondaryPositions: ["VOL"] }),
  mk("mazzola-1958", "José Altafini", "Mazzola", 19, "CA", 1958, 82, { rarity: "raro" }),

  // ===================== 1962 (campeão) =====================
  mk("djalmasantos-1962", "Djalma Santos", "Djalma Santos", 4, "LD", 1962, 86, { rarity: E, legacy: 85 }),
  mk("mauroramos-1962", "Mauro Ramos", "Mauro Ramos", 2, "ZAG", 1962, 80),
  mk("zozimo-1962", "Zózimo", "Zózimo", 3, "ZAG", 1962, 78),
  mk("niltonsantos-1962", "Nílton Santos", "Nílton Santos", 16, "LE", 1962, 88, { rarity: L, legacy: 88 }),
  mk("zito-1962", "José Ely Miranda", "Zito", 5, "VOL", 1962, 82, { rarity: "raro", secondaryPositions: ["MEI"] }),
  mk("garrincha-1962", "Manuel Francisco", "Garrincha", 7, "PD", 1962, 95, { rarity: L, legacy: 95, secondaryPositions: ["PE"] }),
  mk("vava-1962", "Edvaldo Neto", "Vavá", 9, "CA", 1962, 84, { rarity: E, legacy: 78 }),
  mk("amarildo-1962", "Amarildo Tavares", "Amarildo", 19, "CA", 1962, 83, { rarity: "raro" }),

  // ===================== 1966 =====================
  mk("manga-1966", "Haílton Corrêa", "Manga", 1, "GOL", 1966, 76),
  mk("altair-1966", "Altair", "Altair", 6, "LE", 1966, 77),
  mk("lima-1966", "Lima", "Lima", 8, "MEI", 1966, 78),

  // ===================== 1970 (campeão) =====================
  mk("felix-1970", "Félix Mielli", "Félix", 1, "GOL", 1970, 78, { rarity: "raro" }),
  mk("carlosalberto-1970", "Carlos Alberto Torres", "Carlos Alberto", 4, "LD", 1970, 90, { rarity: L, legacy: 92 }),
  mk("brito-1970", "Hércules Brito", "Brito", 3, "ZAG", 1970, 80),
  mk("piazza-1970", "Wilson Piazza", "Piazza", 5, "ZAG", 1970, 81, { secondaryPositions: ["VOL"], rarity: "raro" }),
  mk("everaldo-1970", "Everaldo Marques", "Everaldo", 16, "LE", 1970, 77),
  mk("clodoaldo-1970", "Clodoaldo Tavares", "Clodoaldo", 5, "VOL", 1970, 83, { rarity: "raro", secondaryPositions: ["MEI"] }),
  mk("gerson-1970", "Gérson de Oliveira", "Gérson", 8, "MEI", 1970, 86, { rarity: E, legacy: 82, secondaryPositions: ["VOL"] }),
  mk("rivelino-1970", "Roberto Rivelino", "Rivelino", 11, "MEI", 1970, 88, { rarity: L, legacy: 86, secondaryPositions: ["PE"] }),
  mk("jairzinho-1970", "Jair Ventura", "Jairzinho", 7, "PD", 1970, 89, { rarity: E, legacy: 84, secondaryPositions: ["CA"] }),
  mk("tostao-1970", "Eduardo Andrade", "Tostão", 9, "CA", 1970, 87, { rarity: E, legacy: 82, secondaryPositions: ["MEI"] }),
  mk("pele-1970", "Edson Arantes", "Pelé", 10, "CA", 1970, 99, { rarity: L, legacy: 99, secondaryPositions: ["MEI", "PE"] }),

  // ===================== 1974 =====================
  mk("luispereira-1974", "Luís Pereira", "Luís Pereira", 3, "ZAG", 1974, 80, { rarity: "raro" }),
  mk("marinho-1974", "Francisco Marinho", "F. Marinho", 6, "LE", 1974, 79),
  mk("valdomiro-1974", "Valdomiro", "Valdomiro", 7, "PD", 1974, 75),
  mk("dirceu-1974", "Dirceu", "Dirceu", 10, "MEI", 1974, 79),

  // ===================== 1978 =====================
  mk("nelinho-1978", "Nelinho", "Nelinho", 13, "LD", 1978, 80, { rarity: "raro" }),
  mk("oscar-1978", "Oscar Bernardi", "Oscar", 3, "ZAG", 1978, 80),
  mk("amaral-1978", "Amaral", "Amaral", 4, "ZAG", 1978, 77),
  mk("batista-1978", "Batista", "Batista", 5, "VOL", 1978, 76),
  mk("reinaldo-1978", "Reinaldo", "Reinaldo", 9, "CA", 1978, 83, { rarity: E }),
  mk("roberto-1978", "Roberto Dinamite", "R. Dinamite", 18, "CA", 1978, 82, { rarity: "raro" }),
  mk("gil-1978", "Gil", "Gil", 7, "PD", 1978, 76),

  // ===================== 1982 =====================
  mk("waldirperes-1982", "Waldir Peres", "Waldir Peres", 1, "GOL", 1982, 76),
  mk("leao-1982", "Émerson Leão", "Leão", 1, "GOL", 1982, 82, { rarity: "raro" }),
  mk("leandro-1982", "Leandro", "Leandro", 2, "LD", 1982, 81, { rarity: "raro" }),
  mk("luisinho-1982", "Luizinho", "Luizinho", 3, "ZAG", 1982, 79),
  mk("junior-1982", "Leovegildo Júnior", "Júnior", 6, "LE", 1982, 85, { rarity: E, legacy: 80, secondaryPositions: ["MEI"] }),
  mk("toninhocerezo-1982", "Toninho Cerezo", "Cerezo", 5, "VOL", 1982, 82, { rarity: "raro", secondaryPositions: ["MEI"] }),
  mk("falcao-1982", "Paulo Roberto Falcão", "Falcão", 15, "VOL", 1982, 88, { rarity: E, legacy: 84, secondaryPositions: ["MEI"] }),
  mk("socrates-1982", "Sócrates Brasileiro", "Sócrates", 8, "MEI", 1982, 90, { rarity: L, legacy: 88, secondaryPositions: ["VOL", "CA"] }),
  mk("zico-1982", "Arthur Antunes", "Zico", 10, "MEI", 1982, 93, { rarity: L, legacy: 92, secondaryPositions: ["CA"] }),
  mk("eder-1982", "Éder Aleixo", "Éder", 9, "PE", 1982, 84, { rarity: E }),
  mk("serginho-1982", "Serginho Chulapa", "Serginho", 18, "CA", 1982, 79),

  // ===================== 1986 =====================
  mk("carlos-1986", "Carlos Gallo", "Carlos", 1, "GOL", 1986, 78),
  mk("josimar-1986", "Josimar", "Josimar", 2, "LD", 1986, 80, { rarity: "raro" }),
  mk("edinho-1986", "Edinho", "Edinho", 3, "ZAG", 1986, 78),
  mk("alemao-1986", "Alemão", "Alemão", 8, "VOL", 1986, 80),
  mk("elzo-1986", "Elzo", "Elzo", 5, "VOL", 1986, 76),
  mk("careca-1986", "Antônio de Oliveira", "Careca", 9, "CA", 1986, 85, { rarity: E, legacy: 76 }),
  mk("muller-1986", "Müller", "Müller", 7, "PD", 1986, 79),

  // ===================== 1990 =====================
  mk("maurogalvao-1990", "Mauro Galvão", "Mauro Galvão", 14, "ZAG", 1990, 78),
  mk("ricardogomes-1990", "Ricardo Gomes", "Ricardo Gomes", 3, "ZAG", 1990, 80),
  mk("valdo-1990", "Valdo", "Valdo", 8, "MEI", 1990, 78),

  // ===================== 1994 (campeão) =====================
  mk("taffarel-1994", "Cláudio Taffarel", "Taffarel", 1, "GOL", 1994, 86, { rarity: E, legacy: 84 }),
  mk("jorginho-1994", "Jorginho", "Jorginho", 2, "LD", 1994, 81, { rarity: "raro" }),
  mk("aldair-1994", "Aldair Santos", "Aldair", 14, "ZAG", 1994, 85, { rarity: E, legacy: 80 }),
  mk("marciosantos-1994", "Márcio Santos", "Márcio Santos", 15, "ZAG", 1994, 78),
  mk("branco-1994", "Cláudio Branco", "Branco", 6, "LE", 1994, 81, { rarity: "raro" }),
  mk("maurosilva-1994", "Mauro Silva", "Mauro Silva", 5, "VOL", 1994, 82, { rarity: "raro" }),
  mk("dunga-1994", "Carlos Dunga", "Dunga", 8, "VOL", 1994, 84, { rarity: E, legacy: 80 }),
  mk("mazinho-1994", "Mazinho", "Mazinho", 17, "VOL", 1994, 78, { secondaryPositions: ["MEI"] }),
  mk("zinho-1994", "Zinho", "Zinho", 19, "MEI", 1994, 78, { secondaryPositions: ["PE"] }),
  mk("rai-1994", "Raí Souza", "Raí", 10, "MEI", 1994, 83, { rarity: "raro", secondaryPositions: ["CA"] }),
  mk("bebeto-1994", "José Roberto Gama", "Bebeto", 7, "PE", 1994, 85, { rarity: E, legacy: 78, secondaryPositions: ["CA"] }),
  mk("romario-1994", "Romário Faria", "Romário", 11, "CA", 1994, 93, { rarity: L, legacy: 90, secondaryPositions: ["PE"] }),

  // ===================== 1998 =====================
  mk("juniorbaiano-1998", "Júnior Baiano", "Júnior Baiano", 4, "ZAG", 1998, 78),
  mk("cesarsampaio-1998", "César Sampaio", "César Sampaio", 8, "VOL", 1998, 77),
  mk("leonardo-1998", "Leonardo Araújo", "Leonardo", 16, "LE", 1998, 82, { rarity: "raro", secondaryPositions: ["MEI"] }),
  mk("denilson-1998", "Denílson de Oliveira", "Denílson", 18, "PE", 1998, 80),
  mk("dida-1998", "Nélson de Jesus", "Dida", 22, "GOL", 1998, 84, { rarity: "raro" }),

  // ===================== 2002 (campeão) =====================
  mk("marcos-2002", "Marcos Roberto", "Marcos", 1, "GOL", 2002, 87, { rarity: E, legacy: 82 }),
  mk("cafu-2002", "Marcos Evangelista", "Cafu", 2, "LD", 2002, 89, { rarity: L, legacy: 90 }),
  mk("lucio-2002", "Lúcio Lima", "Lúcio", 3, "ZAG", 2002, 87, { rarity: E, legacy: 82 }),
  mk("roquejunior-2002", "Roque Júnior", "Roque Júnior", 4, "ZAG", 2002, 79),
  mk("edmilson-2002", "Edmílson", "Edmílson", 6, "VOL", 2002, 80, { secondaryPositions: ["ZAG"] }),
  mk("robertocarlos-2002", "Roberto Carlos", "R. Carlos", 6, "LE", 2002, 90, { rarity: L, legacy: 90 }),
  mk("gilbertosilva-2002", "Gilberto Silva", "Gilberto Silva", 8, "VOL", 2002, 84, { rarity: "raro" }),
  mk("kleberson-2002", "Kléberson", "Kléberson", 15, "VOL", 2002, 77, { secondaryPositions: ["MEI"] }),
  mk("ronaldinho-2002", "Ronaldinho Gaúcho", "Ronaldinho", 11, "MEI", 2002, 92, { rarity: L, legacy: 90, secondaryPositions: ["PE"] }),
  mk("rivaldo-2002", "Rivaldo Ferreira", "Rivaldo", 10, "MEI", 2002, 90, { rarity: L, legacy: 86, secondaryPositions: ["PE", "CA"] }),
  mk("ronaldo-2002", "Ronaldo Nazário", "Ronaldo", 9, "CA", 2002, 96, { rarity: L, legacy: 95, secondaryPositions: ["PE"] }),

  // ===================== 2006 =====================
  mk("dida-2006", "Nélson de Jesus", "Dida", 1, "GOL", 2006, 84, { rarity: "raro" }),
  mk("juan-2006", "Juan Silveira", "Juan", 4, "ZAG", 2006, 83, { rarity: "raro" }),
  mk("emerson-2006", "Emerson Ferreira", "Emerson", 6, "VOL", 2006, 80),
  mk("zeroberto-2006", "Zé Roberto", "Zé Roberto", 11, "MEI", 2006, 81, { rarity: "raro", secondaryPositions: ["LE"] }),
  mk("juninho-2006", "Juninho Pernambucano", "Juninho", 8, "MEI", 2006, 82, { rarity: "raro" }),
  mk("kaka-2006", "Ricardo Kaká", "Kaká", 10, "MEI", 2006, 89, { rarity: E, legacy: 84, secondaryPositions: ["CA"] }),
  mk("adriano-2006", "Adriano Leite", "Adriano", 7, "CA", 2006, 85, { rarity: "raro" }),

  // ===================== 2010 =====================
  mk("juliocesar-2010", "Júlio César", "Júlio César", 1, "GOL", 2010, 87, { rarity: E, legacy: 76 }),
  mk("maicon-2010", "Maicon Douglas", "Maicon", 13, "LD", 2010, 85, { rarity: "raro" }),
  mk("michelbastos-2010", "Michel Bastos", "M. Bastos", 6, "LE", 2010, 76),
  mk("felipemelo-2010", "Felipe Melo", "Felipe Melo", 5, "VOL", 2010, 75),
  mk("elano-2010", "Elano", "Elano", 7, "MEI", 2010, 78),
  mk("robinho-2010", "Robson de Souza", "Robinho", 11, "PE", 2010, 82, { rarity: "raro", secondaryPositions: ["CA"] }),
  mk("luisfabiano-2010", "Luís Fabiano", "Luís Fabiano", 9, "CA", 2010, 81, { rarity: "raro" }),

  // ===================== 2014 =====================
  mk("davidluiz-2014", "David Luiz", "David Luiz", 4, "ZAG", 2014, 84, { rarity: "raro", secondaryPositions: ["VOL"] }),
  mk("miranda-2014", "João Miranda", "Miranda", 3, "ZAG", 2014, 80),
  mk("dante-2014", "Dante Bonfim", "Dante", 13, "ZAG", 2014, 78),
  mk("marcelo-2014", "Marcelo Vieira", "Marcelo", 12, "LE", 2014, 84, { rarity: "raro" }),
  mk("luizgustavo-2014", "Luiz Gustavo", "Luiz Gustavo", 17, "VOL", 2014, 78),
  mk("oscar-2014", "Oscar dos Santos", "Oscar", 11, "MEI", 2014, 80, { rarity: "raro" }),
  mk("willian-2014", "Willian Borges", "Willian", 19, "PE", 2014, 79, { secondaryPositions: ["PD"] }),
  mk("hulk-2014", "Givanildo Vieira", "Hulk", 7, "PD", 2014, 80, { rarity: "raro" }),
  mk("fred-2014", "Frederico Guedes", "Fred", 9, "CA", 2014, 76),

  // ===================== 2018 =====================
  mk("alisson-2018", "Alisson Becker", "Alisson", 1, "GOL", 2018, 88, { rarity: E, legacy: 78 }),
  mk("danialves-2018", "Daniel Alves", "Dani Alves", 13, "LD", 2018, 84, { rarity: E, legacy: 78 }),
  mk("thiagosilva-2018", "Thiago Silva", "Thiago Silva", 3, "ZAG", 2018, 86, { rarity: E, legacy: 80 }),
  mk("filipeluis-2018", "Filipe Luís", "Filipe Luís", 6, "LE", 2018, 79),
  mk("fernandinho-2018", "Fernando Luiz", "Fernandinho", 17, "VOL", 2018, 82, { rarity: "raro" }),
  mk("paulinho-2018", "José Paulo Bezerra", "Paulinho", 15, "VOL", 2018, 79, { secondaryPositions: ["MEI"] }),
  mk("coutinho-2018", "Philippe Coutinho", "Coutinho", 11, "MEI", 2018, 83, { rarity: "raro", secondaryPositions: ["PE"] }),
  mk("gabrieljesus-2018", "Gabriel Jesus", "G. Jesus", 9, "CA", 2018, 81, { rarity: "raro", secondaryPositions: ["PE"] }),
  mk("firmino-2018", "Roberto Firmino", "Firmino", 20, "CA", 2018, 81, { rarity: "raro" }),
  mk("douglascosta-2018", "Douglas Costa", "Douglas Costa", 21, "PD", 2018, 79, { secondaryPositions: ["PE"] }),

  // ===================== 2022 =====================
  mk("alisson-2022", "Alisson Becker", "Alisson", 1, "GOL", 2022, 90, { rarity: L, legacy: 80 }),
  mk("ederson-2022", "Ederson Moraes", "Ederson", 23, "GOL", 2022, 84, { rarity: "raro" }),
  mk("danilo-2022", "Danilo Luiz", "Danilo", 2, "LD", 2022, 80, { secondaryPositions: ["ZAG", "LE"] }),
  mk("militao-2022", "Éder Militão", "Militão", 3, "ZAG", 2022, 83, { rarity: "raro", secondaryPositions: ["LD"] }),
  mk("marquinhos-2022", "Marquinhos Corrêa", "Marquinhos", 4, "ZAG", 2022, 88, { rarity: E, legacy: 80 }),
  mk("bremer-2022", "Gleison Bremer", "Bremer", 24, "ZAG", 2022, 80, { rarity: "raro" }),
  mk("casemiro-2022", "Carlos Casemiro", "Casemiro", 5, "VOL", 2022, 86, { rarity: E, legacy: 78 }),
  mk("brunoguimaraes-2022", "Bruno Guimarães", "Bruno G.", 17, "VOL", 2022, 84, { rarity: "raro", secondaryPositions: ["MEI"] }),
  mk("paqueta-2022", "Lucas Paquetá", "Paquetá", 7, "MEI", 2022, 81, { rarity: "raro", secondaryPositions: ["VOL"] }),
  mk("neymar-2022", "Neymar Júnior", "Neymar", 10, "PE", 2022, 91, { rarity: L, legacy: 86, secondaryPositions: ["CA", "MEI"] }),
  mk("vinicius-2022", "Vinícius Júnior", "Vini Jr", 20, "PE", 2022, 88, { rarity: E, legacy: 74, secondaryPositions: ["CA"] }),
  mk("raphinha-2022", "Raphael Dias", "Raphinha", 19, "PD", 2022, 83, { rarity: "raro", secondaryPositions: ["PE"] }),
  mk("rodrygo-2022", "Rodrygo Goes", "Rodrygo", 21, "PE", 2022, 82, { rarity: "raro", secondaryPositions: ["MEI", "CA"] }),
  mk("antony-2022", "Antony Santos", "Antony", 25, "PD", 2022, 79, { secondaryPositions: ["PE"] }),
  mk("richarlison-2022", "Richarlison Andrade", "Richarlison", 9, "CA", 2022, 81, { rarity: "raro", secondaryPositions: ["PE"] }),
  mk("pedro-2022", "Pedro Guilherme", "Pedro", 18, "CA", 2022, 80, { rarity: "raro" }),

  // ===================== 2026 (projetado) =====================
  mk("bento-2026", "Bento Krepski", "Bento", 1, "GOL", 2026, 80, { rarity: "raro" }),
  mk("wesley-2026", "Wesley França", "Wesley", 2, "LD", 2026, 78),
  mk("gabrielmagalhaes-2026", "Gabriel Magalhães", "Gabriel M.", 3, "ZAG", 2026, 82, { rarity: "raro" }),
  mk("wendell-2026", "Wendell Borges", "Wendell", 6, "LE", 2026, 77),
  mk("andre-2026", "André Trindade", "André", 5, "VOL", 2026, 80),
  mk("joaogomes-2026", "João Gomes", "João Gomes", 8, "VOL", 2026, 79),
  mk("estevao-2026", "Estêvão Willian", "Estêvão", 7, "PE", 2026, 82, { rarity: "raro", secondaryPositions: ["PD"] }),
  mk("savinho-2026", "Sávio Moreira", "Sávio", 11, "PD", 2026, 80, { rarity: "raro", secondaryPositions: ["PE"] }),
  mk("martinelli-2026", "Gabriel Martinelli", "Martinelli", 16, "PE", 2026, 80, { rarity: "raro", secondaryPositions: ["CA"] }),
  mk("endrick-2026", "Endrick Felipe", "Endrick", 9, "CA", 2026, 82, { rarity: "raro", secondaryPositions: ["PE"] }),
  mk("joaopedro-2026", "João Pedro", "João Pedro", 19, "CA", 2026, 79, { secondaryPositions: ["PE"] }),
];

export const allPlayers: Player[] = RAW.map((p) => ({ ...p, team: "Brasil" }));

export const BRAZIL_FLAG = "🇧🇷";

const byId = new Map(allPlayers.map((p) => [p.id, p]));
export function findPlayerById(id: string): Player | undefined {
  return byId.get(id);
}
