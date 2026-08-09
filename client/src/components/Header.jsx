import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogoFullWhite } from "./common/Logo";
import { HiMenu, HiOutlineDotsVertical, HiX } from "react-icons/hi";

const navLinkClasses = ({ isActive }) =>
  `block rounded-full px-4 py-1.5 text-sm font-semibold transition-colors sm:inline-block ${
    isActive
      ? "bg-white text-primary-700"
      : "bg-primary-600/40 text-white hover:bg-white/20"
  }`;

const NAV_ITEMS = [
  { to: "/services", label: "Services" },
  { to: "/book-appointment", label: "Book an appointment" },
  { to: "/my-appointments", label: "My appointment" },
];

const Header = ({ onToggleSidebar, showMenuButton = true }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-primary-700 shadow-md">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              className="rounded-md p-1.5 text-white hover:bg-white/10"
            >
              <HiMenu size={22} />
            </button>
          )}
          <LogoFullWhite />
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-2 sm:flex sm:gap-3" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile nav toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileNavOpen}
          onClick={() => setMobileNavOpen((prev) => !prev)}
          className="rounded-md p-1.5 text-white hover:bg-white/10 sm:hidden"
        >
          {mobileNavOpen ? <HiX size={22} /> : <HiOutlineDotsVertical size={22} />}
        </button>
      </div>

      {/* Mobile nav panel */}
      {mobileNavOpen && (
        <nav
          className="flex flex-col gap-2 border-t border-white/10 px-4 py-3 sm:hidden"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileNavOpen(false)}
              className={navLinkClasses}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
