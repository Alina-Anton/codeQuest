import { useEffect, useState } from "react";
import "../../styles/scoreBar.css";

type Props = {
  score: number;
  maxScore?: number;
};

const ScoreBar = ({ score, maxScore = 100 }: Props) => {
  const [displayScore, setDisplayScore] = useState(0);
  const fillPercentage = (displayScore / maxScore) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev >= score) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, [score]);

  return (
    <div className="score-bar-container">
      <div className="score-text">{displayScore} / {maxScore}</div>
      <div className="score-bar-background">
        <div
          className="score-bar-fill"
          style={{ width: `${fillPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;