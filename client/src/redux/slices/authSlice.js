import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const getErrorMessage = (error) =>
  error?.response?.data?.message || "Something went wrong. Please try again.";

export const signup = createAsyncThunk("auth/signup", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/signup", payload);
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const login = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get("/auth/me");
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.put("/auth/me", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = null;
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
