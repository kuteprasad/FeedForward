import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { toggleTheme } from "../../store/slices/themeSlice";
import GTranslate from "../common/GTranslate";
import { getNavbarItems } from "./NavigationConfig";

export default function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token, user } = useSelector((state) => state.auth);
	const { mode } = useSelector((state) => state.theme);
	const navigation = getNavbarItems(user);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Close menu on resize above md breakpoint
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMenuOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<nav className="bg-[var(--navbar-bg)] shadow-md fixed top-0 left-0 w-full z-50">
			<div className="container mx-auto px-6 lg:px-12">
				<div className="flex h-16 items-center justify-between">
					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden p-2 rounded-lg hover:bg-[var(--btn-secondary-hover)]"
						aria-label="Toggle navigation menu"
					>
						<svg
							className="w-6 h-6 text-[var(--navbar-text)]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d={
									isMenuOpen
										? "M6 18L18 6M6 6l12 12"
										: "M4 6h16M4 12h16M4 18h16"
								}
							/>
						</svg>
					</button>

					{/* Logo */}
					<Link
						to="/"
						className="flex items-center space-x-2"
					>
						<span className="text-xl font-bold text-[var(--navbar-text)]">
							FeedForward
						</span>
					</Link>

					{/* Desktop Navigation */}
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
						<GTranslate />

						<button
							onClick={() => dispatch(toggleTheme())}
							className="p-2 rounded-lg bg-[var(--btn-secondary-bg)] 
                       text-[var(--btn-secondary-text)] hover:bg-[var(--btn-secondary-hover)]"
							aria-label="Toggle theme"
						>
							{mode === "light" ? "🌙" : "☀️"}
						</button>

						{token ? (
							<div className="flex items-center space-x-4">
								<span className="hidden md:inline text-[var(--navbar-text)]">
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
							<div className="hidden md:flex items-center space-x-2">
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

				{/* Mobile Menu */}
				<div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
					<div className="pt-2 pb-4 space-y-2">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								onClick={() => setIsMenuOpen(false)}
								className="block px-4 py-2 text-[var(--navbar-text)] 
                         hover:bg-[var(--btn-secondary-hover)] rounded-lg"
							>
								{item.name}
							</Link>
						))}

						{!token && (
							<>
								<Link
									to="/login"
									onClick={() => setIsMenuOpen(false)}
									className="block px-4 py-2 text-[var(--navbar-text)] 
                           hover:bg-[var(--btn-secondary-hover)] rounded-lg"
								>
									Login
								</Link>
								<Link
									to="/register"
									onClick={() => setIsMenuOpen(false)}
									className="block px-4 py-2 text-[var(--navbar-text)] 
                           hover:bg-[var(--btn-secondary-hover)] rounded-lg"
								>
									Register
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}
