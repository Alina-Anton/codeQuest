import { useGame } from "../../context/GameContext";
import { useTimer } from "../../hooks/useTimer";
import { useCallback } from "react";

const Level2Performance = () => {
  const { nextLevel, addScore } = useGame();

  const handleExpire = useCallback(() => {
    nextLevel();
  }, [nextLevel]);

  const { timeLeft } = useTimer(45, handleExpire);

  const handleDecision = (quality: "best" | "ok" | "bad") => {
    let score = 0;

    if (quality === "best") score = 30 + timeLeft;
    if (quality === "ok") score = 15;
    if (quality === "bad") score = 5;

    addScore(score);
    nextLevel();
  };

  return (
    <div>
      <h2>⚡ Performance Crisis</h2>
      <p>⏱ {timeLeft}s remaining</p>

      <button onClick={() => handleDecision("bad")}>
        Add useMemo everywhere
      </button>

      <button onClick={() => handleDecision("best")}>
        Implement lazy loading + code splitting
      </button>

      <button onClick={() => handleDecision("ok")}>
        Memoize heavy computed values
      </button>
    </div>
  );
};

export default Level2Performance;