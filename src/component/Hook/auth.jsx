import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "https://daisy.wisoft.io/yehwan/app1",
  withCredentials: true,
});

export const handleError = async (err, navigate) => {
  if (err.response?.data?.errorCode === "TOKEN_EXPIRED") {
    const refresh = await api.post("/auth/refresh");
  } else if (err.response?.data?.errorCode === "TOKEN_NOT_PROVIDED") {
    alert("로그인이 필요합니다.");
    navigate("/login");
  } else if (err.response?.data?.errorCode === "TOKEN_INVALID") {
    alert("다시 로그인 해주세요.");
    navigate("/login");
  }
};
