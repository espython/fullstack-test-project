import React, { createContext, useState, useContext, useEffect } from "react";
import { getMe, login as loginApi, logout as logoutApi ,register as registerApi} from "../services/api";
import { useNavigate } from "react-router-dom";


export type User = {
	id: string;
	email: string;
	name: string;
} | null
export type AuthContextType = {
  user:User;
  login: (email: string, password: string) => Promise<User>;
  logout: (email: string, password: string) => Promise<void>;
  register: (name :string,email: string, password: string) => Promise<User>;
};
const AuthContext = createContext<AuthContextType|null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await getMe();
      
      setUser(response.data);
      navigate('/')
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginApi({ username:email, password });
    console.log({response})
    setUser(response.data);
    return response.data;
  };

  const register = async (name :string,email: string, password: string) => {
    const response = await registerApi({ name,email, password });
    console.log({response})
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
    <AuthContext.Provider value={{ user, login, logout,register }}>
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
