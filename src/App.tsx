import { useState } from "react";
import { GameProvider, useGame } from "./context/GameContext";

import Layout from "./components/layout/Layout";
import Landing from "./levels/Landing";

import Level1Bug from "./levels/Level1Bug";
import Level2Performance from "./levels/Level2Performance";
import Level3Accessibility from "./levels/Level3Accessibility";
import Level4Tradeoff from "./levels/Level4Tradeoff";
import FinalDeploy from "./levels/FinalDeploy";

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

  if (!started) {
    return <Landing onStart={() => setStarted(true)} />;
  }

  return (
    <GameProvider>
      <Layout>
        <LevelRenderer />
      </Layout>
    </GameProvider>
  );
}

export default App;