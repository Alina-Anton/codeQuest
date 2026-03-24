import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

jest.mock("./components/ui/MonacoCodeEditor", () => () => (
  <div data-testid="mock-monaco">editor</div>
));

describe("App flow", () => {
  it("shows landing first and enters first level after start", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText("CodeQuest")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "START CHALLENGE" }));

    expect(screen.getByText("Production Bug")).toBeInTheDocument();
    expect(screen.getByTestId("mock-monaco")).toBeInTheDocument();
  });
});
