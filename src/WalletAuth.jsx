// src/WalletAuth.jsx
import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

export default function WalletAuth({ onLogin }) {
  const { address, isConnected } = useAccount();
  const hasLoggedIn = useRef(false);

  useEffect(() => {
    if (isConnected && address && !hasLoggedIn.current) {
      onLogin(address);
      hasLoggedIn.current = true;
    }
    if (!isConnected) hasLoggedIn.current = false;
  }, [isConnected, address, onLogin]);

  return null;
}
