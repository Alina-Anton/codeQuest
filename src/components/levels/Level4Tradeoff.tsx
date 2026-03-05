import { useGame } from "../../context/GameContext";

const Level4Tradeoff = () => {
  const { nextLevel, addScore } = useGame();

  const handleDecision = () => {
    addScore(20);
    nextLevel();
  };

  return (
    <div>
      <h2>🧠 Level 4 — Product Tradeoff</h2>
      <p>
        Marketing wants heavy animations. Deadline is tomorrow. What do you do?
      </p>

      <button onClick={handleDecision}>
        Suggest lightweight CSS transitions + phased rollout
      </button>
    </div>
  );
};

export default Level4Tradeoff;