// src/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { account, client } from "./appwriteConfig.js";
import { ID, TablesDB } from "appwrite";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [walletUser, setWalletUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tables
  const tablesDB = new TablesDB(client);
  const databaseID = import.meta.env.VITE_DATABASE_ID;
  const tableID = import.meta.env.VITE_TABLE_ID;

  // Get Appwrite user and wallet user from localStorage
  const getUser = async () => {
    try {
      const walletUser = localStorage.getItem("walletUser");
      const res = await account.get();
      if (walletUser) setWalletUser(JSON.parse(walletUser));
      setUser(res);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Appwrite login
  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      await getUser();
    } catch (err) {
      console.error(err);
    }
  };

  // Wallet login
  const loginWithWallet = (address) => {
    const walletUser = { address, type: "wallet" };
    setWalletUser(walletUser);
    localStorage.setItem("walletUser", JSON.stringify(walletUser));
    login("wallet",address);
  };

  // Logout (Appwrite + wallet)
  const logout = async () => {
    try {
      await account.deleteSession("current");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("walletUser");
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => { console.log(walletUser) }, [walletUser])

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithWallet,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
