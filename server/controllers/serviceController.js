import Service from "../models/Service.js";

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json({ services });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch services" });
  }
};
