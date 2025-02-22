
import Navbar from "../layout/Navbar";


import { Outlet } from "react-router-dom";

export default function AuthLayout() {



  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex pt-16">
       
          <Outlet />
   
      </div>
    </div>
  );
}
