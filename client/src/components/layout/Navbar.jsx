import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import GTranslate from "../common/GTranslate";
import { getNavbarItems } from './NavigationConfig';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  // const { user } = useSelector((state) => state.auth);
  const navigation = getNavbarItems(user);

  

  return (
    <nav className="bg-[var(--navbar-bg)] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[var(--navbar-text)]">
              FeedForward
            </span>
          </Link>

          {/* Navigation Links - Hidden on Mobile */}
          <div className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-[var(--navbar-text)] hover:text-[var(--primary)] 
                         transition duration-300 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            {/* Common link for all authenticated users
            {user && (
              <Link
                to="/profile"
                className="text-[var(--navbar-text)] hover:text-[var(--primary)] 
                         transition duration-300 text-sm font-medium"
              >
                Profile
              </Link>
            )} */}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Google Translate Button */}
            <GTranslate />

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg bg-[var(--btn-secondary-bg)] 
                       text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover)]"
              aria-label="Toggle theme"
            >
              {mode === "light" ? "🌙" : "☀️"}
            </button>

            {/* Auth Buttons */}
            {token ? (
              <div className="flex items-center space-x-4">
                <span className="text-[var(--navbar-text)]">
                  {user?.username}
                </span>
                <button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                  }}
                  className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] 
                           px-4 py-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] 
                           px-4 py-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] 
                           px-4 py-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
