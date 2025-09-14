import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import ProductDetailsForm from "./ProductDetailsForm";
import PreviousTransactions from "./PreviousTransactions";
import Chatbox from "./ChatBox";
import { useUser } from "@/auth/UserContext";


// import farmer from "/img/farmer.png"

export default function Dashboard() {
  const { user, loading, logout } = useUser();
  const [page, setPage] = useState("Form");
  const [role, setRole] = useState(() => localStorage.getItem("role") || null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Current page:", page);
  // }, [page]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Not logged in
      </div>
    );
  }

  // --------------------------
  // User display formatting
  // --------------------------
  const displayName = user?.isWallet
    ? user.address
      ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}`
      : "Wallet User"
    : user?.name || user?.email || "Guest";

  const displayEmailOrAddress = user?.isWallet
    ? user?.address || "Unknown Wallet"
    : user?.email || "No Email";

  const safeUser = {
    ...user,
    displayName,
    displayEmailOrAddress,
  };

  // --------------------------
  // Role handling
  // --------------------------
  const roleLabels = {
    farmer: { label: "Farmer 👩‍🌾", color: "green" },
    distributor: { label: "Distributor 🚚", color: "blue" },
    retailer: { label: "Retailer 🏬", color: "purple" },
    customer: { label: "Customer 🛒", color: "orange" },
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleSwitchRole = () => {
    localStorage.removeItem("role");
    setRole(null);
  };

  // --------------------------
  // Role cards
  // --------------------------
  const roles = [
    {
      id: "farmer",
      label: "Farmer 👩‍🌾",
      desc: "Register your products",
      img: "/img/farmer.jpg",
    },
    {
      id: "distributor",
      label: "Distributor 🚚",
      desc: "Manage logistics",
      img: "/img/packager.jpg",
    },
    {
      id: "retailer",
      label: "Retailer 🏬",
      desc: "Track supply chain",
      img: "/img/retailer.jpg",
    },
    {
      id: "customer",
      label: "Customer 🛒",
      desc: "Verify authenticity",
      img: "/img/customer.jpg",
    },
  ];

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}>
      <AppSidebar
        variant="inset"
        user={{
          name: safeUser.displayName,
          email: safeUser.displayEmailOrAddress,
        }}
        setPage={setPage}
        page={page}
        highlightColor={roleLabels[role]?.color || "gray"} // 🎨 role-based sidebar highlight
      />

      <SidebarInset>
        <SiteHeader
          page={page}
          userName={safeUser.displayName}
          logout={handleLogout}
        />

        <div className="flex flex-1 flex-col p-10">
          {/* --- Welcome Header --- */}
          {role && (
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Welcome back, AboveAll!
                </h2>
                <p className="text-sm text-gray-500">
                  0xe97939c9e0d2c473119a7db694f1b7d830ad104e
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium bg-${roleLabels[role].color}-100 text-${roleLabels[role].color}-800`}>
                  {roleLabels[role].label}
                </span>
                <button
                  onClick={handleSwitchRole}
                  className="px-3 py-1 text-sm rounded-lg bg-gray-200 hover:bg-green-500 hover:text-white transition-colors">
                  Switch Role
                </button>
              </div>
            </div>
          )}

          {/* --- Role Selection / Role-Specific Dashboard --- */}
          {!role ? (
            // --- Role selection screen ---
            <div className="flex flex-col items-center justify-center flex-1 space-y-8">
              <h1 className="text-4xl font-extrabold text-center text-gray-800">
                Welcome to FieldLedger
              </h1>
              <p className="text-gray-500 text-lg text-center">
                Select your role to continue:
              </p>
              <div className="grid grid-cols-2 gap-10 w-full max-w-5xl">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      localStorage.setItem("role", r.id);
                    }}
                    className="relative h-[40vh] rounded-3xl shadow-lg overflow-hidden 
                               hover:shadow-2xl hover:border-green-500 transform hover:-translate-y-1 
                               transition-all flex flex-col justify-end text-left">
                    {/* Background image */}
                    <img
                      src={r.img}
                      alt={r.label}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-30" />
                    {/* Text content */}
                    <div className="relative p-6 text-white z-10">
                      <span className="block text-3xl font-bold">
                        {r.label}
                      </span>
                      <span className="block text-lg mt-2 opacity-90">
                        {r.desc}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : role === "customer" ? (
            // --- Customer flow: only chatbot ---
            <div className="flex flex-col flex-1 justify-center items-center">
              <div className="w-[40%] border rounded-xl p-6 shadow-lg bg-white">
                <Chatbox defaultMode="verify" />
              </div>
            </div>
          ) : (
            // --- Other roles: full dashboard ---
            <div className="flex flex-col gap-6">
              {page === "Form" && <ProductDetailsForm />}
              {page === "Transactions" && <PreviousTransactions />}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
