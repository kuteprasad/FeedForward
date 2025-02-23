import { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// Close sidebar on window resize above md breakpoint
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsSidebarOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="min-h-screen bg-[var(--background)]">
			<Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

			<div className="flex pt-16">
				{/* Sidebar with mobile responsiveness */}
				<Sidebar isOpen={isSidebarOpen} />

				{/* Mobile backdrop */}
				{isSidebarOpen && (
					<div
						className="fixed inset-0 z-40 bg-black/50 md:hidden"
						onClick={() => setIsSidebarOpen(false)}
					/>
				)}

				{/* Main Content */}
				<main className="flex-1 p-4 md:p-6 md:ml-10 transition-all duration-300 ">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
