import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders, createTestStore } from "../test/test-utils";
import ProtectedRoute from "../components/ProtectedRoute";

const Secret = () => <div>Secret Content</div>;
const LoginStub = () => <div>Login Page</div>;

const renderProtected = (preloadedState) =>
  renderWithProviders(
    <Routes>
      <Route path="/login" element={<LoginStub />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Secret />
          </ProtectedRoute>
        }
      />
    </Routes>,
    { route: "/dashboard", store: createTestStore(preloadedState) }
  );

describe("ProtectedRoute", () => {
  it("redirects to /login when there is no auth token", () => {
    renderProtected({ auth: { token: null, user: null, loading: false, error: null } });
    expect(screen.getByText("Login Page")).toBeInTheDocument();
    expect(screen.queryByText("Secret Content")).not.toBeInTheDocument();
  });

  it("renders the protected content when a token is present", () => {
    renderProtected({ auth: { token: "fake-token", user: null, loading: false, error: null } });
    expect(screen.getByText("Secret Content")).toBeInTheDocument();
  });
});
