import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import authReducer from "../redux/slices/authSlice";
import appointmentReducer from "../redux/slices/appointmentSlice";
import serviceReducer from "../redux/slices/serviceSlice";

export const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
      appointments: appointmentReducer,
      services: serviceReducer,
    },
    preloadedState,
  });

export const renderWithProviders = (
  ui,
  { preloadedState = {}, route = "/", store = createTestStore(preloadedState) } = {}
) => {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
  };
};
