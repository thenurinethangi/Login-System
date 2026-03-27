'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const stored = localStorage.getItem('user');
        if (stored) {
          setUserState(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to restore user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const setUser = (userData: User | null) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUserState(userData);
    } else {
      localStorage.removeItem('user');
      setUserState(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
