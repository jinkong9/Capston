import "react";
import { useEffect, useState } from "react";
import styles from "./exinfo.module.css";
import Nav from "../Nav/nav";
import { Link } from "react-router-dom";
import api from "../CreatContextAPI/api";
import { useMyAvatar } from "../Hook/myavatar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ExInfo() {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    registered_at: "",
    diary_count: "",
  });
  const avatar = useMyAvatar();
  const location = useLocation();
  const diary = location.state?.diary;
  useEffect(() => {
    const responseData = async () => {
      try {
        const response = await api.get(`/avatars/${diary.author.avatar}`);
        console.log("diary", diary);
      } catch (error) {
        console.log("프로필 불러오기 오류", error.response.data);
      }
    };
    responseData();
  }, [avatar]);
  useEffect(() => {
    const responseMyData = async () => {
      try {
        const response = await api.get(`/users/${diary.author.id}`);
        console.log("유저정보 불러오기 성공!", response.data.user_info);
        const { full_name, email, registered_at, diary_count } =
          response.data.user_info;
        setUserData({
          full_name,
          email,
          registered_at: registered_at.slice(0, 10),
          diary_count,
        });
      } catch (error) {
        console.log(" 유저 정보 불러오기 오류", error);
        alert("유저 정보를 불러오는데 실패했습니다.");
        navigate(-1);
      }
    };
    responseMyData();
  }, [avatar]);

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.InfoContainer}>
          <div className={styles.Titlebox}>사용자 프로필 및 정보 </div>
          <div className={styles.MySecurityBox}>
            <div className={styles.ImgInfoFlex}>
              <img
                src={`https://daisy.wisoft.io/yehwan/app1/avatars/${diary.author.avatar}`}
                className={styles.ProfileBox}
              ></img>
              <div className={styles.InfoFlex}>
                <div className={styles.Infobox}>
                  <p>이름: </p>
                  <p>이메일:</p>
                  <p>가입 날짜:</p>
                  <p>등록 된 일기:</p>
                </div>
                <div className={styles.Infobox2}>
                  <p> {userData.full_name}</p>
                  <p> {userData.email}</p>
                  <p> {userData.registered_at}</p>
                  <p> {userData.diary_count}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.MyDIaryStateContianer}>
          <div className={styles.Titlebox2}>사용자 활동 </div>
          <div className={styles.RecentActivityBox}>
            <img src="./diary.png" className={styles.DiaryImg}></img>
            <Link
              to="/users-diaries"
              state={{ diary }}
              className={styles.MyDiaryLink}
            >
              사용자의 일기 확인하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default ExInfo;
