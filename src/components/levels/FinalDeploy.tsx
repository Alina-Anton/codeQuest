import { useGame } from "../../context/GameContext";
import Button from "../ui/Button";
import styles from "../styles/finalDeploy.module.css";

const FinalDeploy = () => {
  const { score, resetGame } = useGame();
  const isPerfect = score === 100;
  return (
    <div className={styles.container}>
      {isPerfect && (
        <>
      <h2 className={styles.title}>Deployment Complete</h2>
        <div className={styles.congratsOverlay}>
          <div className={styles.congratsText}> Congratulations!</div>
        </div>
        </>
      )}
      <p className={styles.description}>Final Score: {score} / 100</p>
      {!isPerfect && <Button onClick={resetGame}>Restart Simulation</Button>}
    </div>
  );
};

export default FinalDeploy;