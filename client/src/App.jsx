import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { websocketService } from "./services/websocket.service";

// Component imports
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";

import Dashboard from "./components/dashboard/Dashboard.jsx";
import Error from "./components/common/Error.jsx";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import Notifications from "./components/common/Notifications.jsx";
import DonorDashboard from "./components/dashboard/donor/DonorDashboard.jsx";
import NgoDashboard from "./components/dashboard/ngo/NgoDashboard.jsx";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard.jsx";
import AuthLayout from "./components/layout/AuthLayout.jsx";

function App() {
  const { token, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  // Add safe navigation
  const getStoredUserRole = () => {
    return user?.role?.toLowerCase() || null;
  };

  const isAuthenticated = () => {
    return token !== null && token !== undefined && token !== "";
  };

  useEffect(() => {
    // Initialize WebSocket connection when authenticated
    if (isAuthenticated()) {
      websocketService.connect();
    }

    return () => {
      websocketService.disconnect();
    };
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to={`/${getStoredUserRole()}`} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          {/* <Route path="profile" element={<Profile />} /> */}
        </Route>

        <Route
          path="/donor"
          element={
            <ProtectedRoute allowedRole="donor">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DonorDashboard />} />
          {/* <Route path="profile" element={<Profile />} />
              <Route path="history" element={<DonorHistory />} />
              <Route path="notifications" element={<DonorNotifications />} />
              <Route path="postings" element={<DonorPostings />} /> */}
        </Route>

        <Route
          path="/ngo"
          element={
            <ProtectedRoute allowedRole="ngo">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<NgoDashboard />} />
          {/* <Route path="profile" element={<Profile />} />
              <Route path="history" element={<NgoHistory />} />
              <Route path="notifications" element={<NgoNotifications />} />
              <Route path="requests" element={<NgoRequests />} /> */}
        </Route>

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/common" element={<Dashboard />}>
          {/* Common routes for all users */}
          {/* <Route path="about" element={<About />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="donorsList" element={<Donors />} />
              <Route path="ngosList" element={<Ngos />} />
              <Route path="recent-activities" element={<RecentActivities />} /> */}
        </Route>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error status={404} />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
