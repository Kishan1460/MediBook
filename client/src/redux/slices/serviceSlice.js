import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/services");
      return data.services;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to load services");
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
