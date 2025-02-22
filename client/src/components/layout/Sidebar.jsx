import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  // Define sidebar items based on user role
  const sidebarItems =
    user?.role === "ADMIN"
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Users", href: "/admin/users" },
          { name: "Settings", href: "/admin/settings" },
        ]
      : user?.role === "NGO"
      ? [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Orders", href: "/orders" },
          { name: "Profile", href: "/profile" },
        ]
      : [
          { name: "Dashboard", href: "/dashboard" },
          { name: "My Orders", href: "/orders" },
          { name: "Profile", href: "/profile" },
        ];

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
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg
                       text-[var(--text)] hover:bg-[var(--accent)]
                       transition duration-200"
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
