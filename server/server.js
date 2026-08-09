import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
