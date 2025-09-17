import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const res = await api.get("/me/info");
        if (res.data?.user_info?.full_name) {
          setIsLogging(true);
          setUser(res.data?.user_info?.full_name);
        }
      } catch (err) {
        console.log("로그인 필요", err.response);
        setIsLogging(false);
        setUser("");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthState();
  }, []);

  const login = (userData) => {
    setIsLogging(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      console.log(res);
    } catch (err) {
      console.log("로그아웃 err", err.response);
    } finally {
      setIsLogging(false);
      setUser("");
    }
  };

  const value = {
    isLogging,
    isLoading,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("범위 오류");
  }
  return context;
}
