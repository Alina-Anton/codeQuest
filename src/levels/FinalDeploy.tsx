import { useGame } from "../context/GameContext";
import Button from "../components/ui/Button";
import styles from "../styles/finalDeploy.module.css";
import { generateAIReview } from "../utils/generateAIReview";

const FinalDeploy = () => {
  const { score, resetGame } = useGame();
  const isPerfect = score === 100;
  const review = generateAIReview(score);

  return (
    <div className={styles.container}>
      {isPerfect ? (
        <>
          <h2 className={styles.title}>Deployment Complete</h2>
          <div className={styles.congratsOverlay}>
            <div className={styles.congratsText}> Congratulations!</div>
          </div>
          <p className={styles.description}>Final Score: {score} / 100</p>
          <div className={styles.reviewBox}>
            <h3>AI Engineering Review</h3>

            <div className={styles.section}>
              <h4>Strengths:</h4>
              <ul>
                {review.strengths.map((item, i) => (
                  <li key={i}>✔ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.titleBlock}>
            <h2 className={styles.title}>Deployment Complete</h2>
            <div className={styles.congratsOverlay}>
              <div className={styles.lowerScoreText}> Bugs are out!</div>
            </div>
            <p className={styles.description}>Final Score: {score} / 100</p>
          </div>
          <div className={styles.reviewBox}>
            <h3>AI Engineering Review</h3>
            <div className={styles.section}>
              <h4>Strengths:</h4>
              <ul>
                {review.strengths.map((item, i) => (
                  <li key={i}>✔ {item}</li>
                ))}
              </ul>
            </div>
            <div className={styles.section}>
              <h4>Areas to Improve:</h4>
              <ul>
                {review.improvements.map((item, i) => (
                  <li key={i}>⚠ {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <Button onClick={resetGame}>Restart Simulation</Button>
        </>
      )}
    </div>
  );
};

export default FinalDeploy;
