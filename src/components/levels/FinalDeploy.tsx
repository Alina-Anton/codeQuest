import { useGame } from "../../context/GameContext";

const FinalDeploy = () => {
  const { score, resetGame } = useGame();

  return (
    <div>
      <h2>🚀 Deployment Complete</h2>
      <p>Final Score: {score} / 100</p>
      <button onClick={resetGame}>Restart Simulation</button>
    </div>
  );
};

export default FinalDeploy;