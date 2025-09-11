import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import ProductDetailsForm from "./ProductDetailsForm";
import PreviousTransactions from "./PreviousTransactions";
import { useUser } from "@/auth/UserContext";

export default function Dashboard() {
  const { user, loading, logout } = useUser();
  const [page, setPage] = useState("Form");
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    console.log("Current page:", page);
  }, [page]);

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

  // -----------------------------
  // Safe display name and email/address
  // -----------------------------
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

  // ✅ Updated logout function
  const handleLogout = async () => {
    await logout();
    navigate("/"); // redirect to home page
  };

  return (
    <div className="">
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
        />

        <SidebarInset>
          <SiteHeader
            page={page}
            userName={safeUser.displayName}
            logout={handleLogout}
          />

          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 p-10">
                {page === "Form" && <ProductDetailsForm />}
                {page === "Transactions" && <PreviousTransactions />}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
