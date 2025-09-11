// src/Navbar.jsx
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useUser } from "@/auth/UserContext";
import WalletAuth from "@/WalletAuth";
import { Link } from "react-router-dom";

import logo from "./logo.png";

export default function Navbar() {
  const { user, logout, loginWithWallet } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    // Call UserContext logout (handles Appwrite + wallet)
    await logout();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-Nunito font-bold text-white">
            FieldLedger
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 text-white">
          <a href="/" className=" hover:text-green-600">
            Home
          </a>
          <a href="/Login" className=" hover:text-green-600">
            Login
          </a>
          <a href="/contact" className=" hover:text-green-600">
            Contact
          </a>
          {user && (
            <Link
              to="/dashboard"
              className=" hover:text-green-600 font-semibold">
              Dashboard
            </Link>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          <ConnectButton showBalance={false} chainStatus="none" />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-700 focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 flex flex-col space-y-3">
          <a href="/" className="text-gray-700 hover:text-green-600">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-green-600">
            About
          </a>
          <a href="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </a>
        </div>
      )}

      {/* Invisible listener for wallet auto-login */}
      <WalletAuth onLogin={loginWithWallet} />
    </nav>
  );
}
