import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test/test-utils";
import Signup from "../pages/Signup";

describe("Signup page", () => {
  it("renders all required fields", () => {
    renderWithProviders(<Signup />);
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contact Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Signup />);

    await user.click(screen.getByRole("button", { name: /signup/i }));

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Contact number is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("shows an error when passwords do not match", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Signup />);

    await user.type(screen.getByPlaceholderText("Full Name"), "Alina Joe");
    await user.type(screen.getByPlaceholderText("Email Address"), "alina@example.com");
    await user.type(screen.getByPlaceholderText("Contact Number"), "9876543210");
    await user.type(screen.getByPlaceholderText("Password"), "password1");
    await user.type(screen.getByPlaceholderText("Confirm Password"), "password2");
    await user.click(screen.getByRole("button", { name: /signup/i }));

    expect(await screen.findByText("Passwords do not match")).toBeInTheDocument();
  });

  it("shows an error for an invalid contact number", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Signup />);

    await user.type(screen.getByPlaceholderText("Full Name"), "Alina Joe");
    await user.type(screen.getByPlaceholderText("Email Address"), "alina@example.com");
    await user.type(screen.getByPlaceholderText("Contact Number"), "abc");
    await user.type(screen.getByPlaceholderText("Password"), "password1");
    await user.type(screen.getByPlaceholderText("Confirm Password"), "password1");
    await user.click(screen.getByRole("button", { name: /signup/i }));

    expect(await screen.findByText("Enter a valid contact number")).toBeInTheDocument();
  });

  it("has a link back to the login page", () => {
    renderWithProviders(<Signup />);
    expect(screen.getByRole("link", { name: /login/i })).toHaveAttribute("href", "/login");
  });
});
