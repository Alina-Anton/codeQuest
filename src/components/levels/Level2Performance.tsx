import { useGame } from "../../context/GameContext";
import { useTimer } from "../../hooks/useTimer";
import { useCallback } from "react";
import Button from "../ui/Button";


const Level2Performance = () => {
  const { nextLevel, addScore } = useGame();

  const handleDecision = (quality: "best" | "ok" | "bad") => {
    let score = 0;

    if (quality === "best") score = 20;
    if (quality === "ok") score = 15;
    if (quality === "bad") score = 5;

    addScore(score);
    nextLevel();
  };

  return (
    <div>
      <h2>⚡ Performance Crisis</h2>

      <Button onClick={() => handleDecision("bad")}>
        Add useMemo everywhere
      </Button>

      <Button onClick={() => handleDecision("best")}>
        Implement lazy loading + code splitting
      </Button>

      <Button  onClick={() => handleDecision("ok")}>
        Memoize heavy computed values
      </Button>
    </div>
  );
};

export default Level2Performance;