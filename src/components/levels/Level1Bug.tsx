import { useCallback } from "react";
import { useGame } from "../../context/GameContext";
import { useTimer } from "../../hooks/useTimer";
import MonacoCodeEditor from "../ui/ MonacoCodeEditor";
import ScoreBar from "../ui/ScoreBar";


const initialCode = `
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Count changed");
}, []);
`;

const Level1Bug = () => {
  const { nextLevel, addScore } = useGame();
const { score } = useGame();
  const handleExpire = useCallback(() => {
    nextLevel();
  }, [nextLevel]);

  const { timeLeft } = useTimer(60, handleExpire);

  const validateFix = (code: string) => {
    return code.includes("[count]");
  };

  const handleSuccess = () => {
    const baseScore = 30;
    addScore(baseScore);
    nextLevel();
  };

  return (
    <div className="level-container">
       <ScoreBar score={score} maxScore={100} />

      <h2 className="level-title">Production Bug</h2>
      <p className="level-description">Fix the useEffect dependency issue only.</p>
      <p className="level-description">⏱ Time Left: {timeLeft}s</p>

      <MonacoCodeEditor
        initialCode={initialCode}
        validate={validateFix}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Level1Bug;

