import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "./store";

export function renderWithProviders(ui, extendedRenderOptions = {}) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
