import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import appointmentReducer from "./slices/appointmentSlice";
import serviceReducer from "./slices/serviceSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    services: serviceReducer,
  },
});

export default store;
