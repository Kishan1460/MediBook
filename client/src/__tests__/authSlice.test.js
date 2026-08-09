import { describe, it, expect, beforeEach } from "vitest";
import authReducer, { logout, clearAuthError, login, signup } from "../redux/slices/authSlice";

describe("authSlice reducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the initial state", () => {
    const state = authReducer(undefined, { type: "@@INIT" });
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("sets loading true on login.pending", () => {
    const state = authReducer(undefined, { type: login.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("stores user and token on login.fulfilled", () => {
    const payload = { token: "abc123", user: { email: "a@b.com" } };
    const state = authReducer(undefined, { type: login.fulfilled.type, payload });
    expect(state.token).toBe("abc123");
    expect(state.user).toEqual({ email: "a@b.com" });
    expect(state.loading).toBe(false);
  });

  it("stores an error message on login.rejected", () => {
    const state = authReducer(undefined, {
      type: login.rejected.type,
      payload: "Invalid email or password",
    });
    expect(state.error).toBe("Invalid email or password");
    expect(state.loading).toBe(false);
  });

  it("stores user and token on signup.fulfilled", () => {
    const payload = { token: "xyz789", user: { email: "new@user.com" } };
    const state = authReducer(undefined, { type: signup.fulfilled.type, payload });
    expect(state.token).toBe("xyz789");
    expect(state.user).toEqual({ email: "new@user.com" });
  });

  it("clears the user and token on logout", () => {
    const loggedInState = { token: "abc123", user: { email: "a@b.com" }, loading: false, error: null };
    const state = authReducer(loggedInState, logout());
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
  });

  it("clears the error on clearAuthError", () => {
    const stateWithError = { token: null, user: null, loading: false, error: "Something failed" };
    const state = authReducer(stateWithError, clearAuthError());
    expect(state.error).toBeNull();
  });
});
