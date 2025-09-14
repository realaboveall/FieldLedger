import { createContext, useContext, useState, useEffect } from "react";
import { account, client } from "./appwriteConfig.js";
import { ID, Databases, Query } from "appwrite";

const UserContext = createContext();

// 🔑 Setup database client (kept as before)
const databases = new Databases(client);
const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const PRODUCTS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_PRODUCTS_COLLECTION_ID;
const CHATLOGS_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_CHATLOGS_COLLECTION_ID;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [walletUser, setWalletUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const generateEmailFromId = (customId) => `wallet-${customId}@example.com`;

  // -------------------------
  // Existing Appwrite functions (unchanged)
  // -------------------------
  // 🔹 Session handling
  const getUser = async () => {
    try {
      const storedWalletUser = localStorage.getItem("walletUser");
      if (storedWalletUser) {
        try {
          setWalletUser(JSON.parse(storedWalletUser));
        } catch {
          localStorage.removeItem("walletUser");
        }
      }

      const res = await account.get();
      setUser(res);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (customId, password) => {
    const email = generateEmailFromId(customId);
    try {
      await account.createEmailPasswordSession(email, password);
    } catch (err) {
      const status = err.code || err.response?.status;
      if ([400, 401, 404].includes(status)) {
        await account.create(ID.unique(), email, password);
        await account.createEmailPasswordSession(email, password);
      } else {
        throw err;
      }
    } finally {
      await getUser();
    }
  };

  const loginWithWallet = async (address) => {
    if (!address || typeof address !== "string")
      throw new Error("Invalid wallet address");
    const customId = address;
    const password = address; // ⚠️ insecure — for demo only
    await login(customId, password);
    const walletData = { address, type: "wallet" };
    setWalletUser(walletData);
    localStorage.setItem("walletUser", JSON.stringify(walletData));
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
    } catch {}
    localStorage.removeItem("walletUser");
    setUser(null);
    setWalletUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  // 🔹 Products DB helpers (kept)
  const uploadDetails = async (values) => {
    return await databases.createDocument(
      DB_ID,
      PRODUCTS_COLLECTION_ID,
      ID.unique(),
      {
        ...values,
      }
    );
  };

  const retrieveData = async () => {
    const res = await databases.listDocuments(DB_ID, PRODUCTS_COLLECTION_ID, [
      Query.orderDesc("$createdAt"),
    ]);
    return res.documents;
  };

  // 🔹 Chat logs DB helper (kept)
  const retrieveChatLogs = async (cid) => {
    const res = await databases.listDocuments(DB_ID, CHATLOGS_COLLECTION_ID, [
      Query.equal("cid", cid),
      Query.orderAsc("createdAt"),
    ]);
    return res.documents[0]?.messages || [];
  };

  // -------------------------
  // NEW: localStorage helpers (added — do not remove any existing Appwrite functions)
  // -------------------------
  // small wrapper for safe JSON parse/stringify
  const _lsGet = (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  };
  const _lsSet = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("localStorage set error", e);
    }
  };

  // ---- User details (local) ----
  // Save user details locally (useful for demo; does not remove Appwrite login)
  const saveUserLocal = (userDetails) => {
    _lsSet("user_local", userDetails);
    // also keep in-memory user to simplify usage
    setUser((prev) => ({ ...(prev || {}), ...userDetails }));
  };

  const loadUserLocal = () => {
    return _lsGet("user_local", null);
  };

  // ---- Transactions (local) ----
  // transactions stored under key "transactions_local" as array (newest first)
  const loadTransactionsLocal = () => {
    return _lsGet("transactions_local", []);
  };

  const saveTransactionLocal = (tx) => {
    const existing = loadTransactionsLocal() || [];
    const updated = [tx, ...existing];
    _lsSet("transactions_local", updated);
  };

  // ---- Chat logs (local, per CID) ----
  // Saves chat log messages for a CID: stored in object { [cid]: messages[] }
  const saveChatLogsLocal = (cid, messages) => {
    const all = _lsGet("chat_logs_local", {});
    all[cid] = messages;
    _lsSet("chat_logs_local", all);
  };

  const retrieveChatLogsLocal = (cid) => {
    const all = _lsGet("chat_logs_local", {});
    return all[cid] || [];
  };

  // ---- Convenience wrapper: get combined transactions list ----
  // If you want to prefer Appwrite documents but fall back to local, you can call this
  // from components to get the local list quickly.
  const getTransactionsForUI = async () => {
    // Try Appwrite first — but if DB_ID not configured or request fails, fallback to local
    if (DB_ID && PRODUCTS_COLLECTION_ID) {
      try {
        const docs = await retrieveData();
        // Map Appwrite docs into a consistent transaction shape if needed
        return docs.map((d) => ({
          cid: d.cid || d.$id || null,
          product: d,
          createdAt: d.$createdAt || new Date().toISOString(),
        }));
      } catch (e) {
        // fallback
      }
    }
    // fallback to local
    return loadTransactionsLocal();
  };

  // -------------------------
  // Expose everything in contextValue (keeps original API and adds new local helpers)
  // -------------------------
  const contextValue = {
    // original state & functions
    user,
    walletUser,
    loading,
    login,
    loginWithWallet,
    logout,
    uploadDetails,
    retrieveData,
    retrieveChatLogs,

    // NEW localStorage helpers (do not break existing code)
    // User local helpers
    saveUserLocal,
    loadUserLocal,

    // Transactions local helpers
    loadTransactionsLocal,
    saveTransactionLocal,

    // Chat logs local helpers
    saveChatLogsLocal,
    retrieveChatLogsLocal,

    // Convenience (UI)
    getTransactionsForUI,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
