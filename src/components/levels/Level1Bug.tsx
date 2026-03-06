import { useCallback } from "react";
import { useGame } from "../../context/GameContext";
import { useTimer } from "../../hooks/useTimer";
import MonacoCodeEditor from "../ui/ MonacoCodeEditor";
import Button from "../ui/Button";


const initialCode = `
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Count changed");
}, []);
`;

const Level1Bug = () => {
  const { nextLevel, addScore } = useGame();

  const handleExpire = useCallback(() => {
    nextLevel();
  }, [nextLevel]);

  const { timeLeft } = useTimer(60, handleExpire);

  const validateFix = (code: string) => {
    return code.includes("[count]");
  };

  const handleSuccess = () => {
    const baseScore = 40;
    const timeBonus = timeLeft;
    addScore(baseScore);
    nextLevel();
  };

  return (
    <div>
      <h2>🐛 Production Bug</h2>
      <p>Fix the useEffect dependency issue.</p>
      <p>⏱ Time Left: {timeLeft}s</p>

      <MonacoCodeEditor
        initialCode={initialCode}
        validate={validateFix}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default Level1Bug;

// import { useEffect, useState } from "react";
// import { useGame } from "../../context/GameContext";

// const Level1Bug = () => {
//   const { nextLevel, addScore } = useGame();
//   const [count, setCount] = useState(0);

//   // Intentional subtle bug
//   useEffect(() => {
//     console.log("Count changed");
//   }, []); // Missing dependency

//   const handleFix = () => {
//     addScore(20);
//     nextLevel();
//   };

//   return (
//     <div>
//       <h2>🐛 Level 1 — Production Bug</h2>
//       <p>
//         A state update isn’t triggering expected behavior. What's wrong with
//         this useEffect?
//       </p>

//       <button onClick={() => setCount((c) => c + 1)}>Increment</button>
//       <p>Count: {count}</p>

//       <button onClick={handleFix}>Fix Dependency → Next Level</button>
//     </div>
//   );
// };

// export default Level1Bug;