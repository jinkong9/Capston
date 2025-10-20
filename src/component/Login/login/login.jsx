import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import api from "../../CreatContextAPI/api";
import { useAuth } from "../../CreatContextAPI/context";
import { useCookies } from "react-cookie";

export default function Home() {
  const [info, setInfo] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "refresh_token",
  ]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await api.post("/auth/login", {
        email: info.email,
        password: info.password,
      });
      const { access_token, refresh_token } = res.data;
      setCookie("access_token", access_token, {
        path: "/",
        maxAge: 3600,
        sameSite: "None",
        secure: true,
      });
      setCookie("refresh_token", refresh_token, {
        path: "/",
        maxAge: 604800,
        sameSite: "None",
        secure: true,
      });
      if (res.status === 200) {
        const MeRes = await api.get("/me/info");
        if (MeRes.data?.user_info?.full_name) {
          login(MeRes.data.user_info.full_name);
          navigate("/");
        } else {
          alert("서버오류");
        }
      }
    } catch (err) {
      console.log("ogin err", err);
      if (err.response?.data?.errorCode === "INVALID_CREDENTIAL") {
        alert("이메일 또는 비밀번호를 확인해주세요.");
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div className={style.container}>
      <p className={style.headertext}>회원님의 정보를 입력해주세요 .</p>
      <form className={style.form} onSubmit={handleLogin}>
        <div>
          <div>
            <input
              className={style.inputbox}
              type="email"
              placeholder="이메일을 입력하세요."
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </div>
          <br />
          <div>
            <input
              className={style.inputbox}
              type="password"
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </div>
          <div className={style.GuideContainer}>
            <p className={style.GuideIdMessage}>아직 아이디가 없으신가요?</p>
            <Link to="/join" className={style.SignUpLink}>
              회원 가입
            </Link>
          </div>
        </div>
        <button className={style.submitbutton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
