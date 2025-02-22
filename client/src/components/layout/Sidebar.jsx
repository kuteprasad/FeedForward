import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const navigationConfig = {
  admin: [
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Reports", href: "/admin/reports" },
    { name: "Settings", href: "/admin/settings" },
    { name: "Notifications", href: "/notifications" },
  ],
  ngo: [
    { name: "Dashboard", href: "/ngo" },
    { name: "Available Donations", href: "/ngo/donations" },
    { name: "My Requests", href: "/ngo/requests" },
    { name: "Profile", href: "/profile" },
    { name: "Notifications", href: "/notifications" },
  ],
  donor: [
    { name: "Dashboard", href: "/donor" },
    { name: "My Donations", href: "/donor/donations" },
    { name: "Create Donation", href: "/donor/create" },
    { name: "Profile", href: "/profile" },
    { name: "Notifications", href: "/notifications" },
  ],
};

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getNavigation = () => {
    if (!user?.role) return [];
    const role = user.role.toLowerCase();
    return navigationConfig[role] || [];
  };

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--btn-primary-bg)] 
                 text-[var(--btn-primary-text)] rounded-lg"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] 
                   bg-[var(--sidebar-bg)] py-6 px-4 shadow-lg transition-transform 
                   transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                   md:translate-x-0`}
      >
        <nav className="space-y-2">
          {getNavigation().map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg
                       transition duration-200
                       ${
                         isActive(item.href)
                           ? "bg-[var(--accent)] text-[var(--accent-text)]"
                           : "text-[var(--text)] hover:bg-[var(--accent-hover)]"
                       }`}
              onClick={() => setIsOpen(false)}
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
