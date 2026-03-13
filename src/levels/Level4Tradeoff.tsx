import { useGame } from "../context/GameContext";
import Button from "../components/ui/Button";
import ScoreBar from "../components/ui/ScoreBar";

const Level4Tradeoff = () => {
  const { nextLevel, addScore, score } = useGame();

  const handleDecision = (quality: "best" | "ok" | "bad") => {
    let score = 0;

    if (quality === "best") score = 20;
    if (quality === "bad") score = 0;

    addScore(score);
    nextLevel();
  };

  return (
    <div className="level-container">
      <ScoreBar score={score} maxScore={100} />
      <h2 className="level-title">Product Desigion</h2>
      <p className="level-description">
        Marketing wants heavy animations. Deadline is tomorrow. What do you do?
      </p>
      <div className="button-group">
        <Button onClick={() => handleDecision("bad")}>
          Do it overnight and hope nothing breaks{" "}
        </Button>
        <Button onClick={() => handleDecision("best")}>
          Suggest lightweight CSS transitions + phased rollout
        </Button>
      </div>
    </div>
  );
};

export default Level4Tradeoff;
