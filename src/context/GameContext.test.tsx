import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameProvider, useGame } from "./GameContext";

const ContextHarness = () => {
  const { currentLevel, score, addScore, nextLevel, resetGame } = useGame();
  return (
    <div>
      <p>level:{currentLevel}</p>
      <p>score:{score}</p>
      <button onClick={() => addScore(10)}>add</button>
      <button onClick={nextLevel}>next</button>
      <button onClick={resetGame}>reset</button>
    </div>
  );
};

describe("GameContext", () => {
  it("throws when useGame is used outside provider", () => {
    const NoProvider = () => {
      useGame();
      return null;
    };
    expect(() => render(<NoProvider />)).toThrow(
      "useGame must be used within GameProvider",
    );
  });

  it("updates score, advances levels, and resets state", async () => {
    const user = userEvent.setup();
    render(
      <GameProvider>
        <ContextHarness />
      </GameProvider>,
    );

    expect(screen.getByText("level:0")).toBeInTheDocument();
    expect(screen.getByText("score:0")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "add" }));
    expect(screen.getByText("score:10")).toBeInTheDocument();

    for (let i = 0; i < 10; i += 1) {
      await user.click(screen.getByRole("button", { name: "next" }));
    }
    expect(screen.getByText("level:5")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "reset" }));
    expect(screen.getByText("level:0")).toBeInTheDocument();
    expect(screen.getByText("score:0")).toBeInTheDocument();
  });
});
