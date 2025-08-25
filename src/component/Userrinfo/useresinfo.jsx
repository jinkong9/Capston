import "react";
import { useEffect, useState } from "react";
import styles from "./usersinfo.module.css";
import Nav from "../Nav/nav";
import { Link  } from "react-router-dom";
import axios from "axios";
import { useMyAvatar } from "../Hook/myavatar";
import { useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";


function UsersInfo() {
  const navigate=useNavigate()
  const avatar = useMyAvatar();
  const location=useLocation()
  const diary=location.state?.diary
  useEffect(() => {
    
    const responseData = async () => {
      try {
        const response = await axios.get(
          `https://daisy.wisoft.io/yehwan/app1/avatars/${diary.author.avatar}`,
          { withCredentials: true },
        );
        console.log("프로필 불러오기 성공!");
        console.log("diary",diary);
      } catch (error) {
        console.log("프로필 불러오기 오류");
      }
    };
    responseData();
  }, [avatar]);


  

  return (
    <>
      <Nav></Nav>
      <div className={styles.InfoContainer}>
        <div className={styles.MySecurityBox}>
          <div className={styles.Titlebox}>사용자 프로필 및 정보 </div>
          <img src={`https://daisy.wisoft.io/yehwan/app1/avatars/${diary.author.avatar}`} className={styles.ProfileBox}></img>
          <div className={styles.InfoBox}>
                <p className={styles.InfoItem}>이름 </p>
                <p className={styles.InfoItem}>이메일</p>
                <p className={styles.InfoItem}>가입 날짜</p>
                <p className={styles.InfoItem}>등록 된 일기</p>
          </div>
        </div>
        
       

      
      </div>
      <div className={styles.MyDIaryStateContianer}>
        <div className={styles.Titlebox3}>사용자 활동 </div>

        <div className={styles.RecentActivityBox}>
          <div className={styles.ImgContainer}>
            <img src="./diary.png" className={styles.DiaryImg}></img>
          </div>

          <Link  to="/users-diaries" state={{ diary }} className={styles.MyDiaryLink}>사용자의 일기 확인하기</Link>
        </div>
      </div>
    </>
  );
}
export default UsersInfo;
