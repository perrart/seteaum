import { useEffect, useState } from "react";
import type { Screen, FormationKey, LineupSlot, CupResult } from "./types";
import { simulateCup, parseSharedLineup } from "./utils/gameLogic";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import FormationPicker from "./components/FormationPicker";
import GamePage from "./components/GamePage";
import CupSimulation from "./components/CupSimulation";
import ShareCard from "./components/ShareCard";
import FieldView from "./components/FieldView";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [formationKey, setFormationKey] = useState<FormationKey>("4-3-3");
  const [lineup, setLineup] = useState<LineupSlot[] | null>(null);
  const [cup, setCup] = useState<CupResult | null>(null);

  // Time compartilhado via ?f=...&team=...
  useEffect(() => {
    const shared = parseSharedLineup(window.location.search);
    if (shared) {
      setLineup(shared.lineup);
      setFormationKey(shared.formationKey);
      setScreen("shared");
    }
  }, []);

  function clearQuery() {
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  function goHome() {
    clearQuery();
    setScreen("home");
    setLineup(null);
    setCup(null);
  }

  function startFlow() {
    clearQuery();
    setLineup(null);
    setCup(null);
    setScreen("formation");
  }

  function confirmFormation(key: FormationKey) {
    setFormationKey(key);
    setScreen("game");
  }

  function handleSimulate(finalLineup: LineupSlot[]) {
    setLineup(finalLineup);
    setCup(simulateCup(finalLineup));
    setScreen("simulation");
  }

  function replaySimulation() {
    if (lineup) setCup(simulateCup(lineup));
  }

  return (
    <div className="min-h-full">
      <Header onHome={goHome} />

      {screen === "home" && <HomePage onPlay={startFlow} />}

      {screen === "formation" && (
        <FormationPicker onConfirm={confirmFormation} onBack={goHome} />
      )}

      {screen === "game" && (
        <GamePage
          formationKey={formationKey}
          onHome={goHome}
          onSimulate={handleSimulate}
        />
      )}

      {screen === "simulation" && cup && (
        <CupSimulation
          cup={cup}
          onReplay={replaySimulation}
          onSeeCard={() => setScreen("card")}
          onHome={goHome}
        />
      )}

      {screen === "card" && cup && lineup && (
        <ShareCard
          lineup={lineup}
          cup={cup}
          formationKey={formationKey}
          onPlayAgain={startFlow}
          onHome={goHome}
        />
      )}

      {screen === "shared" && lineup && (
        <div className="mx-auto max-w-md px-4 py-8 text-center animate-fade-up">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Seleção compartilhada · {formationKey}
          </p>
          <h2 className="mb-5 mt-1 font-head text-2xl font-extrabold tracking-tight text-ink">
            O Brasil dos sonhos de um amigo
          </h2>
          <FieldView lineup={lineup} />
          <button
            onClick={startFlow}
            className="mt-6 w-full rounded-xl bg-scarlet px-6 py-4 font-head text-lg font-extrabold uppercase tracking-wide text-white shadow-card transition hover:bg-scarlet-dark active:scale-[0.99]"
          >
            Montar a minha
          </button>
        </div>
      )}
    </div>
  );
}
