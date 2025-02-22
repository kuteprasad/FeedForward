import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import { setLanguage } from "../../store/slices/langSlice";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { token, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const { current: currentLang } = useSelector((state) => state.lang);

  const navigation = user
    ? [
        { name: t("dashboard"), href: "/dashboard" },
        { name: t("orders"), href: "/orders" },
        { name: t("profile"), href: "/profile" },
      ]
    : [];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
  ];

  return (
    <nav className="bg-[var(--navbar-bg)] shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-[var(--navbar-text)]">
              InnovateYou
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
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={currentLang}
              onChange={(e) => dispatch(setLanguage(e.target.value))}
              className="p-2 rounded-lg bg-[var(--btn-secondary-bg)] 
                       text-[var(--btn-secondary-text)] border-none outline-none"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

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
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] 
                           px-4 py-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/register"
                  className="bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] 
                           px-4 py-2 rounded-lg hover:bg-[var(--btn-primary-hover)]"
                >
                  {t("register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
