import { useGame } from "../../context/GameContext";
import Button from "../ui/Button";

const FinalDeploy = () => {
  const { score, resetGame } = useGame();

  return (
    <div>
      <h2>🚀 Deployment Complete</h2>
      <p>Final Score: {score} / 100</p>
      <Button onClick={resetGame}>Restart Simulation</Button>
    </div>
  );
};

export default FinalDeploy;