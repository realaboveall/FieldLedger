import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./abhay/login.jsx";
import Landingpage from "./Landingpage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./abhay/Dashboard";
import ProtectedRoute from './ProtectedRoute.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);

