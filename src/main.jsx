import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./abhay/login.jsx";
import Landingpage from "@/Landingpage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./abhay/dashboard/Dashboard";
import ProtectedRoute from './ProtectedRoute.jsx';
import { UserProvider } from '@/auth/UserContext';

function App() {

  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={
              <Login />
          } />
          <Route
            path="/dashboard"
            element={
              // <UserProvider>
              //   <ProtectedRoute>
                  <Dashboard />
              //   </ProtectedRoute>
              // </UserProvider>
            }
          />
        </Routes>
      </Router>
    </StrictMode >
  );
}

createRoot(document.getElementById("root")).render(<App />);

