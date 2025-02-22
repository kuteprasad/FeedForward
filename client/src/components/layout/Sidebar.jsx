import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSidebarItems } from './NavigationConfig';

export default function SidebarNavigation() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const sidebarItems = getSidebarItems(user);

  return (
    <nav className="space-y-2">
      {sidebarItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
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
  );
}