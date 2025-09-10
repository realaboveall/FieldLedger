// src/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { account, client } from './appwriteConfig.js';
import { ID, TablesDB } from 'appwrite';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            const res = await account.get();
            setUser(res);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            await account.createEmailPasswordSession(email, password);
            await getUser();
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    const uploadDetails = async (data) => {
        const tablesDB = new TablesDB(client);

        const databaseID = import.meta.env.VITE_DATABASE_ID
        const tableID = import.meta.env.VITE_TABLE_ID

        try {
            const response = await tablesDB.createRow(
                databaseID,
                tableID,
                ID.unique(), 
                data
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, login, logout, uploadDetails }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);


