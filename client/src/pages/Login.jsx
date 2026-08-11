import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { login } from "../redux/slices/authSlice";

// Login page component for user authentication
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  
  // Validate form inputs and set error messages
  const validate = () => {
    const nextErrors = {};
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!form.password) {
      nextErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(login({ email: form.email, password: form.password })).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (message) {
      toast.error(typeof message === "string" ? message : "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="flex items-center gap-3 bg-primary-700 px-6 py-5">
          <HiOutlineDesktopComputer size={32} className="text-white" />
          <span className="font-display text-lg font-semibold text-white">Patient System</span>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 px-6 py-8">
          <h1 className="text-center font-display text-xl font-semibold text-primary-900">
            Login to your Account
          </h1>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 ${
                errors.email ? "border-red-400" : "border-primary-100"
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 ${
                errors.password ? "border-red-400" : "border-primary-100"
              }`}
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          <label className="flex items-center gap-2 text-sm text-primary-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-primary-300 text-primary-600 focus:ring-primary-400"
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary-700 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>

          <p className="text-center text-sm text-primary-500">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-semibold text-primary-700 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
