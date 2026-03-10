import { useGame } from "../context/GameContext";
import Button from "../components/ui/Button";
import "../styles/levels.css";
import ScoreBar from "../components/ui/ScoreBar";

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
    <h2 className="level-title">Performance Optimization</h2>
<p className="level-description">Fix slow react page due to heavy calculations and large components.</p>


    <div className="button-group">
      <Button onClick={() => handleDecision("bad")}>
        Add useMemo everywhere
      </Button>

      <Button onClick={() => handleDecision("best")}>
      Memoize heavy computed values
      </Button>

      <Button onClick={() => handleDecision("ok")}>
      Implement lazy loading + code splitting      </Button>
    </div>
  </div>
);
};
 export default Level2Performance;