import { useGame } from "../../context/GameContext";
import Button from "../ui/Button";

const Level3Accessibility = () => {
  const { nextLevel, addScore } = useGame();

  const handlePass = () => {
    addScore(20);
    nextLevel();
  };
  const handleDecision = (quality: "best" | "ok" | "bad") => {
    let score = 0;

    if (quality === "best") score = 20;
    if (quality === "ok") score = 2;
    if (quality === "bad") score = 0;

    addScore(score);
    nextLevel();
  };

  return (
    <div>
      <h2>♿ Level 3 — Accessibility Audit</h2>

      <p>What's wrong with this submit button?</p>

      <div onClick={() => alert("Clicked!")}>
        Submit
      </div>

    
      <Button onClick={() => handleDecision("bad")}>
        Nothing is wrong with the button
      </Button>

      <Button onClick={() => handleDecision("best")}>
      Replace with semantic button + ARIA → Next
      </Button>

      <Button onClick={() => handleDecision("ok")}>
        Not clickable
      </Button>
    </div>
  );
};

export default Level3Accessibility;