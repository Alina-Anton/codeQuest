import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GameProvider, useGame } from "../context/GameContext";
import Level4Tradeoff from "./Level4Tradeoff";
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
      <Level4Tradeoff />
    </div>
  );
};

describe("Level4Tradeoff", () => {
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

    await user.click(
      screen.getByRole("button", {
        name: "Suggest lightweight CSS transitions + phased rollout",
      }),
    );

    expect(mockedValidateAnswer).toHaveBeenCalledWith({
      challengeId: "level4",
      submission: "b",
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

    await user.click(
      screen.getByRole("button", {
        name: "Do it overnight and hope nothing breaks",
      }),
    );

    expect(
      await screen.findByText("Could not validate answer. Try again."),
    ).toBeInTheDocument();
  });
});
