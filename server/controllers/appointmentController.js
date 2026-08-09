import Appointment from "../models/Appointment.js";
import User from "../models/User.js";

export const createAppointment = async (req, res) => {
  try {
    const { date, time, department, doctorName, comments } = req.body;

    if (!date || !time || !department) {
      return res.status(400).json({ message: "Date, time and department are required" });
    }

    const user = await User.findById(req.userId);
    const patientName = user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.email;

    const appointment = await Appointment.create({
      patient: req.userId,
      patientName,
      date,
      time,
      department,
      doctorName: doctorName || "To be assigned",
      comments,
      reportUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to create appointment" });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const { year } = req.query;
    const filter = { patient: req.userId };

    if (year) {
      const start = new Date(`${year}-01-01T00:00:00.000Z`);
      const end = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
      filter.date = { $gte: start, $lt: end };
    }

    const appointments = await Appointment.find(filter).sort({ date: -1 });
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ message: error.message || "Failed to fetch appointments" });
  }
};
