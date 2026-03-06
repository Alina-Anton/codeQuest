import { useEffect, useState } from "react";
import "../styles/scoreBar.css";

type Props = {
  score: number;
  maxScore?: number;
};

const ScoreBar = ({ score, maxScore = 100 }: Props) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    let currentScore = displayScore;
    let currentPercentage = fillPercentage;
    const targetPercentage = (score / maxScore) * 100;

    const interval = setInterval(() => {
      if (currentScore < score) currentScore += 1;
      if (currentPercentage < targetPercentage) currentPercentage += (targetPercentage - currentPercentage) / 5;

      setDisplayScore(currentScore);
      setFillPercentage(currentPercentage);

      if (currentScore >= score && currentPercentage >= targetPercentage) {
        clearInterval(interval);
      }
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