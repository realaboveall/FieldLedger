import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
<<<<<<< HEAD
import App from "./App.jsx";
import Home from "./Home.jsx";
import Problem from "./Problem.jsx";
import Chatbox from "./ChatBox.jsx";
import ScrollAnimationSection from "./ScrollAnimationSection.jsx";
import Navbar from "./Navbar.jsx";
import ScrollAnimationSectionNodes from "./ScrollAnimationSectionNodes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Navbar /> */}
    <App />
    <Home />
    <Chatbox />
    <ScrollAnimationSectionNodes />
    {/* <Problem /> */}
  </StrictMode>
);
=======
import Login from "./abhay/login.jsx";
import Landingpage from "./landingpage.jsx";
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
            <UserProvider>
              <Login />
            </UserProvider>
          } />
          <Route
            path="/dashboard"
            element={
              <UserProvider>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </UserProvider>
            }
          />
        </Routes>
      </Router>
    </StrictMode >
  );
}

createRoot(document.getElementById("root")).render(<App />);

>>>>>>> abhay
