import "@testing-library/jest-dom";
import React from "react";
import { fireEvent } from "@testing-library/react";
import Page from "./page";
import { renderWithProviders } from "./test-utils";
import { mockedQuestions } from "./__mocks__/mocked-questions";

let result;
jest.mock("./api.service", () => ({
  fetchCategories: jest
    .fn()
    .mockImplementation(async () => [{ id: 123, name: "test" }]),
  fetchQuestions: jest.fn().mockImplementation(async () => result),
}));

describe("Page", () => {
  it("renders correctly", async () => {
    result = { results: mockedQuestions };
    const mockedStore = {};
    const wrapper = renderWithProviders(<Page />, {
      initialState: mockedStore,
    });
    fireEvent.change(await wrapper.findByTestId("category-select"), {
      target: { value: 123 },
    });
    fireEvent.click(wrapper.getByTestId("difficulty-mode-medium"));
    fireEvent.click(wrapper.getByTestId("true-false-disabled"));
    fireEvent.click(wrapper.getByTestId("start-button"));
    expect(await wrapper.findByTestId("game-container")).toBeInTheDocument();

    for (let i = 1; i < 10; i++) {
      expect(
        wrapper.getByText(`Test question number ${i}`),
      ).toBeInTheDocument();
      fireEvent.click(wrapper.getByText("answer d"));
      fireEvent.click(wrapper.getByText("Next question"));
      expect(
        wrapper.getByText(`Test question number ${i + 1}`),
      ).toBeInTheDocument();
    }

    fireEvent.click(await wrapper.findByText("answer d"));
    expect(await wrapper.findByTestId("summary")).toBeInTheDocument();
  });

  it("handle incorrect answer and Play Again button correctly", async () => {
    const mockedStore = {};
    const wrapper = renderWithProviders(<Page />, {
      initialState: mockedStore,
    });
    fireEvent.change(await wrapper.findByTestId("category-select"), {
      target: { value: 123 },
    });

    fireEvent.click(wrapper.getByTestId("difficulty-mode-easy"));
    fireEvent.click(wrapper.getByTestId("true-false-disabled"));
    fireEvent.click(wrapper.getByTestId("start-button"));
    expect(await wrapper.findByTestId("game-container")).toBeInTheDocument();
    expect(
      await wrapper.findByText("Test question number 1"),
    ).toBeInTheDocument();

    fireEvent.click(await wrapper.findByText("answer a"));
    expect(await wrapper.findByText("Wrong answer!")).toBeInTheDocument();

    fireEvent.click(await wrapper.findByText("Play Again"));
    expect(
      await wrapper.findByText("Test question number 1"),
    ).toBeInTheDocument();
    expect(await wrapper.queryByText("Wrong answer!")).not.toBeInTheDocument();
  });

  it("handles Exit Game button correctly", async () => {
    const mockedStore = {};
    const wrapper = renderWithProviders(<Page />, {
      initialState: mockedStore,
    });
    fireEvent.change(await wrapper.findByTestId("category-select"), {
      target: { value: 123 },
    });

    fireEvent.click(wrapper.getByTestId("difficulty-mode-hard"));
    fireEvent.click(wrapper.getByTestId("true-false-disabled"));
    fireEvent.click(wrapper.getByTestId("start-button"));
    expect(await wrapper.findByTestId("game-container")).toBeInTheDocument();
    expect(
      await wrapper.findByText("Test question number 1"),
    ).toBeInTheDocument();

    fireEvent.click(await wrapper.findByTestId("exit-game-button"));
    expect(await wrapper.queryByTestId("game")).not.toBeInTheDocument();
  });

  it("should show error while fetching questions", async () => {
    result = null;
    const mockedStore = {};
    const wrapper = renderWithProviders(<Page />, {
      initialState: mockedStore,
    });
    fireEvent.change(await wrapper.findByTestId("category-select"), {
      target: { value: 123 },
    });
    fireEvent.click(wrapper.getByTestId("difficulty-mode-medium"));
    fireEvent.click(wrapper.getByTestId("true-false-disabled"));
    fireEvent.click(wrapper.getByTestId("start-button"));

    expect(await wrapper.findByTestId("error-toast")).toBeInTheDocument();
    expect(
      await wrapper.queryByTestId("game-container"),
    ).not.toBeInTheDocument();
  });

  it("should not show next question button", async () => {
    result = { results: mockedQuestions };
    const mockedStore = {};
    const wrapper = renderWithProviders(<Page />, {
      initialState: mockedStore,
    });
    fireEvent.change(await wrapper.findByTestId("category-select"), {
      target: { value: 123 },
    });

    fireEvent.click(wrapper.getByTestId("difficulty-mode-easy"));
    fireEvent.click(wrapper.getByTestId("true-false-disabled"));
    fireEvent.click(wrapper.getByTestId("start-button"));
    expect(await wrapper.findByTestId("game-container")).toBeInTheDocument();
    expect(wrapper.queryByText("Next question")).not.toBeInTheDocument();
    fireEvent.click(wrapper.getByText("answer d"));
    fireEvent.click(wrapper.getByText("Next question"));
    expect(wrapper.getByText("Test question number 2")).toBeInTheDocument();
    expect(wrapper.queryByText("Next question")).not.toBeInTheDocument();
  });
});
