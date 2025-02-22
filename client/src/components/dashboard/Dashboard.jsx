
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";

import { Outlet } from "react-router-dom";

export default function Dashboard() {


  console.log("reaced dashboard");
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
          <Outlet />
        </main>
      </div>
    </div>
  );
}
