import { useGame } from "../../context/GameContext";
import Button from "../ui/Button";
import "../styles/levels.css";
import ScoreBar from "../ui/ScoreBar";

const Level2Performance = () => {
  const { nextLevel, addScore } = useGame();
  const { score } = useGame();

  const handleDecision = (quality: "best" | "ok" | "bad") => {
    let score = 0;

    if (quality === "best") score = 30;
    if (quality === "ok") score = 15;
    if (quality === "bad") score = 5;

    addScore(score);
    nextLevel();
  };

return (
  <div className="level-container">
       <ScoreBar score={score} maxScore={100} />
    <h2 className="level-title">Performance Crisis</h2>
<p className="level-description">What's wrong with this submit button?</p>

    <div className="button-group">
      <Button onClick={() => handleDecision("bad")}>
        Add useMemo everywhere
      </Button>

      <Button onClick={() => handleDecision("best")}>
        Implement lazy loading + code splitting
      </Button>

      <Button onClick={() => handleDecision("ok")}>
        Memoize heavy computed values
      </Button>
    </div>
  </div>
);
};
 export default Level2Performance;