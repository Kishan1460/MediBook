import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test/test-utils";
import Login from "../pages/Login";

describe("Login page", () => {
  it("renders email and password fields", () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("shows an error for an invalid email format", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    await user.type(screen.getByPlaceholderText("Email Address"), "not-an-email");
    await user.type(screen.getByPlaceholderText("Password"), "validpass123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument();
  });

  it("shows an error when the password is too short", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Login />);

    await user.type(screen.getByPlaceholderText("Email Address"), "patient@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "123");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText("Password must be at least 6 characters")).toBeInTheDocument();
  });
});
