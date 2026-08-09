import { HiOutlineStar } from "react-icons/hi";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
};

const AppointmentCard = ({ appointment }) => {
  const { date, department, doctorName, rating, patientName, status } = appointment;

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-32 bg-gradient-to-br from-primary-200 to-primary-400">
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700">
          {formatDate(date)}
        </span>
      </div>
      <div className="bg-primary-600 px-4 py-3 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-100">Doctor Details</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">Name: {doctorName || "To be assigned"}</p>
            <p className="text-sm">Department: {department}</p>
            <p className="flex items-center gap-1 text-sm">
              <HiOutlineStar /> Rating: {rating ?? "4.8"}
            </p>
          </div>
          <button
            type="button"
            className="whitespace-nowrap rounded-full bg-accent-500 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-accent-600"
          >
            JOIN
          </button>
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary-100">
          Patient Name: <span className="normal-case">{patientName}</span>
        </p>
      </div>
    </div>
  );
};

export default AppointmentCard;
