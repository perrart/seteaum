import { createEmptyLineup } from "../utils/gameLogic";
import { findPlayerById } from "../data/mockData";
import LineupField from "./LineupField";

// IDs na ordem do DRAFT_ORDER (GOL, LD, ZAG, ZAG, LE, VOL, MEI, MEI, PE, CA, PD)
const EXAMPLE_IDS = [
  "ita-2006-buffon",
  "bra-2002-cafu",
  "ger-1974-beckenbauer",
  "ita-2006-cannavaro",
  "bra-2002-roberto-carlos",
  "esp-2010-busquets",
  "fra-1998-zidane",
  "arg-2022-messi",
  "por-2006-ronaldo",
  "bra-2002-ronaldo",
  "bra-1970-jairzinho",
];

function buildExampleLineup() {
  const lineup = createEmptyLineup();
  EXAMPLE_IDS.forEach((id, i) => {
    lineup[i].player = findPlayerById(id);
  });
  return lineup;
}

export default function ExampleLineup() {
  const lineup = buildExampleLineup();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-turf-light">
            Escalação exemplo
          </span>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-chalk sm:text-4xl">
            Onze de outra dimensão
          </h2>
          <p className="mt-3 max-w-md text-chalk/60">
            Cada craque vem de uma seleção e de uma edição da Copa. No jogo, é
            você quem decide quem entra em cada posição — mas só pode escolher
            dentro do elenco que o dado entregar.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-chalk/70">
            <li className="flex items-center gap-2">
              <span className="text-flash">▸</span> 12 elencos lendários para
              sortear
            </li>
            <li className="flex items-center gap-2">
              <span className="text-flash">▸</span> Química sobe com jogadores da
              mesma seleção ou era
            </li>
            <li className="flex items-center gap-2">
              <span className="text-flash">▸</span> Apenas 3 rerolls por jogo —
              escolha com coragem
            </li>
          </ul>
        </div>
        <div className="order-1 lg:order-2">
          <LineupField lineup={lineup} />
        </div>
      </div>
    </section>
  );
}
