import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AnswerTypeInput } from "@/app/answer-type-input";
import userEvent from "@testing-library/user-event";

describe("Answer type input", () => {
  it("renders correctly", () => {
    render(<AnswerTypeInput />);
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByText("Disabled")).toBeInTheDocument();
    expect(screen.getByText("Enabled")).toBeInTheDocument();
  });
  it("calls setMode after clicking 'disabled' correctly", async () => {
    const mockedSetMode = jest.fn();
    render(<AnswerTypeInput setMode={mockedSetMode} />);
    await userEvent.click(screen.getByText("Disabled"));
    expect(mockedSetMode.mock.calls).toHaveLength(1);
    expect(mockedSetMode.mock.calls[0]).toEqual(["disabled"]);
  });
  it("calls setMode after clicking 'enabled' correctly", async () => {
    const mockedSetMode = jest.fn();
    render(<AnswerTypeInput setMode={mockedSetMode} />);
    await userEvent.click(screen.getByText("Enabled"));
    expect(mockedSetMode.mock.calls).toHaveLength(1);
    expect(mockedSetMode.mock.calls[0]).toEqual(["enabled"]);
  });
});
