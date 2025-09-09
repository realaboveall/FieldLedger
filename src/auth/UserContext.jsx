// src/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from './appwriteConfig.js';

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
            // await getUser();
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

    // useEffect(() => {
    //     getUser();
    // }, []);

    return (
        <UserContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);


