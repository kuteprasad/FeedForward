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
import HomePage from "./components/Dummy-pages/homepage.jsx";
import About from "./components/Dummy-pages/aboutpage.jsx";
import Postings from "./components/dashboard/donor/MyDonations.jsx";
import MyDonations from "./components/dashboard/donor/MyDonations.jsx";
import CreateDonation from "./CreateDonation.jsx";
import MyRequest from "./components/dashboard/ngo/MyRequest.jsx";
import AvailableDonations from "./components/dashboard/ngo/AvailableDonations.jsx";
import History from "./components/common/History.jsx";
import Profile from "./components/common/profile.jsx";
import NgoRequestBox from "./components/dashboard/admin/NgoRequestBox.jsx";
import NgoDashboard from "./components/dashboard/ngo/NgoDashboard.jsx";

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
		  <Route
						path="/ngoList"
						element={<NgoRequestBox />}
					/>
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
              <Route path="dashboard" element={<DonorDashboard />} />
              <Route path="profile" element={<Profile/>}/>
              <Route path="Mydonations" element={<MyDonations />} />
              <Route path="createDonations" element={<CreateDonation />} />
             
              <Route path="notifications" element={<Notifications />} />
              <Route path="history" element={<History/>} />

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
              {/* <Route path="profile" element={<Profile />} /> */}
              <Route path="dashboard" element={<NgoDashboard />} />
              <Route path="profile" element={<Profile/>}/>
              <Route path="history" element={<History />} />
              <Route path="availabledonations" element={<AvailableDonations />} />
              <Route path="myrequests" element={<MyRequest />} />
              <Route path="notifications" element={<Notifications />} />
			  <Route
						path="/verifyNgo"
						element={<NgoDashboard />}
					/>
             
              
        </Route>

        <Route path="/notifications" element={<Notifications />} />

        <Route path="/common" element={<AuthLayout />}>
        <Route path="about" element={<About/>} />
        <Route path="home" element={<HomePage/>} />
         
       

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
