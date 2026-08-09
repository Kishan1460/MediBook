import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div>
          <p className="text-white font-semibold text-sm">
            Medi<span className="font-normal opacity-75">Book</span>
          </p>
          <p className="text-xs mt-1">Your health, simplified.</p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-5">
          <Link to="/dashboard" className="text-xs hover:text-teal-400 transition-colors">Dashboard</Link>
          <Link to="/book-appointment" className="text-xs hover:text-teal-400 transition-colors">Book</Link>
          <Link to="/my-appointments" className="text-xs hover:text-teal-400 transition-colors">Appointments</Link>
          <Link to="/services" className="text-xs hover:text-teal-400 transition-colors">Services</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs">© {year} MediBook. All rights reserved.</p>

      </div>
    </footer>
  );
};

export default Footer;