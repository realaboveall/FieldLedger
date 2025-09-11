// src/UserContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { account, client } from "./appwriteConfig.js";
import { ID, TablesDB } from "appwrite";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tables
  const tablesDB = new TablesDB(client);
  const databaseID = import.meta.env.VITE_DATABASE_ID;
  const tableID = import.meta.env.VITE_TABLE_ID;

  // Get Appwrite user or wallet user from localStorage
  const getUser = async () => {
    try {
      const res = await account.get();
      setUser(res);
    } catch (err) {
      const walletUser = localStorage.getItem("walletUser");
      if (walletUser) setUser(JSON.parse(walletUser));
      else setUser(null);
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
    setUser(walletUser);
    localStorage.setItem("walletUser", JSON.stringify(walletUser));
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

  // Upload / retrieve tables (optional)
  const uploadDetails = async (data) => {
    try {
      const res = await tablesDB.createRow(
        databaseID,
        tableID,
        ID.unique(),
        data
      );
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const retrieveData = async () => {
    try {
      const res = await tablesDB.listRows({
        databaseId: databaseID,
        tableId: tableID,
      });
      return res.rows;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithWallet,
        logout,
        uploadDetails,
        retrieveData,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
