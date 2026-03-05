import { useEffect, useState } from "react";
import { useGame } from "../../context/GameContext";

const Level1Bug = () => {
  const { nextLevel, addScore } = useGame();
  const [count, setCount] = useState(0);

  // Intentional subtle bug
  useEffect(() => {
    console.log("Count changed");
  }, []); // Missing dependency

  const handleFix = () => {
    addScore(20);
    nextLevel();
  };

  return (
    <div>
      <h2>🐛 Level 1 — Production Bug</h2>
      <p>
        A state update isn’t triggering expected behavior. What's wrong with
        this useEffect?
      </p>

      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <p>Count: {count}</p>

      <button onClick={handleFix}>Fix Dependency → Next Level</button>
    </div>
  );
};

export default Level1Bug;