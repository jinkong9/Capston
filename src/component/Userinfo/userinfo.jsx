import "react"
import { useEffect, useState } from "react"
import styles from "./userinfo.module.css"
import Nav from "../Nav/nav"
import { Link } from "react-router-dom"
import axios from "axios"

const ChangePwPage = () =>{
  const width = 600;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  const feature = `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbar=no`
  page = window.open(
    '/changepw',
    'ChangePwPage',
    feature
  ); //사용할 컴포넌트에 입력하기 
} //handlesubmit으로 api연결하고 유효성 검사하고 팝업닫기도 한번에 넣고 useState로 정보들 담기

function UserInfo(){
   const[myData,setMyData]=useState({
     full_name:"",
     email :"",
     registered_at: "",
     diary_count: ""
   })

     const api = axios.create({
    baseURL: 'https://daisy.wisoft.io/yehwan/app1',
    withCredentials: true
  })
  
    const [myDiaryOn, setMyDiaryOn]=useState(false);
    const [myInfoOn, setMyInfoOn]=useState(false);
    const updateSetting=async(field, value)=>{
      try{
        await axios.patch("https://daisy.wisoft.io/yehwan/app1/me/setting",{
          [field]:value
          
        })
        console.log(`${field} updated to`, value);


      }
      catch(error){
         console.error(`${field} 업데이트 실패`, error);

      }

    }

    
    
    const handleOnClick=()=>{
        const newValue=!myDiaryOn
        setMyDiaryOn(newValue)
        updateSetting("hide_diaries", newValue)


    }
    useEffect(()=>{
  
  
  
  
        const getUserData=async()=>{
          try{
            const response=await axios.get("https://daisy.wisoft.io/yehwan/app1/me/info")
            console.log(response.data.user_info);
            const {full_name, email, registered_at,diary_count}=response.data.user_info;
            setMyData({full_name, email, registered_at: registered_at.slice(0,10),diary_count})
    

          }

          catch(error){
            console.log("my info get error")


          }
      
    }
    getUserData();
  },[] )


    
     const handleOnClick2=()=>{
       const newValue=!myInfoOn;
       setMyInfoOn(newValue);
       updateSetting("hide_profile", newValue)

    }

    return(
        <>
        <Nav></Nav>
        <div className={styles.InfoContainer}>
            <div className={styles.MySecurityBox}> 
              <div className={styles.Titlebox}>내 프로필 및 보안</div>
              <div className={styles.ProfileBox}></div>
              <div className={styles.InfoBox}>
                <Link className={styles.ProFileLink}>프로필 변경하기</Link>
                <div className={styles.MyDiaryContinaer}>
                  <span>내 일기 숨김</span>  
                  <div className={`${styles.DiaryButton} ${myDiaryOn ? styles.isOn: ""}`} onClick={handleOnClick} >
                    <div className={`${styles.Circle} ${myDiaryOn ? styles.UpdateCircle : ""}`}></div>
                  </div>
                </div>
                  <div className={styles.MyDiaryContinaer}>
                  <span>내 정보 숨김</span>  
                  <div className={`${styles.DiaryButton} ${myInfoOn ? styles.isOn: ""}`} onClick={handleOnClick2} >
                    <div className={`${styles.Circle} ${myInfoOn? styles.UpdateCircle : ""}`}></div>
                  </div>
                </div>
                <Link onClick={ChangePwPage}
                className={styles.PsswordLink}>비밀번호 변경하기</Link>

              </div>
            </div>

            <div className={styles.MyInfoBox}>  
               <div className={styles.Titlebox2}>내 정보</div>
               {myInfoOn ? (
               <div className={styles.LockImgContianer}>
                <img className={styles.LockImg} src="./lock.png"></img>
                </div>
                
               ):(
               <>
            
               <div className={styles.MySecreatContainer}>
                <p>이름</p>
                <p>이메일</p>
                <p>가입 날짜</p>
                <p>등록 된 일기</p>

               </div>

          <div className={styles.MySecreatInfoContainer}>
            
                <p>{myData.full_name}</p>
                <p>{myData.email}</p>
                <p>{myData.registered_at}</p>
                <p>{myData.diary_count}</p>

               </div>
               </>
       )}
</div>
             


        </div>
         <div className={styles.MyDIaryStateContianer}>
        <div className={styles.Titlebox3}>내 활동 확인하기</div>
     
        <div className={styles.RecentActivityBox}>
          <div className={styles.ImgContainer}>
            <img src="./calendar.png" className={styles.DiaryImg}></img>
          </div>
          <Link className={styles.MyCalenderLink}>나의 캘린더 확인하기</Link>
            <div className={styles.ImgContainer}>
            <img src="./diary.png" className={styles.DiaryImg}></img>
          </div>

          <Link className={styles.MyDiaryLink}>나의 일기 확인하기</Link>

     
        </div>

           
          </div>


        </>
    )

}
export default UserInfo