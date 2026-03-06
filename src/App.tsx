import { useState } from "react";
import { GameProvider, useGame } from "./context/GameContext";

import Layout from "./components/layout/Layout";
import Landing from "./components/levels/Landing";

import Level1Bug from "./components/levels/Level1Bug";
import Level2Performance from "./components/levels/Level2Performance";
import Level3Accessibility from "./components/levels/Level3Accessibility";
import Level4Tradeoff from "./components/levels/Level4Tradeoff";
import FinalDeploy from "./components/levels/FinalDeploy";

const LevelRenderer = () => {
  const { currentLevel } = useGame();

  switch (currentLevel) {
    case 0:
      return <Level1Bug />;
    case 1:
      return <Level2Performance />;
    case 2:
      return <Level3Accessibility />;
    case 3:
      return <Level4Tradeoff />;
    case 4:
      return <FinalDeploy />;
    default:
      return <div>Game Complete 🎉</div>;
  }
};

function App() {
  const [started, setStarted] = useState(false);

  // Show landing screen first
  if (!started) {
    return <Landing onStart={() => setStarted(true)} />;
  }

  // Start the game
  return (
    <GameProvider>
      <Layout>
        <LevelRenderer />
      </Layout>
    </GameProvider>
  );
}

export default App;