import { useState } from "react";
import { useGame } from "../context/GameContext";
import Button from "../components/ui/Button";
import "../styles/levels.css";
import ScoreBar from "../components/ui/ScoreBar";
import { validateAnswer } from "../api/validateAnswer";

const Level2Performance = () => {
  const { nextLevel, addScore, score } = useGame();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDecision = async (optionId: "a" | "b" | "c") => {
    if (submitting) return;
    try {
      setSubmitting(true);
      setError("");
      const result = await validateAnswer({
        challengeId: "level2",
        submission: optionId,
      });
      addScore(result.points);
      nextLevel();
    } catch {
      setError("Could not validate answer. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="level-container">
      <ScoreBar score={score} maxScore={100} />
      <h2 className="level-title">Performance Optimization</h2>
      <p className="level-description">
        Fix slow react page due to heavy calculations and large components.
      </p>

      <div className="button-group">
        <Button onClick={() => void handleDecision("a")}>
          Add useMemo everywhere
        </Button>

        <Button onClick={() => void handleDecision("b")}>
          Memoize heavy computed values
        </Button>

        <Button onClick={() => void handleDecision("c")}>
          Implement lazy loading + code splitting{" "}
        </Button>
      </div>
      {submitting && (
        <p className="checking-indicator">
          Checking{" "}
          <span className="checking-dots" aria-hidden="true">
            <span className="checking-dot">.</span>
            <span className="checking-dot">.</span>
            <span className="checking-dot">.</span>
          </span>
        </p>
      )}
      {error && <p className="editor-error">{error}</p>}
    </div>
  );
};
export default Level2Performance;
