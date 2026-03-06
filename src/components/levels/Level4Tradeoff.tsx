import { useGame } from "../../context/GameContext";
import Button from "../ui/Button";

const Level4Tradeoff = () => {
  const { nextLevel, addScore } = useGame();

  // const handleDecision = () => {
  //   addScore(20);
  //   nextLevel();
  // };

  const handleDecision = (quality: "best" | "ok" | "bad") => {
    let score = 0;

    if (quality === "best") score = 20;
    if (quality === "bad") score = 0;

    addScore(score);
    nextLevel();
  };
  
  const handleSuccess = () => {
    const baseScore = 30;
    addScore(baseScore);
    nextLevel();
  };

  return (
    <div>
      <h2>🧠 Level 4 — Product Tradeoff</h2>
      <p>
        Marketing wants heavy animations. Deadline is tomorrow. What do you do?
      </p>

      {/* <button onClick={handleDecision}>
        Suggest lightweight CSS transitions + phased rollout
      </button> */}

      <Button onClick={() => handleDecision("bad")}>
        Nothing I can do here
      </Button>

      <Button onClick={() => handleDecision("best")}>
      Suggest lightweight CSS transitions + phased rollout
      </Button>
    </div>
  );
};

export default Level4Tradeoff;