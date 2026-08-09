import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import AppointmentCard from "../components/AppointmentCard";
import { fetchAppointments } from "../redux/slices/appointmentSlice";

const MyAppointments = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.appointments);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(String(currentYear));

  useEffect(() => {
    dispatch(fetchAppointments(year));
  }, [dispatch, year]);

  const yearOptions = useMemo(() => {
    const years = new Set([currentYear, currentYear - 1, currentYear - 2]);
    items.forEach((item) => years.add(new Date(item.date).getFullYear()));
    return Array.from(years).sort((a, b) => b - a);
  }, [items, currentYear]);

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-xl font-semibold text-primary-900">My Appointments</h1>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="rounded-lg border border-primary-200 bg-white px-4 py-2 text-sm font-semibold text-primary-700 outline-none focus:ring-2 focus:ring-primary-300"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-primary-100" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-primary-200 bg-white px-6 py-14 text-center">
            <p className="font-display text-base font-semibold text-primary-800">
              No appointments yet for {year}
            </p>
            <p className="mt-1 text-sm text-primary-500">
              Ready when you are — booking takes less than a minute.
            </p>
            <Link
              to="/book-appointment"
              className="mt-4 inline-block rounded-full bg-primary-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-800"
            >
              Book an appointment
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((appointment) => (
              <AppointmentCard key={appointment._id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyAppointments;
