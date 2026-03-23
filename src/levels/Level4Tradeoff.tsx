import { useState } from "react";
import { useGame } from "../context/GameContext";
import Button from "../components/ui/Button";
import ScoreBar from "../components/ui/ScoreBar";
import { validateAnswer } from "../api/validateAnswer";

const Level4Tradeoff = () => {
  const { nextLevel, addScore, score } = useGame();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDecision = async (optionId: "a" | "b") => {
    if (submitting) return;
    try {
      setSubmitting(true);
      setError("");
      const result = await validateAnswer({
        challengeId: "level4",
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
      <h2 className="level-title">Product Decision</h2>
      <p className="level-description">
        Marketing wants heavy animations. Deadline is tomorrow. What do you do?
      </p>
      <div className="button-group">
        <Button onClick={() => void handleDecision("a")}>
          Do it overnight and hope nothing breaks{" "}
        </Button>
        <Button onClick={() => void handleDecision("b")}>
          Suggest lightweight CSS transitions + phased rollout
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

export default Level4Tradeoff;
