import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { account, client } from "./appwriteConfig.js";
// Remove unused imports: ID, TablesDB

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [walletUser, setWalletUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  // Remove unused database variables or implement them properly
  // const databaseID = import.meta.env.VITE_DATABASE_ID;
  // const tableID = import.meta.env.VITE_TABLE_ID;

  const generateEmailFromId = (customId) => `${customId}@example.com`;

  const getUser = async () => {
    try {
      // Get wallet user from localStorage
      const storedWalletUser = localStorage.getItem("walletUser");
      if (storedWalletUser) {
        try {
          setWalletUser(JSON.parse(storedWalletUser));
        } catch (parseError) {
          console.warn("Invalid wallet user data in localStorage:", parseError);
          localStorage.removeItem("walletUser");
        }
      }

      // Get current session
      const res = await account.get();
      setUser(res);
    } catch (err) {
      console.log("No user session:", err.message || err);
      // Clear invalid session data
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (customId, password) => {
    const email = generateEmailFromId(customId);
    try {
      await account.createEmailPasswordSession(email, password);
      await getUser();
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const loginWithWallet = async (address) => {
    if (!address || typeof address !== 'string') {
      throw new Error("Invalid wallet address");
    }

    const customId = address;
    const email = generateEmailFromId(customId);
    // WARNING: Using address as password is insecure - consider better auth method
    const password = address;

    try {
      await login(customId, password);
      const walletData = { address, type: "wallet" };
      setWalletUser(walletData);
      localStorage.setItem("walletUser", JSON.stringify(walletData));
    } catch (err) {
      if (err.code === 401 || err.code === 404) {
        console.log("User not found, need to signup first");
        // Handle signup redirect when navigate is available
        // navigate("/signup", { state: { customId, password } });
        throw new Error("User not found. Please sign up first.");
      } else {
        console.error("Unexpected login error:", err);
        throw err;
      }
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.error("Logout error:", err);
      // Continue with cleanup even if session deletion fails
    } finally {
      // Cleanup local state and storage
      localStorage.removeItem("walletUser");
      setUser(null);
      setWalletUser(null);
      
      // Handle navigation when available
      // navigate("/login");
      // For now, you might want to use window.location or emit an event
      console.log("User logged out - redirect to login needed");
    }
  };

  // Cleanup function for component unmount
  useEffect(() => {
    getUser();
    
    // Optional: Return cleanup function
    return () => {
      // Any cleanup needed on unmount
    };
  }, []);

  useEffect(() => {
    console.log("Wallet user:", walletUser);
  }, [walletUser]);

  const contextValue = {
    user,
    walletUser,
    loading,
    login,
    loginWithWallet,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};