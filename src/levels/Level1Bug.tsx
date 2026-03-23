import { useCallback, useState } from "react";
import { useGame } from "../context/GameContext";
import { useTimer } from "../hooks/useTimer";
import MonacoCodeEditor from "../components/ui/MonacoCodeEditor";
import ScoreBar from "../components/ui/ScoreBar";
import Button from "../components/ui/Button";
import { validateAnswer } from "../api/validateAnswer";

const initialCode = `
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Count changed");
}, []);
`;

const Level1Bug = () => {
  const { nextLevel, addScore, score } = useGame();
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleExpire = useCallback(() => {
    nextLevel();
  }, [nextLevel]);

  const { timeLeft } = useTimer(60, handleExpire);

  const handleRun = async () => {
    try {
      setSubmitting(true);
      const result = await validateAnswer({
        challengeId: "level1",
        submission: code,
      });
      if (result.correct) {
        setError("");
        addScore(result.points);
        nextLevel();
      } else {
        setError("Not fixed yet. Check your dependency array.");
      }
    } catch {
      setError("Could not validate answer. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="level-container">
      <ScoreBar score={score} maxScore={100} />

      <h2 className="level-title">Production Bug</h2>
      <p className="level-description">
        Fix the useEffect dependency issue only.
      </p>
      <p className="level-description">⏱ Time Left: {timeLeft}s</p>

      <MonacoCodeEditor initialCode={initialCode} onCodeChange={setCode} />

      <div className="editor-actions">
        <Button onClick={() => void handleRun()}>
          {submitting ? "Checking..." : "Next"}
        </Button>
      </div>

      {error && <p className="editor-error">{error}</p>}
    </div>
  );
};

export default Level1Bug;
