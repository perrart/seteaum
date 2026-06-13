import type { Squad } from "../types";

// ============================================================
//  DADOS MOCKADOS — 7x1
//  12 elencos históricos. Cada elenco cobre todas as posições
//  necessárias para o draft (GOL, LD, ZAG, LE, VOL, MEI, PE, PD, CA).
//  Atributos são aproximações temáticas, não estatísticas oficiais.
// ============================================================

export const squads: Squad[] = [
  // ---------------------------------------------------------- BRASIL 1970
  {
    id: "bra-1970",
    team: "Brasil",
    year: 1970,
    flag: "🇧🇷",
    players: [
      { id: "bra-1970-felix", name: "Félix Mielli", shortName: "Félix", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "Brasil", year: 1970, rating: 81, attack: 20, defense: 82, creativity: 55, physical: 78, legacy: 70, rarity: "raro" },
      { id: "bra-1970-carlos-alberto", name: "Carlos Alberto Torres", shortName: "Carlos Alberto", shirtNumber: 4, position: "LD", secondaryPositions: ["ZAG"], team: "Brasil", year: 1970, rating: 90, attack: 78, defense: 88, creativity: 80, physical: 86, legacy: 95, rarity: "épico" },
      { id: "bra-1970-brito", name: "Hércules Brito", shortName: "Brito", shirtNumber: 3, position: "ZAG", secondaryPositions: [], team: "Brasil", year: 1970, rating: 83, attack: 35, defense: 86, creativity: 55, physical: 88, legacy: 72, rarity: "raro" },
      { id: "bra-1970-piazza", name: "Wilson Piazza", shortName: "Piazza", shirtNumber: 5, position: "ZAG", secondaryPositions: ["VOL"], team: "Brasil", year: 1970, rating: 84, attack: 45, defense: 85, creativity: 68, physical: 84, legacy: 74, rarity: "raro" },
      { id: "bra-1970-everaldo", name: "Everaldo Marques", shortName: "Everaldo", shirtNumber: 6, position: "LE", secondaryPositions: [], team: "Brasil", year: 1970, rating: 80, attack: 62, defense: 80, creativity: 64, physical: 82, legacy: 68, rarity: "raro" },
      { id: "bra-1970-clodoaldo", name: "Clodoaldo Tavares", shortName: "Clodoaldo", shirtNumber: 16, position: "VOL", secondaryPositions: ["MEI"], team: "Brasil", year: 1970, rating: 85, attack: 60, defense: 82, creativity: 80, physical: 84, legacy: 78, rarity: "raro" },
      { id: "bra-1970-gerson", name: "Gérson de Oliveira", shortName: "Gérson", shirtNumber: 8, position: "MEI", secondaryPositions: ["VOL"], team: "Brasil", year: 1970, rating: 89, attack: 78, defense: 66, creativity: 93, physical: 80, legacy: 88, rarity: "épico" },
      { id: "bra-1970-rivelino", name: "Roberto Rivelino", shortName: "Rivelino", shirtNumber: 11, position: "MEI", secondaryPositions: ["PE"], team: "Brasil", year: 1970, rating: 90, attack: 86, defense: 50, creativity: 94, physical: 82, legacy: 90, rarity: "épico" },
      { id: "bra-1970-jairzinho", name: "Jair Ventura", shortName: "Jairzinho", shirtNumber: 7, position: "PD", secondaryPositions: ["CA"], team: "Brasil", year: 1970, rating: 91, attack: 92, defense: 40, creativity: 86, physical: 88, legacy: 90, rarity: "épico" },
      { id: "bra-1970-tostao", name: "Eduardo Tostão", shortName: "Tostão", shirtNumber: 9, position: "CA", secondaryPositions: ["MEI"], team: "Brasil", year: 1970, rating: 89, attack: 90, defense: 35, creativity: 90, physical: 78, legacy: 88, rarity: "épico" },
      { id: "bra-1970-pele", name: "Edson Arantes (Pelé)", shortName: "Pelé", shirtNumber: 10, position: "CA", secondaryPositions: ["MEI", "PD"], team: "Brasil", year: 1970, rating: 99, attack: 99, defense: 45, creativity: 99, physical: 92, legacy: 100, rarity: "lendário" },
      { id: "bra-1970-paulo-cezar", name: "Paulo Cézar Caju", shortName: "Caju", shirtNumber: 19, position: "PE", secondaryPositions: ["CA"], team: "Brasil", year: 1970, rating: 82, attack: 84, defense: 42, creativity: 84, physical: 80, legacy: 70, rarity: "raro" },
      { id: "bra-1970-roberto", name: "Roberto Miranda", shortName: "Miranda", shirtNumber: 18, position: "CA", secondaryPositions: ["PD"], team: "Brasil", year: 1970, rating: 79, attack: 82, defense: 30, creativity: 72, physical: 80, legacy: 60, rarity: "comum" },
      { id: "bra-1970-marco-antonio", name: "Marco Antônio", shortName: "Marco A.", shirtNumber: 14, position: "LE", secondaryPositions: ["LD"], team: "Brasil", year: 1970, rating: 78, attack: 60, defense: 78, creativity: 60, physical: 80, legacy: 58, rarity: "comum" },
    ],
  },

  // ---------------------------------------------------------- BRASIL 2002
  {
    id: "bra-2002",
    team: "Brasil",
    year: 2002,
    flag: "🇧🇷",
    players: [
      { id: "bra-2002-marcos", name: "Marcos Roberto", shortName: "Marcos", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "Brasil", year: 2002, rating: 85, attack: 20, defense: 87, creativity: 55, physical: 84, legacy: 80, rarity: "raro" },
      { id: "bra-2002-cafu", name: "Cafu", shortName: "Cafu", shirtNumber: 2, position: "LD", secondaryPositions: [], team: "Brasil", year: 2002, rating: 89, attack: 82, defense: 86, creativity: 78, physical: 90, legacy: 90, rarity: "épico" },
      { id: "bra-2002-lucio", name: "Lúcio", shortName: "Lúcio", shirtNumber: 3, position: "ZAG", secondaryPositions: [], team: "Brasil", year: 2002, rating: 86, attack: 55, defense: 88, creativity: 62, physical: 90, legacy: 80, rarity: "raro" },
      { id: "bra-2002-roque-junior", name: "Roque Júnior", shortName: "Roque Jr.", shirtNumber: 4, position: "ZAG", secondaryPositions: [], team: "Brasil", year: 2002, rating: 82, attack: 40, defense: 84, creativity: 55, physical: 85, legacy: 72, rarity: "raro" },
      { id: "bra-2002-roberto-carlos", name: "Roberto Carlos", shortName: "R. Carlos", shirtNumber: 6, position: "LE", secondaryPositions: [], team: "Brasil", year: 2002, rating: 89, attack: 86, defense: 82, creativity: 80, physical: 92, legacy: 90, rarity: "épico" },
      { id: "bra-2002-gilberto-silva", name: "Gilberto Silva", shortName: "Gilberto", shirtNumber: 8, position: "VOL", secondaryPositions: ["ZAG"], team: "Brasil", year: 2002, rating: 84, attack: 55, defense: 86, creativity: 70, physical: 88, legacy: 78, rarity: "raro" },
      { id: "bra-2002-kleberson", name: "Kléberson", shortName: "Kléberson", shirtNumber: 15, position: "VOL", secondaryPositions: ["MEI"], team: "Brasil", year: 2002, rating: 80, attack: 60, defense: 78, creativity: 74, physical: 84, legacy: 64, rarity: "comum" },
      { id: "bra-2002-juninho", name: "Juninho Paulista", shortName: "Juninho", shirtNumber: 18, position: "MEI", secondaryPositions: ["PE"], team: "Brasil", year: 2002, rating: 81, attack: 76, defense: 55, creativity: 84, physical: 74, legacy: 68, rarity: "raro" },
      { id: "bra-2002-ronaldinho", name: "Ronaldinho Gaúcho", shortName: "Ronaldinho", shirtNumber: 11, position: "MEI", secondaryPositions: ["PE", "CA"], team: "Brasil", year: 2002, rating: 92, attack: 90, defense: 45, creativity: 97, physical: 82, legacy: 92, rarity: "épico" },
      { id: "bra-2002-rivaldo", name: "Rivaldo Ferreira", shortName: "Rivaldo", shirtNumber: 10, position: "MEI", secondaryPositions: ["PE", "CA"], team: "Brasil", year: 2002, rating: 91, attack: 92, defense: 48, creativity: 94, physical: 82, legacy: 88, rarity: "épico" },
      { id: "bra-2002-ronaldo", name: "Ronaldo Nazário", shortName: "Ronaldo", shirtNumber: 9, position: "CA", secondaryPositions: ["PD"], team: "Brasil", year: 2002, rating: 97, attack: 99, defense: 30, creativity: 88, physical: 94, legacy: 100, rarity: "lendário" },
      { id: "bra-2002-edilson", name: "Edílson da Silva", shortName: "Edílson", shirtNumber: 7, position: "PD", secondaryPositions: ["CA"], team: "Brasil", year: 2002, rating: 78, attack: 80, defense: 40, creativity: 78, physical: 80, legacy: 58, rarity: "comum" },
      { id: "bra-2002-denilson", name: "Denílson de Oliveira", shortName: "Denílson", shirtNumber: 19, position: "PE", secondaryPositions: ["PD"], team: "Brasil", year: 2002, rating: 79, attack: 80, defense: 42, creativity: 84, physical: 78, legacy: 60, rarity: "comum" },
      { id: "bra-2002-edmilson", name: "Edmílson Moraes", shortName: "Edmílson", shirtNumber: 5, position: "ZAG", secondaryPositions: ["VOL"], team: "Brasil", year: 2002, rating: 81, attack: 48, defense: 83, creativity: 64, physical: 86, legacy: 66, rarity: "raro" },
    ],
  },

  // ---------------------------------------------------------- ARGENTINA 1986
  {
    id: "arg-1986",
    team: "Argentina",
    year: 1986,
    flag: "🇦🇷",
    players: [
      { id: "arg-1986-pumpido", name: "Nery Pumpido", shortName: "Pumpido", shirtNumber: 18, position: "GOL", secondaryPositions: [], team: "Argentina", year: 1986, rating: 80, attack: 18, defense: 81, creativity: 50, physical: 80, legacy: 66, rarity: "raro" },
      { id: "arg-1986-cuciuffo", name: "José Cuciuffo", shortName: "Cuciuffo", shirtNumber: 13, position: "LD", secondaryPositions: ["ZAG"], team: "Argentina", year: 1986, rating: 78, attack: 58, defense: 80, creativity: 58, physical: 82, legacy: 58, rarity: "comum" },
      { id: "arg-1986-ruggeri", name: "Oscar Ruggeri", shortName: "Ruggeri", shirtNumber: 19, position: "ZAG", secondaryPositions: [], team: "Argentina", year: 1986, rating: 84, attack: 45, defense: 87, creativity: 58, physical: 88, legacy: 76, rarity: "raro" },
      { id: "arg-1986-brown", name: "José Luis Brown", shortName: "Brown", shirtNumber: 14, position: "ZAG", secondaryPositions: [], team: "Argentina", year: 1986, rating: 80, attack: 42, defense: 84, creativity: 52, physical: 85, legacy: 70, rarity: "raro" },
      { id: "arg-1986-garre", name: "Oscar Garré", shortName: "Garré", shirtNumber: 3, position: "LE", secondaryPositions: [], team: "Argentina", year: 1986, rating: 77, attack: 56, defense: 79, creativity: 58, physical: 80, legacy: 56, rarity: "comum" },
      { id: "arg-1986-batista", name: "Sergio Batista", shortName: "Batista", shirtNumber: 12, position: "VOL", secondaryPositions: ["MEI"], team: "Argentina", year: 1986, rating: 81, attack: 52, defense: 83, creativity: 70, physical: 85, legacy: 66, rarity: "raro" },
      { id: "arg-1986-giusti", name: "Ricardo Giusti", shortName: "Giusti", shirtNumber: 2, position: "VOL", secondaryPositions: ["LD"], team: "Argentina", year: 1986, rating: 79, attack: 50, defense: 82, creativity: 64, physical: 84, legacy: 60, rarity: "comum" },
      { id: "arg-1986-burruchaga", name: "Jorge Burruchaga", shortName: "Burruchaga", shirtNumber: 7, position: "MEI", secondaryPositions: ["PD"], team: "Argentina", year: 1986, rating: 85, attack: 82, defense: 58, creativity: 86, physical: 80, legacy: 82, rarity: "raro" },
      { id: "arg-1986-maradona", name: "Diego Maradona", shortName: "Maradona", shirtNumber: 10, position: "MEI", secondaryPositions: ["CA", "PE"], team: "Argentina", year: 1986, rating: 99, attack: 96, defense: 50, creativity: 99, physical: 84, legacy: 100, rarity: "lendário" },
      { id: "arg-1986-valdano", name: "Jorge Valdano", shortName: "Valdano", shirtNumber: 11, position: "CA", secondaryPositions: ["PE"], team: "Argentina", year: 1986, rating: 84, attack: 86, defense: 40, creativity: 82, physical: 85, legacy: 76, rarity: "raro" },
      { id: "arg-1986-pedro", name: "Pedro Pasculli", shortName: "Pasculli", shirtNumber: 9, position: "CA", secondaryPositions: ["PD"], team: "Argentina", year: 1986, rating: 78, attack: 82, defense: 35, creativity: 70, physical: 80, legacy: 56, rarity: "comum" },
      { id: "arg-1986-enrique", name: "Héctor Enrique", shortName: "Enrique", shirtNumber: 15, position: "MEI", secondaryPositions: ["VOL"], team: "Argentina", year: 1986, rating: 79, attack: 64, defense: 70, creativity: 76, physical: 80, legacy: 60, rarity: "comum" },
      { id: "arg-1986-olarticoechea", name: "Julio Olarticoechea", shortName: "Olarti", shirtNumber: 4, position: "LE", secondaryPositions: ["LD"], team: "Argentina", year: 1986, rating: 78, attack: 60, defense: 78, creativity: 62, physical: 82, legacy: 58, rarity: "comum" },
      { id: "arg-1986-tapia", name: "Carlos Tapia", shortName: "Tapia", shirtNumber: 20, position: "PE", secondaryPositions: ["MEI"], team: "Argentina", year: 1986, rating: 76, attack: 76, defense: 48, creativity: 76, physical: 78, legacy: 52, rarity: "comum" },
    ],
  },

  // ---------------------------------------------------------- ARGENTINA 2022
  {
    id: "arg-2022",
    team: "Argentina",
    year: 2022,
    flag: "🇦🇷",
    players: [
      { id: "arg-2022-martinez", name: "Emiliano Martínez", shortName: "E. Martínez", shirtNumber: 23, position: "GOL", secondaryPositions: [], team: "Argentina", year: 2022, rating: 87, attack: 22, defense: 88, creativity: 58, physical: 86, legacy: 80, rarity: "raro" },
      { id: "arg-2022-molina", name: "Nahuel Molina", shortName: "Molina", shirtNumber: 26, position: "LD", secondaryPositions: [], team: "Argentina", year: 2022, rating: 82, attack: 74, defense: 80, creativity: 70, physical: 84, legacy: 70, rarity: "raro" },
      { id: "arg-2022-romero", name: "Cristian Romero", shortName: "Romero", shirtNumber: 13, position: "ZAG", secondaryPositions: [], team: "Argentina", year: 2022, rating: 85, attack: 48, defense: 87, creativity: 60, physical: 88, legacy: 76, rarity: "raro" },
      { id: "arg-2022-otamendi", name: "Nicolás Otamendi", shortName: "Otamendi", shirtNumber: 19, position: "ZAG", secondaryPositions: [], team: "Argentina", year: 2022, rating: 83, attack: 46, defense: 85, creativity: 58, physical: 86, legacy: 74, rarity: "raro" },
      { id: "arg-2022-tagliafico", name: "Nicolás Tagliafico", shortName: "Tagliafico", shirtNumber: 3, position: "LE", secondaryPositions: [], team: "Argentina", year: 2022, rating: 81, attack: 70, defense: 80, creativity: 66, physical: 83, legacy: 70, rarity: "raro" },
      { id: "arg-2022-de-paul", name: "Rodrigo De Paul", shortName: "De Paul", shirtNumber: 7, position: "VOL", secondaryPositions: ["MEI"], team: "Argentina", year: 2022, rating: 85, attack: 72, defense: 80, creativity: 84, physical: 86, legacy: 78, rarity: "raro" },
      { id: "arg-2022-fernandez", name: "Enzo Fernández", shortName: "Enzo", shirtNumber: 24, position: "VOL", secondaryPositions: ["MEI"], team: "Argentina", year: 2022, rating: 84, attack: 70, defense: 78, creativity: 86, physical: 82, legacy: 74, rarity: "raro" },
      { id: "arg-2022-mac-allister", name: "Alexis Mac Allister", shortName: "Mac Allister", shirtNumber: 20, position: "MEI", secondaryPositions: ["VOL"], team: "Argentina", year: 2022, rating: 85, attack: 78, defense: 74, creativity: 86, physical: 82, legacy: 78, rarity: "raro" },
      { id: "arg-2022-messi", name: "Lionel Messi", shortName: "Messi", shirtNumber: 10, position: "MEI", secondaryPositions: ["CA", "PD"], team: "Argentina", year: 2022, rating: 98, attack: 97, defense: 42, creativity: 99, physical: 78, legacy: 100, rarity: "lendário" },
      { id: "arg-2022-di-maria", name: "Ángel Di María", shortName: "Di María", shirtNumber: 11, position: "PD", secondaryPositions: ["PE", "MEI"], team: "Argentina", year: 2022, rating: 87, attack: 88, defense: 50, creativity: 90, physical: 80, legacy: 84, rarity: "raro" },
      { id: "arg-2022-alvarez", name: "Julián Álvarez", shortName: "J. Álvarez", shirtNumber: 9, position: "CA", secondaryPositions: ["PD"], team: "Argentina", year: 2022, rating: 84, attack: 86, defense: 50, creativity: 80, physical: 82, legacy: 76, rarity: "raro" },
      { id: "arg-2022-lautaro", name: "Lautaro Martínez", shortName: "Lautaro", shirtNumber: 22, position: "CA", secondaryPositions: ["PE"], team: "Argentina", year: 2022, rating: 84, attack: 88, defense: 45, creativity: 78, physical: 84, legacy: 74, rarity: "raro" },
      { id: "arg-2022-paredes", name: "Leandro Paredes", shortName: "Paredes", shirtNumber: 5, position: "VOL", secondaryPositions: ["MEI"], team: "Argentina", year: 2022, rating: 80, attack: 60, defense: 80, creativity: 80, physical: 80, legacy: 66, rarity: "comum" },
      { id: "arg-2022-acuna", name: "Marcos Acuña", shortName: "Acuña", shirtNumber: 8, position: "LE", secondaryPositions: ["VOL"], team: "Argentina", year: 2022, rating: 80, attack: 68, defense: 80, creativity: 66, physical: 86, legacy: 66, rarity: "comum" },
    ],
  },

  // ---------------------------------------------------------- ALEMANHA 1974
  {
    id: "ger-1974",
    team: "Alemanha",
    year: 1974,
    flag: "🇩🇪",
    players: [
      { id: "ger-1974-maier", name: "Sepp Maier", shortName: "Maier", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "Alemanha", year: 1974, rating: 85, attack: 20, defense: 87, creativity: 56, physical: 82, legacy: 82, rarity: "raro" },
      { id: "ger-1974-vogts", name: "Berti Vogts", shortName: "Vogts", shirtNumber: 2, position: "LD", secondaryPositions: ["ZAG"], team: "Alemanha", year: 1974, rating: 83, attack: 56, defense: 86, creativity: 60, physical: 85, legacy: 76, rarity: "raro" },
      { id: "ger-1974-beckenbauer", name: "Franz Beckenbauer", shortName: "Beckenbauer", shirtNumber: 5, position: "ZAG", secondaryPositions: ["VOL"], team: "Alemanha", year: 1974, rating: 95, attack: 70, defense: 92, creativity: 90, physical: 86, legacy: 98, rarity: "lendário" },
      { id: "ger-1974-schwarzenbeck", name: "Hans Schwarzenbeck", shortName: "Schwarzenbeck", shirtNumber: 4, position: "ZAG", secondaryPositions: [], team: "Alemanha", year: 1974, rating: 80, attack: 38, defense: 84, creativity: 50, physical: 86, legacy: 66, rarity: "raro" },
      { id: "ger-1974-breitner", name: "Paul Breitner", shortName: "Breitner", shirtNumber: 3, position: "LE", secondaryPositions: ["MEI"], team: "Alemanha", year: 1974, rating: 87, attack: 76, defense: 82, creativity: 84, physical: 84, legacy: 84, rarity: "raro" },
      { id: "ger-1974-bonhof", name: "Rainer Bonhof", shortName: "Bonhof", shirtNumber: 16, position: "VOL", secondaryPositions: ["MEI"], team: "Alemanha", year: 1974, rating: 83, attack: 64, defense: 82, creativity: 76, physical: 86, legacy: 70, rarity: "raro" },
      { id: "ger-1974-hoeness", name: "Uli Hoeneß", shortName: "Hoeneß", shirtNumber: 14, position: "MEI", secondaryPositions: ["PE", "CA"], team: "Alemanha", year: 1974, rating: 84, attack: 82, defense: 56, creativity: 82, physical: 82, legacy: 76, rarity: "raro" },
      { id: "ger-1974-overath", name: "Wolfgang Overath", shortName: "Overath", shirtNumber: 12, position: "MEI", secondaryPositions: ["VOL"], team: "Alemanha", year: 1974, rating: 85, attack: 72, defense: 64, creativity: 88, physical: 80, legacy: 78, rarity: "raro" },
      { id: "ger-1974-grabowski", name: "Jürgen Grabowski", shortName: "Grabowski", shirtNumber: 13, position: "PD", secondaryPositions: ["MEI"], team: "Alemanha", year: 1974, rating: 82, attack: 82, defense: 50, creativity: 82, physical: 80, legacy: 70, rarity: "raro" },
      { id: "ger-1974-muller", name: "Gerd Müller", shortName: "Müller", shirtNumber: 9, position: "CA", secondaryPositions: [], team: "Alemanha", year: 1974, rating: 93, attack: 97, defense: 30, creativity: 78, physical: 84, legacy: 95, rarity: "épico" },
      { id: "ger-1974-holzenbein", name: "Bernd Hölzenbein", shortName: "Hölzenbein", shirtNumber: 17, position: "PE", secondaryPositions: ["CA"], team: "Alemanha", year: 1974, rating: 80, attack: 80, defense: 46, creativity: 78, physical: 80, legacy: 62, rarity: "raro" },
      { id: "ger-1974-cullmann", name: "Bernd Cullmann", shortName: "Cullmann", shirtNumber: 8, position: "VOL", secondaryPositions: ["LD"], team: "Alemanha", year: 1974, rating: 78, attack: 56, defense: 80, creativity: 64, physical: 84, legacy: 56, rarity: "comum" },
      { id: "ger-1974-heynckes", name: "Jupp Heynckes", shortName: "Heynckes", shirtNumber: 11, position: "CA", secondaryPositions: ["PE"], team: "Alemanha", year: 1974, rating: 81, attack: 84, defense: 38, creativity: 74, physical: 82, legacy: 66, rarity: "raro" },
    ],
  },

  // ---------------------------------------------------------- ALEMANHA 2014
  {
    id: "ger-2014",
    team: "Alemanha",
    year: 2014,
    flag: "🇩🇪",
    players: [
      { id: "ger-2014-neuer", name: "Manuel Neuer", shortName: "Neuer", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "Alemanha", year: 2014, rating: 92, attack: 30, defense: 93, creativity: 72, physical: 88, legacy: 90, rarity: "épico" },
      { id: "ger-2014-lahm", name: "Philipp Lahm", shortName: "Lahm", shirtNumber: 16, position: "LD", secondaryPositions: ["VOL"], team: "Alemanha", year: 2014, rating: 88, attack: 76, defense: 86, creativity: 82, physical: 82, legacy: 86, rarity: "raro" },
      { id: "ger-2014-hummels", name: "Mats Hummels", shortName: "Hummels", shirtNumber: 5, position: "ZAG", secondaryPositions: [], team: "Alemanha", year: 2014, rating: 87, attack: 52, defense: 89, creativity: 70, physical: 86, legacy: 80, rarity: "raro" },
      { id: "ger-2014-boateng", name: "Jérôme Boateng", shortName: "Boateng", shirtNumber: 17, position: "ZAG", secondaryPositions: ["LD"], team: "Alemanha", year: 2014, rating: 85, attack: 50, defense: 87, creativity: 64, physical: 90, legacy: 76, rarity: "raro" },
      { id: "ger-2014-howedes", name: "Benedikt Höwedes", shortName: "Höwedes", shirtNumber: 4, position: "LE", secondaryPositions: ["ZAG"], team: "Alemanha", year: 2014, rating: 80, attack: 52, defense: 83, creativity: 56, physical: 85, legacy: 66, rarity: "comum" },
      { id: "ger-2014-khedira", name: "Sami Khedira", shortName: "Khedira", shirtNumber: 6, position: "VOL", secondaryPositions: ["MEI"], team: "Alemanha", year: 2014, rating: 83, attack: 66, defense: 82, creativity: 76, physical: 86, legacy: 74, rarity: "raro" },
      { id: "ger-2014-schweinsteiger", name: "Bastian Schweinsteiger", shortName: "Schweini", shirtNumber: 7, position: "VOL", secondaryPositions: ["MEI"], team: "Alemanha", year: 2014, rating: 88, attack: 74, defense: 84, creativity: 86, physical: 86, legacy: 86, rarity: "raro" },
      { id: "ger-2014-kroos", name: "Toni Kroos", shortName: "Kroos", shirtNumber: 18, position: "MEI", secondaryPositions: ["VOL"], team: "Alemanha", year: 2014, rating: 89, attack: 76, defense: 72, creativity: 92, physical: 78, legacy: 84, rarity: "épico" },
      { id: "ger-2014-ozil", name: "Mesut Özil", shortName: "Özil", shirtNumber: 8, position: "MEI", secondaryPositions: ["PE"], team: "Alemanha", year: 2014, rating: 87, attack: 80, defense: 50, creativity: 94, physical: 72, legacy: 80, rarity: "raro" },
      { id: "ger-2014-muller", name: "Thomas Müller", shortName: "T. Müller", shirtNumber: 13, position: "PD", secondaryPositions: ["CA", "MEI"], team: "Alemanha", year: 2014, rating: 87, attack: 88, defense: 56, creativity: 86, physical: 80, legacy: 82, rarity: "raro" },
      { id: "ger-2014-klose", name: "Miroslav Klose", shortName: "Klose", shirtNumber: 11, position: "CA", secondaryPositions: [], team: "Alemanha", year: 2014, rating: 84, attack: 88, defense: 40, creativity: 76, physical: 82, legacy: 86, rarity: "raro" },
      { id: "ger-2014-gotze", name: "Mario Götze", shortName: "Götze", shirtNumber: 19, position: "PE", secondaryPositions: ["MEI", "CA"], team: "Alemanha", year: 2014, rating: 83, attack: 84, defense: 48, creativity: 86, physical: 74, legacy: 78, rarity: "raro" },
      { id: "ger-2014-ozil2", name: "André Schürrle", shortName: "Schürrle", shirtNumber: 9, position: "PE", secondaryPositions: ["CA"], team: "Alemanha", year: 2014, rating: 81, attack: 84, defense: 44, creativity: 78, physical: 82, legacy: 70, rarity: "raro" },
    ],
  },

  // ---------------------------------------------------------- FRANÇA 1998
  {
    id: "fra-1998",
    team: "França",
    year: 1998,
    flag: "🇫🇷",
    players: [
      { id: "fra-1998-barthez", name: "Fabien Barthez", shortName: "Barthez", shirtNumber: 16, position: "GOL", secondaryPositions: [], team: "França", year: 1998, rating: 85, attack: 24, defense: 86, creativity: 60, physical: 82, legacy: 80, rarity: "raro" },
      { id: "fra-1998-thuram", name: "Lilian Thuram", shortName: "Thuram", shirtNumber: 15, position: "LD", secondaryPositions: ["ZAG"], team: "França", year: 1998, rating: 87, attack: 64, defense: 89, creativity: 66, physical: 88, legacy: 84, rarity: "raro" },
      { id: "fra-1998-blanc", name: "Laurent Blanc", shortName: "Blanc", shirtNumber: 5, position: "ZAG", secondaryPositions: [], team: "França", year: 1998, rating: 85, attack: 52, defense: 88, creativity: 70, physical: 84, legacy: 80, rarity: "raro" },
      { id: "fra-1998-desailly", name: "Marcel Desailly", shortName: "Desailly", shirtNumber: 8, position: "ZAG", secondaryPositions: ["VOL"], team: "França", year: 1998, rating: 86, attack: 48, defense: 89, creativity: 64, physical: 90, legacy: 82, rarity: "raro" },
      { id: "fra-1998-lizarazu", name: "Bixente Lizarazu", shortName: "Lizarazu", shirtNumber: 3, position: "LE", secondaryPositions: [], team: "França", year: 1998, rating: 84, attack: 72, defense: 84, creativity: 70, physical: 84, legacy: 78, rarity: "raro" },
      { id: "fra-1998-deschamps", name: "Didier Deschamps", shortName: "Deschamps", shirtNumber: 7, position: "VOL", secondaryPositions: ["MEI"], team: "França", year: 1998, rating: 84, attack: 56, defense: 84, creativity: 78, physical: 84, legacy: 82, rarity: "raro" },
      { id: "fra-1998-petit", name: "Emmanuel Petit", shortName: "Petit", shirtNumber: 17, position: "VOL", secondaryPositions: ["MEI"], team: "França", year: 1998, rating: 83, attack: 66, defense: 82, creativity: 78, physical: 86, legacy: 74, rarity: "raro" },
      { id: "fra-1998-zidane", name: "Zinédine Zidane", shortName: "Zidane", shirtNumber: 10, position: "MEI", secondaryPositions: ["PE"], team: "França", year: 1998, rating: 96, attack: 88, defense: 56, creativity: 99, physical: 84, legacy: 96, rarity: "lendário" },
      { id: "fra-1998-djorkaeff", name: "Youri Djorkaeff", shortName: "Djorkaeff", shirtNumber: 6, position: "MEI", secondaryPositions: ["CA", "PD"], team: "França", year: 1998, rating: 84, attack: 84, defense: 52, creativity: 86, physical: 78, legacy: 74, rarity: "raro" },
      { id: "fra-1998-henry", name: "Thierry Henry", shortName: "Henry", shirtNumber: 12, position: "PE", secondaryPositions: ["CA"], team: "França", year: 1998, rating: 85, attack: 88, defense: 44, creativity: 84, physical: 88, legacy: 88, rarity: "raro" },
      { id: "fra-1998-guivarch", name: "Stéphane Guivarc'h", shortName: "Guivarc'h", shirtNumber: 9, position: "CA", secondaryPositions: [], team: "França", year: 1998, rating: 76, attack: 78, defense: 38, creativity: 64, physical: 80, legacy: 50, rarity: "comum" },
      { id: "fra-1998-trezeguet", name: "David Trezeguet", shortName: "Trezeguet", shirtNumber: 20, position: "CA", secondaryPositions: [], team: "França", year: 1998, rating: 82, attack: 86, defense: 36, creativity: 72, physical: 82, legacy: 72, rarity: "raro" },
      { id: "fra-1998-dugarry", name: "Christophe Dugarry", shortName: "Dugarry", shirtNumber: 11, position: "PD", secondaryPositions: ["CA"], team: "França", year: 1998, rating: 78, attack: 78, defense: 46, creativity: 76, physical: 80, legacy: 58, rarity: "comum" },
    ],
  },

  // ---------------------------------------------------------- FRANÇA 2018
  {
    id: "fra-2018",
    team: "França",
    year: 2018,
    flag: "🇫🇷",
    players: [
      { id: "fra-2018-lloris", name: "Hugo Lloris", shortName: "Lloris", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "França", year: 2018, rating: 86, attack: 24, defense: 87, creativity: 60, physical: 82, legacy: 80, rarity: "raro" },
      { id: "fra-2018-pavard", name: "Benjamin Pavard", shortName: "Pavard", shirtNumber: 2, position: "LD", secondaryPositions: ["ZAG"], team: "França", year: 2018, rating: 82, attack: 66, defense: 84, creativity: 64, physical: 84, legacy: 70, rarity: "raro" },
      { id: "fra-2018-varane", name: "Raphaël Varane", shortName: "Varane", shirtNumber: 4, position: "ZAG", secondaryPositions: [], team: "França", year: 2018, rating: 87, attack: 50, defense: 89, creativity: 62, physical: 88, legacy: 80, rarity: "raro" },
      { id: "fra-2018-umtiti", name: "Samuel Umtiti", shortName: "Umtiti", shirtNumber: 5, position: "ZAG", secondaryPositions: [], team: "França", year: 2018, rating: 83, attack: 48, defense: 85, creativity: 60, physical: 86, legacy: 70, rarity: "raro" },
      { id: "fra-2018-hernandez", name: "Lucas Hernández", shortName: "L. Hernández", shirtNumber: 21, position: "LE", secondaryPositions: ["ZAG"], team: "França", year: 2018, rating: 82, attack: 64, defense: 84, creativity: 60, physical: 86, legacy: 70, rarity: "raro" },
      { id: "fra-2018-kante", name: "N'Golo Kanté", shortName: "Kanté", shirtNumber: 13, position: "VOL", secondaryPositions: ["MEI"], team: "França", year: 2018, rating: 88, attack: 64, defense: 90, creativity: 78, physical: 90, legacy: 84, rarity: "épico" },
      { id: "fra-2018-pogba", name: "Paul Pogba", shortName: "Pogba", shirtNumber: 6, position: "VOL", secondaryPositions: ["MEI"], team: "França", year: 2018, rating: 87, attack: 80, defense: 78, creativity: 88, physical: 90, legacy: 80, rarity: "raro" },
      { id: "fra-2018-matuidi", name: "Blaise Matuidi", shortName: "Matuidi", shirtNumber: 14, position: "MEI", secondaryPositions: ["VOL", "PE"], team: "França", year: 2018, rating: 81, attack: 68, defense: 78, creativity: 74, physical: 86, legacy: 70, rarity: "raro" },
      { id: "fra-2018-griezmann", name: "Antoine Griezmann", shortName: "Griezmann", shirtNumber: 7, position: "MEI", secondaryPositions: ["CA", "PE"], team: "França", year: 2018, rating: 89, attack: 88, defense: 58, creativity: 90, physical: 80, legacy: 84, rarity: "épico" },
      { id: "fra-2018-mbappe", name: "Kylian Mbappé", shortName: "Mbappé", shirtNumber: 10, position: "PD", secondaryPositions: ["CA", "PE"], team: "França", year: 2018, rating: 91, attack: 94, defense: 46, creativity: 86, physical: 92, legacy: 88, rarity: "épico" },
      { id: "fra-2018-giroud", name: "Olivier Giroud", shortName: "Giroud", shirtNumber: 9, position: "CA", secondaryPositions: [], team: "França", year: 2018, rating: 82, attack: 84, defense: 44, creativity: 74, physical: 88, legacy: 74, rarity: "raro" },
      { id: "fra-2018-dembele", name: "Ousmane Dembélé", shortName: "Dembélé", shirtNumber: 11, position: "PE", secondaryPositions: ["PD"], team: "França", year: 2018, rating: 82, attack: 84, defense: 44, creativity: 84, physical: 80, legacy: 68, rarity: "raro" },
      { id: "fra-2018-tolisso", name: "Corentin Tolisso", shortName: "Tolisso", shirtNumber: 12, position: "VOL", secondaryPositions: ["MEI"], team: "França", year: 2018, rating: 79, attack: 66, defense: 76, creativity: 74, physical: 82, legacy: 62, rarity: "comum" },
    ],
  },

  // ---------------------------------------------------------- ESPANHA 2010
  {
    id: "esp-2010",
    team: "Espanha",
    year: 2010,
    flag: "🇪🇸",
    players: [
      { id: "esp-2010-casillas", name: "Iker Casillas", shortName: "Casillas", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "Espanha", year: 2010, rating: 90, attack: 26, defense: 91, creativity: 64, physical: 84, legacy: 90, rarity: "épico" },
      { id: "esp-2010-ramos", name: "Sergio Ramos", shortName: "Ramos", shirtNumber: 15, position: "LD", secondaryPositions: ["ZAG"], team: "Espanha", year: 2010, rating: 87, attack: 70, defense: 88, creativity: 68, physical: 88, legacy: 86, rarity: "raro" },
      { id: "esp-2010-pique", name: "Gerard Piqué", shortName: "Piqué", shirtNumber: 3, position: "ZAG", secondaryPositions: [], team: "Espanha", year: 2010, rating: 87, attack: 54, defense: 89, creativity: 72, physical: 86, legacy: 84, rarity: "raro" },
      { id: "esp-2010-puyol", name: "Carles Puyol", shortName: "Puyol", shirtNumber: 5, position: "ZAG", secondaryPositions: ["LD"], team: "Espanha", year: 2010, rating: 86, attack: 50, defense: 89, creativity: 60, physical: 90, legacy: 86, rarity: "raro" },
      { id: "esp-2010-capdevila", name: "Joan Capdevila", shortName: "Capdevila", shirtNumber: 11, position: "LE", secondaryPositions: [], team: "Espanha", year: 2010, rating: 80, attack: 64, defense: 81, creativity: 64, physical: 82, legacy: 66, rarity: "comum" },
      { id: "esp-2010-busquets", name: "Sergio Busquets", shortName: "Busquets", shirtNumber: 16, position: "VOL", secondaryPositions: ["ZAG"], team: "Espanha", year: 2010, rating: 86, attack: 56, defense: 86, creativity: 84, physical: 82, legacy: 82, rarity: "raro" },
      { id: "esp-2010-alonso", name: "Xabi Alonso", shortName: "X. Alonso", shirtNumber: 14, position: "VOL", secondaryPositions: ["MEI"], team: "Espanha", year: 2010, rating: 86, attack: 66, defense: 80, creativity: 88, physical: 82, legacy: 82, rarity: "raro" },
      { id: "esp-2010-xavi", name: "Xavi Hernández", shortName: "Xavi", shirtNumber: 8, position: "MEI", secondaryPositions: ["VOL"], team: "Espanha", year: 2010, rating: 92, attack: 78, defense: 64, creativity: 97, physical: 76, legacy: 92, rarity: "épico" },
      { id: "esp-2010-iniesta", name: "Andrés Iniesta", shortName: "Iniesta", shirtNumber: 6, position: "MEI", secondaryPositions: ["PE"], team: "Espanha", year: 2010, rating: 92, attack: 82, defense: 60, creativity: 97, physical: 76, legacy: 94, rarity: "épico" },
      { id: "esp-2010-villa", name: "David Villa", shortName: "Villa", shirtNumber: 7, position: "CA", secondaryPositions: ["PE"], team: "Espanha", year: 2010, rating: 88, attack: 91, defense: 42, creativity: 82, physical: 80, legacy: 84, rarity: "raro" },
      { id: "esp-2010-torres", name: "Fernando Torres", shortName: "Torres", shirtNumber: 9, position: "CA", secondaryPositions: [], team: "Espanha", year: 2010, rating: 84, attack: 88, defense: 38, creativity: 76, physical: 84, legacy: 78, rarity: "raro" },
      { id: "esp-2010-pedro", name: "Pedro Rodríguez", shortName: "Pedro", shirtNumber: 18, position: "PD", secondaryPositions: ["PE", "CA"], team: "Espanha", year: 2010, rating: 82, attack: 82, defense: 50, creativity: 80, physical: 80, legacy: 70, rarity: "raro" },
      { id: "esp-2010-silva", name: "David Silva", shortName: "Silva", shirtNumber: 21, position: "MEI", secondaryPositions: ["PE", "PD"], team: "Espanha", year: 2010, rating: 87, attack: 82, defense: 52, creativity: 92, physical: 72, legacy: 82, rarity: "raro" },
      { id: "esp-2010-arbeloa", name: "Álvaro Arbeloa", shortName: "Arbeloa", shirtNumber: 17, position: "LD", secondaryPositions: ["LE"], team: "Espanha", year: 2010, rating: 78, attack: 58, defense: 80, creativity: 58, physical: 82, legacy: 60, rarity: "comum" },
    ],
  },

  // ---------------------------------------------------------- ITÁLIA 2006
  {
    id: "ita-2006",
    team: "Itália",
    year: 2006,
    flag: "🇮🇹",
    players: [
      { id: "ita-2006-buffon", name: "Gianluigi Buffon", shortName: "Buffon", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "Itália", year: 2006, rating: 92, attack: 24, defense: 93, creativity: 62, physical: 86, legacy: 92, rarity: "épico" },
      { id: "ita-2006-zambrotta", name: "Gianluca Zambrotta", shortName: "Zambrotta", shirtNumber: 19, position: "LD", secondaryPositions: ["LE"], team: "Itália", year: 2006, rating: 84, attack: 70, defense: 85, creativity: 70, physical: 86, legacy: 76, rarity: "raro" },
      { id: "ita-2006-cannavaro", name: "Fabio Cannavaro", shortName: "Cannavaro", shirtNumber: 5, position: "ZAG", secondaryPositions: [], team: "Itália", year: 2006, rating: 90, attack: 48, defense: 93, creativity: 66, physical: 86, legacy: 90, rarity: "épico" },
      { id: "ita-2006-nesta", name: "Alessandro Nesta", shortName: "Nesta", shirtNumber: 13, position: "ZAG", secondaryPositions: [], team: "Itália", year: 2006, rating: 88, attack: 46, defense: 92, creativity: 64, physical: 86, legacy: 84, rarity: "raro" },
      { id: "ita-2006-grosso", name: "Fabio Grosso", shortName: "Grosso", shirtNumber: 3, position: "LE", secondaryPositions: [], team: "Itália", year: 2006, rating: 80, attack: 62, defense: 82, creativity: 64, physical: 84, legacy: 70, rarity: "comum" },
      { id: "ita-2006-pirlo", name: "Andrea Pirlo", shortName: "Pirlo", shirtNumber: 21, position: "VOL", secondaryPositions: ["MEI"], team: "Itália", year: 2006, rating: 89, attack: 72, defense: 70, creativity: 95, physical: 76, legacy: 88, rarity: "épico" },
      { id: "ita-2006-gattuso", name: "Gennaro Gattuso", shortName: "Gattuso", shirtNumber: 8, position: "VOL", secondaryPositions: [], team: "Itália", year: 2006, rating: 82, attack: 52, defense: 86, creativity: 64, physical: 90, legacy: 76, rarity: "raro" },
      { id: "ita-2006-totti", name: "Francesco Totti", shortName: "Totti", shirtNumber: 10, position: "MEI", secondaryPositions: ["CA"], team: "Itália", year: 2006, rating: 88, attack: 86, defense: 52, creativity: 92, physical: 82, legacy: 84, rarity: "raro" },
      { id: "ita-2006-perrotta", name: "Simone Perrotta", shortName: "Perrotta", shirtNumber: 20, position: "MEI", secondaryPositions: ["VOL"], team: "Itália", year: 2006, rating: 79, attack: 66, defense: 72, creativity: 74, physical: 82, legacy: 62, rarity: "comum" },
      { id: "ita-2006-totti2", name: "Mauro Camoranesi", shortName: "Camoranesi", shirtNumber: 16, position: "PD", secondaryPositions: ["MEI"], team: "Itália", year: 2006, rating: 80, attack: 78, defense: 56, creativity: 80, physical: 82, legacy: 64, rarity: "comum" },
      { id: "ita-2006-toni", name: "Luca Toni", shortName: "Toni", shirtNumber: 9, position: "CA", secondaryPositions: [], team: "Itália", year: 2006, rating: 83, attack: 86, defense: 44, creativity: 70, physical: 88, legacy: 72, rarity: "raro" },
      { id: "ita-2006-delpiero", name: "Alessandro Del Piero", shortName: "Del Piero", shirtNumber: 7, position: "CA", secondaryPositions: ["PE", "MEI"], team: "Itália", year: 2006, rating: 86, attack: 88, defense: 46, creativity: 88, physical: 78, legacy: 84, rarity: "raro" },
      { id: "ita-2006-gilardino", name: "Alberto Gilardino", shortName: "Gilardino", shirtNumber: 11, position: "PE", secondaryPositions: ["CA"], team: "Itália", year: 2006, rating: 79, attack: 82, defense: 40, creativity: 70, physical: 80, legacy: 60, rarity: "comum" },
      { id: "ita-2006-materazzi", name: "Marco Materazzi", shortName: "Materazzi", shirtNumber: 23, position: "ZAG", secondaryPositions: [], team: "Itália", year: 2006, rating: 81, attack: 50, defense: 85, creativity: 56, physical: 88, legacy: 70, rarity: "raro" },
    ],
  },

  // ---------------------------------------------------------- HOLANDA 1974
  {
    id: "ned-1974",
    team: "Holanda",
    year: 1974,
    flag: "🇳🇱",
    players: [
      { id: "ned-1974-jongbloed", name: "Jan Jongbloed", shortName: "Jongbloed", shirtNumber: 8, position: "GOL", secondaryPositions: [], team: "Holanda", year: 1974, rating: 78, attack: 30, defense: 79, creativity: 62, physical: 78, legacy: 60, rarity: "comum" },
      { id: "ned-1974-suurbier", name: "Wim Suurbier", shortName: "Suurbier", shirtNumber: 20, position: "LD", secondaryPositions: [], team: "Holanda", year: 1974, rating: 81, attack: 68, defense: 82, creativity: 68, physical: 84, legacy: 66, rarity: "raro" },
      { id: "ned-1974-haan", name: "Arie Haan", shortName: "Haan", shirtNumber: 3, position: "ZAG", secondaryPositions: ["VOL"], team: "Holanda", year: 1974, rating: 83, attack: 64, defense: 82, creativity: 80, physical: 82, legacy: 72, rarity: "raro" },
      { id: "ned-1974-rijsbergen", name: "Wim Rijsbergen", shortName: "Rijsbergen", shirtNumber: 12, position: "ZAG", secondaryPositions: [], team: "Holanda", year: 1974, rating: 79, attack: 44, defense: 82, creativity: 56, physical: 84, legacy: 60, rarity: "comum" },
      { id: "ned-1974-krol", name: "Ruud Krol", shortName: "Krol", shirtNumber: 12, position: "LE", secondaryPositions: ["ZAG"], team: "Holanda", year: 1974, rating: 85, attack: 70, defense: 86, creativity: 76, physical: 84, legacy: 80, rarity: "raro" },
      { id: "ned-1974-jansen", name: "Wim Jansen", shortName: "Jansen", shirtNumber: 6, position: "VOL", secondaryPositions: ["MEI"], team: "Holanda", year: 1974, rating: 81, attack: 60, defense: 82, creativity: 76, physical: 84, legacy: 66, rarity: "raro" },
      { id: "ned-1974-vanhanegem", name: "Wim van Hanegem", shortName: "van Hanegem", shirtNumber: 9, position: "MEI", secondaryPositions: ["VOL"], team: "Holanda", year: 1974, rating: 86, attack: 76, defense: 70, creativity: 90, physical: 82, legacy: 80, rarity: "raro" },
      { id: "ned-1974-neeskens", name: "Johan Neeskens", shortName: "Neeskens", shirtNumber: 13, position: "MEI", secondaryPositions: ["VOL"], team: "Holanda", year: 1974, rating: 88, attack: 82, defense: 78, creativity: 86, physical: 88, legacy: 84, rarity: "raro" },
      { id: "ned-1974-rep", name: "Johnny Rep", shortName: "Rep", shirtNumber: 16, position: "PD", secondaryPositions: ["CA"], team: "Holanda", year: 1974, rating: 83, attack: 84, defense: 50, creativity: 80, physical: 84, legacy: 72, rarity: "raro" },
      { id: "ned-1974-cruyff", name: "Johan Cruyff", shortName: "Cruyff", shirtNumber: 14, position: "CA", secondaryPositions: ["MEI", "PE"], team: "Holanda", year: 1974, rating: 97, attack: 95, defense: 50, creativity: 99, physical: 82, legacy: 99, rarity: "lendário" },
      { id: "ned-1974-vandekerkhof-r", name: "René van de Kerkhof", shortName: "R. Kerkhof", shirtNumber: 17, position: "PE", secondaryPositions: ["PD"], team: "Holanda", year: 1974, rating: 80, attack: 80, defense: 50, creativity: 78, physical: 82, legacy: 64, rarity: "comum" },
      { id: "ned-1974-vandekerkhof-w", name: "Willy van de Kerkhof", shortName: "W. Kerkhof", shirtNumber: 19, position: "VOL", secondaryPositions: ["MEI"], team: "Holanda", year: 1974, rating: 79, attack: 60, defense: 80, creativity: 70, physical: 84, legacy: 62, rarity: "comum" },
      { id: "ned-1974-keizer", name: "Piet Keizer", shortName: "Keizer", shirtNumber: 11, position: "PE", secondaryPositions: ["CA"], team: "Holanda", year: 1974, rating: 82, attack: 82, defense: 46, creativity: 84, physical: 78, legacy: 70, rarity: "raro" },
    ],
  },

  // ---------------------------------------------------------- PORTUGAL 2006
  {
    id: "por-2006",
    team: "Portugal",
    year: 2006,
    flag: "🇵🇹",
    players: [
      { id: "por-2006-ricardo", name: "Ricardo Pereira", shortName: "Ricardo", shirtNumber: 1, position: "GOL", secondaryPositions: [], team: "Portugal", year: 2006, rating: 82, attack: 22, defense: 83, creativity: 58, physical: 82, legacy: 70, rarity: "raro" },
      { id: "por-2006-miguel", name: "Miguel Monteiro", shortName: "Miguel", shirtNumber: 13, position: "LD", secondaryPositions: [], team: "Portugal", year: 2006, rating: 79, attack: 64, defense: 80, creativity: 62, physical: 82, legacy: 58, rarity: "comum" },
      { id: "por-2006-carvalho", name: "Ricardo Carvalho", shortName: "Carvalho", shirtNumber: 5, position: "ZAG", secondaryPositions: [], team: "Portugal", year: 2006, rating: 86, attack: 48, defense: 89, creativity: 64, physical: 84, legacy: 80, rarity: "raro" },
      { id: "por-2006-meira", name: "Fernando Meira", shortName: "Meira", shirtNumber: 4, position: "ZAG", secondaryPositions: [], team: "Portugal", year: 2006, rating: 79, attack: 42, defense: 82, creativity: 54, physical: 85, legacy: 60, rarity: "comum" },
      { id: "por-2006-valente", name: "Nuno Valente", shortName: "Valente", shirtNumber: 14, position: "LE", secondaryPositions: [], team: "Portugal", year: 2006, rating: 77, attack: 58, defense: 79, creativity: 60, physical: 80, legacy: 54, rarity: "comum" },
      { id: "por-2006-maniche", name: "Maniche", shortName: "Maniche", shirtNumber: 6, position: "VOL", secondaryPositions: ["MEI"], team: "Portugal", year: 2006, rating: 82, attack: 70, defense: 80, creativity: 80, physical: 84, legacy: 70, rarity: "raro" },
      { id: "por-2006-petit", name: "Petit", shortName: "Petit", shirtNumber: 18, position: "VOL", secondaryPositions: [], team: "Portugal", year: 2006, rating: 79, attack: 56, defense: 81, creativity: 68, physical: 84, legacy: 60, rarity: "comum" },
      { id: "por-2006-deco", name: "Deco", shortName: "Deco", shirtNumber: 20, position: "MEI", secondaryPositions: ["VOL"], team: "Portugal", year: 2006, rating: 86, attack: 78, defense: 64, creativity: 90, physical: 78, legacy: 80, rarity: "raro" },
      { id: "por-2006-figo", name: "Luís Figo", shortName: "Figo", shirtNumber: 7, position: "PD", secondaryPositions: ["MEI"], team: "Portugal", year: 2006, rating: 88, attack: 86, defense: 54, creativity: 92, physical: 82, legacy: 86, rarity: "raro" },
      { id: "por-2006-ronaldo", name: "Cristiano Ronaldo", shortName: "C. Ronaldo", shirtNumber: 17, position: "PE", secondaryPositions: ["CA", "PD"], team: "Portugal", year: 2006, rating: 88, attack: 90, defense: 44, creativity: 88, physical: 88, legacy: 90, rarity: "épico" },
      { id: "por-2006-pauleta", name: "Pauleta", shortName: "Pauleta", shirtNumber: 9, position: "CA", secondaryPositions: [], team: "Portugal", year: 2006, rating: 82, attack: 86, defense: 40, creativity: 72, physical: 82, legacy: 70, rarity: "raro" },
      { id: "por-2006-simao", name: "Simão Sabrosa", shortName: "Simão", shirtNumber: 11, position: "PE", secondaryPositions: ["PD"], team: "Portugal", year: 2006, rating: 81, attack: 82, defense: 50, creativity: 82, physical: 80, legacy: 66, rarity: "raro" },
      { id: "por-2006-costinha", name: "Costinha", shortName: "Costinha", shirtNumber: 8, position: "VOL", secondaryPositions: [], team: "Portugal", year: 2006, rating: 78, attack: 50, defense: 82, creativity: 64, physical: 84, legacy: 58, rarity: "comum" },
      { id: "por-2006-nuno-gomes", name: "Nuno Gomes", shortName: "N. Gomes", shirtNumber: 21, position: "CA", secondaryPositions: ["PE"], team: "Portugal", year: 2006, rating: 80, attack: 84, defense: 42, creativity: 74, physical: 80, legacy: 64, rarity: "comum" },
    ],
  },
];

// Lista achatada de todos os jogadores (útil para busca por id no compartilhamento)
export const allPlayers = squads.flatMap((s) => s.players);

export function findPlayerById(id: string) {
  return allPlayers.find((p) => p.id === id) ?? null;
}
