import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import useWebSocket from './useWebsocket'

// Component imports
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';

import Dashboard from './components/dashboard/Dashboard.jsx';
import Error from './components/common/Error.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import { Toaster } from 'react-hot-toast';
import Notifications from './components/common/Notifications.jsx';
import HomePage from './components/Dummy-pages/homepage.jsx';
import About from './components/Dummy-pages/aboutpage.jsx';
import History from './components/common/History.jsx';
import Users from './components/dashboard/admin/Users.jsx';
import Postings from './components/dashboard/donor/postings.jsx';
import AvailableDonations from './components/dashboard/ngo/AvailableDonations.jsx';

function App() {
  console.log(useWebSocket());
  const { token } = useSelector(state => state.auth);
  const { mode } = useSelector(state => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route path='/home' element ={<HomePage/>}/>
          <Route path='/about' element ={<About/>}/>
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Error code="403" />} />
          <Route path="/error" element={<Error code="500" />} />
          <Route path="/not-found" element={<Error code="404" />} />

          {/* Home Route */}
          <Route
            path="/"
            element={<Navigate to={token ? "/dashboard" : "/login"} />}
          />
          <Route
            path="/notifications"
            element={<Notifications/>}
          />
          <Route path="/availabledonations" element={<AvailableDonations/>} /> 
          <Route path="/postings" element={<Postings/>} /> 
          <Route path="/admin/users" element={<Users/>} /> 
          <Route path="/history" element={<History/>} />
          {/* Catch All */}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;