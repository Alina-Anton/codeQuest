import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameProvider, useGame } from "../context/GameContext";
import Level3Accessibility from "./Level3Accessibility";
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
      <Level3Accessibility />
    </div>
  );
};

describe("Level3Accessibility", () => {
  beforeEach(() => {
    mockedValidateAnswer.mockReset();
  });

  it("submits selected option and advances level / updates score", async () => {
    mockedValidateAnswer.mockResolvedValue({ correct: true, points: 20 });
    const user = userEvent.setup();

    render(
      <GameProvider>
        <Harness />
      </GameProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Faulty layout styles" }));

    expect(mockedValidateAnswer).toHaveBeenCalledWith({
      challengeId: "level3",
      submission: "c",
    });

    await waitFor(() =>
      expect(screen.getByTestId("state")).toHaveTextContent("level-1-score-20"),
    );
  });

  it("shows error message when validateAnswer fails", async () => {
    mockedValidateAnswer.mockRejectedValue(new Error("network"));
    const user = userEvent.setup();

    render(
      <GameProvider>
        <Harness />
      </GameProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Low-contrast text" }));

    expect(
      await screen.findByText("Could not validate answer. Try again."),
    ).toBeInTheDocument();
  });
});
