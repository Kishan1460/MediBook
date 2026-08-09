import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import { logout } from "../redux/slices/authSlice";

const API_ORIGIN = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace("/api", "");

const Sidebar = ({ open }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const displayName =
    user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Patient";

  const avatarSrc = user?.profilePicture
    ? user.profilePicture.startsWith("http")
      ? user.profilePicture
      : `${API_ORIGIN}${user.profilePicture}`
    : null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className={`${
        open ? "w-56" : "w-0 -translate-x-full sm:translate-x-0 sm:w-16"
      } shrink-0 overflow-hidden border-r border-primary-100 bg-white transition-all duration-200`}
    >
      <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover ring-2 ring-primary-200"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-500 ring-2 ring-primary-200">
            <HiOutlineUser size={28} />
          </div>
        )}
        {open && (
          <div>
            <p className="font-display text-sm font-semibold text-primary-900">{displayName}</p>
            <p className="text-xs text-primary-400">Patient</p>
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-1 px-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive ? "bg-primary-600 text-white" : "text-primary-700 hover:bg-primary-50"
            }`
          }
        >
          <HiOutlineUser size={18} />
          {open && <span>Patient</span>}
        </NavLink>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-primary-500 transition-colors hover:bg-primary-50"
        >
          <HiOutlineLogout size={18} />
          {open && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
