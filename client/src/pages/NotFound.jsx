import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-cream px-4 text-center">
    <p className="font-display text-5xl font-bold text-primary-700">404</p>
    <p className="text-primary-600">We couldn&apos;t find that page.</p>
    <Link
      to="/dashboard"
      className="mt-2 rounded-full bg-primary-700 px-6 py-2 text-sm font-semibold text-white transition hover:bg-primary-800"
    >
      Back to dashboard
    </Link>
  </div>
);

export default NotFound;
