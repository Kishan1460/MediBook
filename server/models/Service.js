import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
