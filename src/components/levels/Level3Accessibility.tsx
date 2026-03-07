import { useGame } from "../../context/GameContext";
import Button from "../ui/Button";
import ScoreBar from "../ui/ScoreBar";

const Level3Accessibility = () => {
  const { nextLevel, addScore } = useGame();
  const { score } = useGame();

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
    <div className="level-container">
      <ScoreBar score={score} maxScore={100} />
      <h2 className="level-title">Accessibility Audit</h2>

      <p className="level-description">What's wrong with this submit button?</p>

      <button className="fake-submit" >
  Submit
</button>
      <div className="button-group">

    
      <Button onClick={() => handleDecision("bad")}>
      Button looks good to me      </Button>

      <Button onClick={() => handleDecision("ok")}>
Low-contrast text      </Button>

<Button onClick={() => handleDecision("best")}>
      Faulty layout styles      </Button>

     
    </div>
    </div>
  );
};

export default Level3Accessibility;