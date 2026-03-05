import { useGame } from "../../context/GameContext";

const Level3Accessibility = () => {
  const { nextLevel, addScore } = useGame();

  const handlePass = () => {
    addScore(20);
    nextLevel();
  };

  return (
    <div>
      <h2>♿ Level 3 — Accessibility Audit</h2>

      <p>What's wrong with this button?</p>

      <div onClick={() => alert("Clicked!")}>
        Submit
      </div>

      <button onClick={handlePass}>
        Replace with semantic button + ARIA → Next
      </button>
    </div>
  );
};

export default Level3Accessibility;