import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { signup } from "../redux/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";

    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Contact number is required";
    } else if (!/^[0-9]{7,15}$/.test(form.phone.trim())) {
      nextErrors.phone = "Enter a valid contact number";
    }

    if (!form.password) {
      nextErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await dispatch(
        signup({ name: form.name, email: form.email, phone: form.phone, password: form.password })
      ).unwrap();
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (message) {
      toast.error(typeof message === "string" ? message : "Signup failed");
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
            Signup to your Account
          </h1>

          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 ${
                errors.name ? "border-red-400" : "border-primary-100"
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

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
              type="tel"
              name="phone"
              placeholder="Contact Number"
              value={form.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 ${
                errors.phone ? "border-red-400" : "border-primary-100"
              }`}
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
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

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 ${
                errors.confirmPassword ? "border-red-400" : "border-primary-100"
              }`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary-700 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "SIGNUP"}
          </button>

          <p className="text-center text-sm text-primary-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary-700 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
