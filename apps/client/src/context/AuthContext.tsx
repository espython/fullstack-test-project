import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe, login as loginApi, logout as logoutApi } from "../services/api";


export type User = {
	id: string;
	email: string;
	name: string;
} | null
export type AuthContextType = {
  user:User;
  login: (email: string, password: string) => Promise<User>;
  logout: (email: string, password: string) => Promise<void>;
};
const AuthContext = createContext<AuthContextType|null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await getMe();
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginApi({ email, password });
    setUser(response.data);
    return response.data;
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
