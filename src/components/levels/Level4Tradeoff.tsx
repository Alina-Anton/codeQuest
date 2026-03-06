import { useGame } from "../../context/GameContext";
import Button from "../ui/Button";
import ScoreBar from "../ui/ScoreBar";

const Level4Tradeoff = () => {
  const { nextLevel, addScore, score } = useGame();

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
    <div className="level-container">
      <ScoreBar score={score} maxScore={100} />
      <h2 className="level-title">Product Tradeoff</h2>
      <p className="level-description">
        Marketing wants heavy animations. Deadline is tomorrow. What do you do?
      </p>
    <div className="button-group">
      <Button onClick={() => handleDecision("bad")}>
        Nothing I can do here
      </Button>
      <Button onClick={() => handleDecision("best")}>
      Suggest lightweight CSS transitions + phased rollout
      </Button>
    </div>
    </div>
  );
};

export default Level4Tradeoff;