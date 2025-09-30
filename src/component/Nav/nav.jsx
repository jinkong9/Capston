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

  return (
    <>
      <nav className={styles.navbox}>
        <p onClick={() => GoToMainPage()} className={styles.Daliytext}>
          Day Daily
        </p>
        <div className={styles.rightbox}>
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
        </div>
      </nav>
    </>
  );
}

export default Nav;
