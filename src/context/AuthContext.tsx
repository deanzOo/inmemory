'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken, UserPayload } from '@/lib/auth';

interface AuthContextProps {
    user: UserPayload | null;
    setUser: React.Dispatch<React.SetStateAction<UserPayload | null>>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children, token }: { children: ReactNode, token?: string }) => {
    const [user, setUser] = useState<UserPayload | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (token) {
            verifyToken(token).then(setUser).catch(() => setUser(null));
        }
    }, []);

    const logout = () => {
        setUser(null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
