import { useEffect, useState } from "react";
import type { LineupSlot, Screen, SimulationResult } from "./types";
import { parseSharedLineup, simulateMatch } from "./utils/gameLogic";
import HomePage from "./components/HomePage";
import GamePage from "./components/GamePage";
import ResultPage from "./components/ResultPage";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [lineup, setLineup] = useState<LineupSlot[] | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);

  // Detecta ?team=... ao carregar e abre a tela de time compartilhado.
  useEffect(() => {
    const shared = parseSharedLineup(window.location.search);
    if (shared) {
      try {
        const simulated = simulateMatch(shared);
        setLineup(shared);
        setResult(simulated);
        setScreen("shared");
      } catch {
        // Link inválido: ignora e segue para a home.
      }
    }
  }, []);

  function goHome() {
    // Limpa a query string para não reabrir o time compartilhado.
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setScreen("home");
  }

  function startGame() {
    if (window.location.search) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setLineup(null);
    setResult(null);
    setScreen("game");
  }

  function finishGame(finalLineup: LineupSlot[], finalResult: SimulationResult) {
    setLineup(finalLineup);
    setResult(finalResult);
    setScreen("result");
    window.scrollTo({ top: 0 });
  }

  if (screen === "game") {
    return <GamePage onHome={goHome} onFinish={finishGame} />;
  }

  if ((screen === "result" || screen === "shared") && lineup && result) {
    return (
      <ResultPage
        lineup={lineup}
        result={result}
        shared={screen === "shared"}
        onPlayAgain={startGame}
        onHome={goHome}
      />
    );
  }

  return <HomePage onPlay={startGame} />;
}
