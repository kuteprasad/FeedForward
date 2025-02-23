import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSidebarItems } from './NavigationConfig';

export default function SidebarNavigation({ isOpen, onClose }) {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const sidebarItems = getSidebarItems(user);

  return (
    <div className={`fixed md:relative inset-0 md:inset-auto h-screen w-64 transform transition-transform duration-300
      bg-[var(--sidebar-bg)] z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
    >
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={onClose} // Close sidebar when clicking a link on mobile
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg
                     text-[var(--text)] hover:bg-[var(--accent)]
                     transition duration-200 ${
                       location.pathname === item.href ? "bg-[var(--accent)]" : ""
                     }`}
          >
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}