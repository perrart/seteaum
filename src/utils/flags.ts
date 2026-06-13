import { squads } from "../data/mockData";

const FLAG_FALLBACK = "🏳️";

/** Retorna o emoji de bandeira de uma seleção/ano (ou de qualquer ano da seleção) */
export function findSquadFlag(team: string, year?: number): string {
  if (year !== undefined) {
    const exact = squads.find((s) => s.team === team && s.year === year);
    if (exact) return exact.flag;
  }
  const byTeam = squads.find((s) => s.team === team);
  return byTeam?.flag ?? FLAG_FALLBACK;
}
