import { useState } from "react";
import { useGame } from "../context/GameContext";
import Button from "../components/ui/Button";
import ScoreBar from "../components/ui/ScoreBar";
import { validateAnswer } from "../api/validateAnswer";

const Level3Accessibility = () => {
  const { nextLevel, addScore, score } = useGame();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleDecision = async (optionId: "a" | "b" | "c") => {
    if (submitting) return;
    try {
      setSubmitting(true);
      setError("");
      const result = await validateAnswer({
        challengeId: "level3",
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
      <h2 className="level-title">Accessibility Audit</h2>

      <p className="level-description">What's wrong with this submit button?</p>

      <button className="fake-submit">Submit</button>
      <div className="button-group">
        <Button onClick={() => void handleDecision("a")}>
          Button looks good to me{" "}
        </Button>

        <Button onClick={() => void handleDecision("b")}>Low-contrast text </Button>

        <Button onClick={() => void handleDecision("c")}>
          Faulty layout styles{" "}
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

export default Level3Accessibility;
