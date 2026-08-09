import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const getErrorMessage = (error) =>
  error?.response?.data?.message || "Something went wrong. Please try again.";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/appointments", { params: year ? { year } : {} });
      return data.appointments;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/appointments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data.appointment;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    clearAppointmentStatus: (state) => {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAppointment.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.creating = false;
        state.items = [action.payload, ...state.items];
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload;
      });
  },
});

export const { clearAppointmentStatus } = appointmentSlice.actions;
export default appointmentSlice.reducer;
