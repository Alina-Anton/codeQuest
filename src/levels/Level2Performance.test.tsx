import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameProvider, useGame } from "../context/GameContext";
import Level2Performance from "./Level2Performance";
import { validateAnswer } from "../api/validateAnswer";

jest.mock("../api/validateAnswer", () => ({
  validateAnswer: jest.fn(),
}));

jest.mock("../components/ui/ScoreBar", () => () => <div>scorebar</div>);

const mockedValidateAnswer = validateAnswer as jest.MockedFunction<
  typeof validateAnswer
>;

const Harness = () => {
  const { currentLevel, score } = useGame();
  return (
    <div>
      <p data-testid="state">{`level-${currentLevel}-score-${score}`}</p>
      <Level2Performance />
    </div>
  );
};

describe("Level2Performance", () => {
  beforeEach(() => {
    mockedValidateAnswer.mockReset();
  });

  it("submits selected answer and advances level with points", async () => {
    mockedValidateAnswer.mockResolvedValue({ correct: true, points: 30 });
    const user = userEvent.setup();

    render(
      <GameProvider>
        <Harness />
      </GameProvider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Memoize heavy computed values" }),
    );

    expect(mockedValidateAnswer).toHaveBeenCalledWith({
      challengeId: "level2",
      submission: "b",
    });

    await waitFor(() =>
      expect(screen.getByTestId("state")).toHaveTextContent("level-1-score-30"),
    );
  });

  it("shows validation error when submission fails", async () => {
    mockedValidateAnswer.mockRejectedValue(new Error("network"));
    const user = userEvent.setup();

    render(
      <GameProvider>
        <Harness />
      </GameProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add useMemo everywhere" }));

    expect(
      await screen.findByText("Could not validate answer. Try again."),
    ).toBeInTheDocument();
  });
});
