import { useCallback, useState } from "react";
import { useGame } from "../context/GameContext";
import { useTimer } from "../hooks/useTimer";
import MonacoCodeEditor from "../components/ui/MonacoCodeEditor";
import ScoreBar from "../components/ui/ScoreBar";
import Button from "../components/ui/Button";

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

  const handleExpire = useCallback(() => {
    nextLevel();
  }, [nextLevel]);

  const { timeLeft } = useTimer(60, handleExpire);

  const validateFix = (code: string) => {
    return code.includes("[count]");
  };

  const handleRun = () => {
    if (validateFix(code)) {
      setError("");
      addScore(30);
      nextLevel();
    } else {
      setError("❌ Not fixed. Check your dependency array.");
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
        <Button onClick={handleRun}>Next</Button>
      </div>

      {error && <p className="editor-error">{error}</p>}
    </div>
  );
};

export default Level1Bug;
