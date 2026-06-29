"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  name: string;
  email: string;
  role?: string;
  institution?: string;
  accountType: "individual" | "company";
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, name?: string) => Promise<boolean>;
  signup: (userData: User) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("linguedu_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, name?: string): Promise<boolean> => {
    // Simulated async check
    await new Promise((resolve) => setTimeout(resolve, 600));
    const defaultUser: User = {
      name: name || email.split("@")[0],
      email: email,
      accountType: "individual",
    };
    localStorage.setItem("linguedu_user", JSON.stringify(defaultUser));
    setUser(defaultUser);
    setIsLoggedIn(true);
    return true;
  };

  const signup = async (userData: User): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    localStorage.setItem("linguedu_user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem("linguedu_user");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default useAuth;
