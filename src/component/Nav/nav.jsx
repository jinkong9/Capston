import { useEffect, useState } from "react";
import styles from "./nav.module.css";
import { useNavigate } from "react-router-dom";
import api from "../CreatContextAPI/api";
import { handleError } from "../Hook/auth";
import { useAuth } from "../CreatContextAPI/context";

function Nav() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("Login");

  const { isLoading, isLogging, user, logout } = useAuth();
  const navigate = useNavigate();

  const GoToMainPage = () => {
    navigate("/");
  };

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

  const handleLogout = async () => {
    if (!isLogging) {
      navigate("/login");
      return;
    }
    await logout();
  };

  // const logouthandle = async () => {
  //   try {
  //     if (login === "Logout") {
  //       const res = await api.post("/auth/logout");
  //       window.location.reload();
  //     }
  //     if (login === "Login") {
  //       navigate("/login");
  //     }
  //   } catch (err) {
  //     console.log("logout err", err.response.data);
  //   }
  // };

  // const UserName = async () => {
  //   try {
  //     const res = await api.get("/me/info");
  //     if (res.data?.user_info?.full_name) {
  //       setName(res.data.user_info.full_name);
  //       setLogin("Logout");
  //     }
  //   } catch (err) {
  //     console.log("NOT LOGIN", err.response);
  //     if (err.response?.data?.errorCode === "TOKEN_NOT_PROVIDED") {
  //       setName("");
  //       setLogin("Login");
  //     }
  //   }
  // };
  // useEffect(() => {
  //   UserName();
  // }, []);

  return (
    <>
      <nav className={styles.navbox}>
        <p onClick={() => GoToMainPage()} className={styles.Daliytext}>
          Day Daily
        </p>
        <div className={styles.nametext}>
          {isLoading
            ? "불러오는중.."
            : isLogging && user
              ? `${user}님 환영합니다 !`
              : ""}
        </div>
        <div className={styles.MyInfoText} onClick={GoToMyInfoPage}>
          내정보
        </div>
        <div className={styles.LogOutText} onClick={handleLogout}>
          {isLogging ? "Logout" : "Login"}
        </div>
      </nav>
    </>
  );
}

export default Nav;
