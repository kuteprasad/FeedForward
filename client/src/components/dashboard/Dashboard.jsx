import { useSelector } from "react-redux";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import AdminDashboard from "./admin/AdminDashboard";
import DonorDashboard from "./donor/DonorDashboard";
import NgoDashboard from "./ngo/NgoDashboard";

const ROLE_COMPONENTS = {
  ADMIN: AdminDashboard,
  DONOR: DonorDashboard,
  NGO: NgoDashboard,
};

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const DashboardComponent = ROLE_COMPONENTS[user?.role] || DonorDashboard;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex pt-16">
        {" "}
        {/* pt-16 to account for fixed navbar height */}
        {/* Sidebar */}
        <Sidebar />
        {/* Dashboard Content */}
        <main className="flex-1 p-6 md:ml-64">
          {" "}
          {/* ml-64 to account for sidebar width */}
          <DashboardComponent />
        </main>
      </div>
    </div>
  );
}
