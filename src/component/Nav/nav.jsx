import { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleError } from "../Hook/auth";

function Nav() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("Login");

  const navigate = useNavigate();

  const GoToMainPage = () => {
    navigate("/");
  };

  const api = axios.create({
    baseURL: "https://daisy.wisoft.io/yehwan/app1",
    withCredentials: true,
  });

  const GoToMyInfoPage = async () => {
    try {
      const res = await api.get("/me");
      console.log("good", res.data);
      if (res.data) {
        navigate("/user-info");
      }
    } catch (err) {
      await handleError(err, navigate);
    }
  };

  const logouthandle = async () => {
    try {
      if (login === "Logout") {
        const res = await api.post("/auth/logout");
        window.location.reload();
      }
      if (login === "Login") {
        navigate("/login");
      }
    } catch (err) {
      console.log("logout err", err.response.data);
    }
  };

  const UserName = async () => {
    try {
      const res = await api.get("/me/info");
      if (res.data?.user_info?.full_name) {
        setName(res.data.user_info.full_name);
        setLogin("Logout");
      }
    } catch (err) {
      console.log("NOT LOGIN", err.response);
      if (err.response?.data?.errorCode === "TOKEN_NOT_PROVIDED") {
        setName("");
        setLogin("Login");
      }
    }
  };
  useEffect(() => {
    UserName();
  }, []);

  return (
    <>
      <nav className={styles.navbox}>
        <p onClick={() => GoToMainPage()} className={styles.Daliytext}>
          Day Daliys
        </p>
        <div className={styles.nametext}>
          {name ? `${name}님 환영합니다 !` : "로그인이 필요합니다."}
        </div>
        <div className={styles.MyInfoText} onClick={GoToMyInfoPage}>
          내정보
        </div>
        <div className={styles.LogOutText} onClick={logouthandle}>
          {login}
        </div>
      </nav>
    </>
  );
}

export default Nav;
