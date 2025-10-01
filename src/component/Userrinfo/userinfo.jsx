import "react";
import { useEffect, useState } from "react";
import styles from "./userinfo.module.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../CreatContextAPI/api";
import { useMyAvatar } from "../Hook/myavatar";

const ChangePwPage = () => {
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  const feature = `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbar=yes`;
  page = window.open("/changepw", "ChangePwPage", feature);
};

function UserInfo() {
  const avatar = useMyAvatar();
  const navigate = useNavigate();
  const [myData, setMyData] = useState({
    full_name: "",
    email: "",
    registered_at: "",
    diary_count: "",
  });
  const [myDiaryOn, setMyDiaryOn] = useState(false);
  const [myInfoOn, setMyInfoOn] = useState(false);

  useEffect(() => {
    if (!avatar) return;
    const responseData = async () => {
      try {
        const response = await api.get(`/avatars/${avatar}`, {
          withCredentials: true,
        });
        console.log("프로필 불러오기 성공!");
        console.log("avatar 값:", avatar);
      } catch (error) {
        console.log("프로필 불러오기 오류");
      }
    };
    responseData();
  }, [avatar]);
  const updateSetting = async (field, value) => {
    try {
      await api.patch(
        "/me/setting",
        {
          [field]: value,
        },
        { withCredentials: true },
      );
      console.log(`${field} updated to`, value);
    } catch (error) {
      console.error(`${field} 업데이트 실패`, error);
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get("/me/info", { withCredentials: true });
        console.log(response.data.user_info);
        const { full_name, email, registered_at, diary_count } =
          response.data.user_info;
        setMyData({
          full_name,
          email,
          registered_at: registered_at.slice(0, 10),
          diary_count,
        });
      } catch (error) {
        console.log("my info get error");
        console.log("err", error.response);
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const ChangePW = async (msg) => {
      if (msg.data === "ChangePW") {
        console.log("success get msg");
        try {
          const res = await api.post("/auth/logout");
          console.log("success logout", res.data);
        } catch (err) {
          console.log("Change PW Message err", err.response);
        }
        alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
        navigate("/login");
      }
    };
    window.addEventListener("message", ChangePW);
    return () => {
      window.removeEventListener("message", ChangePW);
    };
  }, [navigate]);

  const handleOnClick = () => {
    const newValue = !myDiaryOn;
    setMyDiaryOn(newValue);
    updateSetting("hide_diaries", newValue);
  };

  const handleOnClick2 = () => {
    const newValue = !myInfoOn;
    setMyInfoOn(newValue);
    updateSetting("hide_profile", newValue);
  };

  const profileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className={styles.InfoContainer}>
        <div className={styles.MySecurityBox}>
          <div className={styles.Titlebox}>내 프로필 및 보안</div>
          <img
            src={`https://daisy.wisoft.io/yehwan/app1/avatars/${avatar}`}
            className={styles.ProfileBox}
          ></img>
          <div className={styles.InfoBox}>
            <div onClick={() => profileClick()} className={styles.ProFileLink}>
              프로필 변경하기
            </div>
            <div className={styles.MyDiaryContinaer}>
              <span>내 일기 숨김</span>
              <div
                className={`${styles.DiaryButton} ${myDiaryOn ? styles.isOn : ""}`}
                onClick={handleOnClick}
              >
                <div
                  className={`${styles.Circle} ${myDiaryOn ? styles.UpdateCircle : ""}`}
                ></div>
              </div>
            </div>
            <div className={styles.MyDiaryContinaer}>
              <span>내 정보 숨김</span>
              <div
                className={`${styles.DiaryButton} ${myInfoOn ? styles.isOn : ""}`}
                onClick={handleOnClick2}
              >
                <div
                  className={`${styles.Circle} ${myInfoOn ? styles.UpdateCircle : ""}`}
                ></div>
              </div>
            </div>
            <Link onClick={ChangePwPage} className={styles.PsswordLink}>
              비밀번호 변경하기
            </Link>
          </div>
        </div>

        <div className={styles.MyInfoBox}>
          <div className={styles.Titlebox2}>내 정보</div>
          {myInfoOn ? (
            <div className={styles.LockImgContianer}>
              <img className={styles.LockImg} src="./lock.png"></img>
            </div>
          ) : (
            <>
              <div className={styles.MyInfoBoxflex}>
                <div className={styles.MyInfoBoxInfo}>
                  <p>이름</p>
                  <p>이메일</p>
                  <p>가입일자</p>
                  <p>일기 수</p>
                </div>
                <div className={styles.MyInfoBoxInfo}>
                  <p> {myData.full_name}</p>
                  <p> {myData.email}</p>
                  <p> {myData.registered_at}</p>
                  <p> {myData.diary_count}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.MyActivityCon}>
        <div className={styles.Titlebox3}>내 활동 확인하기</div>
        <div className={styles.MyActivityBox}>
          <div className={styles.RecentActivityBox}>
            <div className={styles.ImgContainer}>
              <img src="./calendar.png" className={styles.DiaryImg}></img>
            </div>
            <Link to="/calendar" className={styles.MyCalenderLink}>
              나의 캘린더 확인하기
            </Link>
            <div className={styles.ImgContainer}>
              <img src="./diary.png" className={styles.DiaryImg}></img>
            </div>

            <Link to="/my-diary" className={styles.MyDiaryLink}>
              나의 일기 확인하기
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserInfo;
