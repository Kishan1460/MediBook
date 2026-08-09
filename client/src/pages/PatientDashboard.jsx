import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import AppLayout from "../components/AppLayout";
import { fetchProfile, updateProfile } from "../redux/slices/authSlice";

const emptyForm = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zipcode: "",
};

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState(emptyForm);
  const [pictureFile, setPictureFile] = useState(null);

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
        addressLine1: user.addressLine1 || "",
        addressLine2: user.addressLine2 || "",
        city: user.city || "",
        state: user.state || "",
        zipcode: user.zipcode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "email") formData.append(key, value);
    });
    if (pictureFile) {
      formData.append("profilePicture", pictureFile);
    }

    try {
      await dispatch(updateProfile(formData)).unwrap();
      toast.success("Profile updated successfully!");
    } catch (message) {
      toast.error(typeof message === "string" ? message : "Failed to update profile");
    }
  };

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 font-display text-xl font-semibold text-primary-900">
          Patient Dashboard
        </h1>

        <div className="rounded-2xl bg-white p-5 shadow-card sm:p-8">
          <h2 className="mb-5 font-display text-base font-semibold text-primary-800">
            Patient Details
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
            <Field label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
            <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
            <Field label="Email" name="email" value={form.email} onChange={handleChange} disabled />
            <Field
              label="Address Line 1"
              name="addressLine1"
              value={form.addressLine1}
              onChange={handleChange}
            />
            <Field
              label="Address Line 2"
              name="addressLine2"
              value={form.addressLine2}
              onChange={handleChange}
            />
            <Field label="City" name="city" value={form.city} onChange={handleChange} />
            <Field label="State" name="state" value={form.state} onChange={handleChange} />
            <Field label="Zipcode" name="zipcode" value={form.zipcode} onChange={handleChange} />

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary-500">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPictureFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-primary-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-200"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-primary-700 px-8 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800 disabled:opacity-60"
              >
                {loading ? "Saving..." : "ADD"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

const Field = ({ label, name, value, onChange, disabled = false }) => (
  <div>
    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-primary-500">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-lg border border-primary-100 px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary-300 disabled:bg-primary-50 disabled:text-primary-400"
    />
  </div>
);

export default PatientDashboard;
