import "@testing-library/jest-dom";
import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "@/lib/test/test-utils";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { useSession } from "next-auth/react";
import apiServiceProvider from "@/lib/services/main";
import leaderboardService from "@/lib/services/leaderboard.service";
import Main from "./main";
import { mockedQuestions } from "../../__mocks__/mocked-questions";

jest.mock("next-auth/react");

let result;

describe("Page", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_USE_FAKE_API = "true";

    const mockSession = {
      expires: "1",
      user: { email: "a", name: "Delta", image: "c" },
    };

    useSession.mockReturnValue({ data: mockSession, status: "authenticated" });
  });

  it("renders correctly", async () => {
    const mockSendRecordToApi = jest.spyOn(
      leaderboardService,
      "sendRecordToApi",
    );

    result = { results: mockedQuestions };
    const mockedStore = {};
    const wrapper = renderWithProviders(<Main />, {
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
      expect(wrapper.getByText(`Question number ${i}`)).toBeInTheDocument();
      fireEvent.click(wrapper.getByText("True"));
      fireEvent.click(wrapper.getByText("Next question"));
      expect(wrapper.getByText(`Question number ${i + 1}`)).toBeInTheDocument();
    }

    fireEvent.click(await wrapper.findByText("True"));
    expect(await wrapper.findByTestId("summary")).toBeInTheDocument();

    expect(mockSendRecordToApi).toHaveBeenCalledTimes(1);
  });

  it("handle incorrect answer and Play Again button correctly", async () => {
    const mockedStore = {};
    const wrapper = renderWithProviders(<Main />, {
      initialState: mockedStore,
    });
    fireEvent.change(await wrapper.findByTestId("category-select"), {
      target: { value: 123 },
    });

    fireEvent.click(wrapper.getByTestId("difficulty-mode-easy"));
    fireEvent.click(wrapper.getByTestId("true-false-disabled"));
    fireEvent.click(wrapper.getByTestId("start-button"));
    expect(await wrapper.findByTestId("game-container")).toBeInTheDocument();
    expect(await wrapper.findByText("Question number 1")).toBeInTheDocument();

    fireEvent.click(await wrapper.findByText("False"));
    expect(await wrapper.findByText("Wrong answer!")).toBeInTheDocument();

    fireEvent.click(await wrapper.findByText("Play Again"));
    expect(await wrapper.findByText("Question number 1")).toBeInTheDocument();
    expect(await wrapper.queryByText("Wrong answer!")).not.toBeInTheDocument();
  });

  it("handles Exit Game button correctly", async () => {
    const mockedStore = {};
    const wrapper = renderWithProviders(<Main />, {
      initialState: mockedStore,
    });
    fireEvent.change(await wrapper.findByTestId("category-select"), {
      target: { value: 123 },
    });

    fireEvent.click(wrapper.getByTestId("difficulty-mode-hard"));
    fireEvent.click(wrapper.getByTestId("true-false-disabled"));
    fireEvent.click(wrapper.getByTestId("start-button"));
    expect(await wrapper.findByTestId("game-container")).toBeInTheDocument();
    expect(await wrapper.findByText("Question number 1")).toBeInTheDocument();

    fireEvent.click(await wrapper.findByTestId("exit-game-button"));
    expect(await wrapper.queryByTestId("game")).not.toBeInTheDocument();
  });

  it("should show error while fetching questions", async () => {
    const mockGetApiService = jest
      .spyOn(apiServiceProvider, "getApiService")
      .mockReturnValue(null);

    const mockedStore = {};
    const wrapper = renderWithProviders(<Main />, {
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
    const wrapper = renderWithProviders(<Main />, {
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
    fireEvent.click(wrapper.getByText("True"));
    fireEvent.click(wrapper.getByText("Next question"));
    expect(wrapper.getByText("Question number 2")).toBeInTheDocument();
    expect(wrapper.queryByText("Next question")).not.toBeInTheDocument();
  });
});
