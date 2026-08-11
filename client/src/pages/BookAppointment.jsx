import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineUpload } from "react-icons/hi";
import AppLayout from "../components/AppLayout";
import { createAppointment } from "../redux/slices/appointmentSlice";

// List of available departments for booking appointments
const departments = [
  "Dermatologist",
  "Gynecologist",
  "Dentist",
  "General Physician",
  "Cardiologist",
  "Orthopedic",
];

// BookAppointment component for booking a new appointment
const BookAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { creating } = useSelector((state) => state.appointments);

  const [form, setForm] = useState({
    date: "",
    time: "",
    department: departments[0],
    comments: "",
  });
  const [reportFile, setReportFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.date) nextErrors.date = "Please select a date";
    if (!form.time) nextErrors.time = "Please select a time";
    if (!form.department) nextErrors.department = "Please choose a department";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append("date", form.date);
    formData.append("time", form.time);
    formData.append("department", form.department);
    formData.append("comments", form.comments);
    if (reportFile) formData.append("report", reportFile);

    try {
      await dispatch(createAppointment(formData)).unwrap();
      toast.success("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (message) {
      toast.error(typeof message === "string" ? message : "Failed to book appointment");
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto flex max-w-lg justify-center">
        <div className="w-full rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <h1 className="mb-6 font-display text-xl font-semibold text-primary-900">
            Book an Appointment
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary-500">
                Select Date
              </label>
              <div className="flex gap-3">
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 ${
                    errors.date ? "border-red-400" : "border-primary-100"
                  }`}
                />
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 ${
                    errors.time ? "border-red-400" : "border-primary-100"
                  }`}
                />
              </div>
              {(errors.date || errors.time) && (
                <p className="mt-1 text-xs text-red-500">{errors.date || errors.time}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary-500">
                Department
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary-300"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                  Comments
                </label>
                <label className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-800">
                  <HiOutlineUpload size={16} />
                  Upload Reports
                  <input
                    type="file"
                    onChange={(e) => setReportFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>
              <textarea
                name="comments"
                rows={4}
                placeholder="Explain about the problem."
                value={form.comments}
                onChange={handleChange}
                className="w-full rounded-lg border border-primary-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary-300"
              />
              {reportFile && (
                <p className="mt-1 truncate text-xs text-primary-500">Attached: {reportFile.name}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full rounded-full bg-accent-500 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:opacity-60"
            >
              {creating ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default BookAppointment;
