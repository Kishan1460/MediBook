import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    patientName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    department: { type: String, required: true },
    doctorName: { type: String, default: "" },
    rating: { type: Number, default: 4.5 },
    comments: { type: String, default: "" },
    reportUrl: { type: String, default: "" },
    status: { type: String, enum: ["upcoming", "completed", "cancelled"], default: "upcoming" },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
