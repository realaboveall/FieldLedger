import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./abhay/login.jsx";
import Landingpage from "@/Landingpage.jsx";
import Dashboard from "./abhay/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/auth/UserContext";

// 🌈 RainbowKit + Wagmi imports
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

// ✅ Wagmi config
const config = getDefaultConfig({
  appName: "FieldLedger",
  projectId: "246e8b03d111f91f034b4566b3c068e7", // Replace with your WalletConnect Project ID
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: false,
});

// ✅ React Query client for wagmi
const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider chains={config.chains}>
            <UserProvider>
              {" "}
              {/* ✅ Wrap the entire app so all children can use useUser */}
              <Router>
                <Routes>
                  <Route path="/" element={<Landingpage />} />
                  <Route path="/login" element={<Landingpage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
            </UserProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<App />);
