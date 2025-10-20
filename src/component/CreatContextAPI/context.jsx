// context.jsx
import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { setLogoutHandler } from "./api";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const res = await api.get("/me/info");
        if (res.data?.user_info?.full_name) {
          setIsLogging(true);
          setUser(res.data.user_info.full_name);
        }
      } catch (err) {
        setIsLogging(false);
        setUser("");
        console.log("에러", err.response);
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
      await api.post("/auth/logout");
    } catch (err) {
      console.log("logout err", err.response);
    } finally {
      removeCookie("access_token");
      removeCookie("refresh_token");
      setIsLogging(false);
      setUser("");
      navigate("/login");
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
  if (context === undefined) throw new Error("범위 오류");
  return context;
}
