
import { useState } from 'react'
import styles from './nav.module.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Nav() {
  const navigate=useNavigate();

  const GoToMainPage=()=>{
    navigate("/")
  }
  const GoToLoginPage=()=>{
    navigate("/login")
  }
  const GoToMyInfoPage=()=>{
    navigate("/user-info")
  }

 const api = axios.create({
    baseURL: 'https://daisy.wisoft.io/yehwan/app1',
    withCredentials: true
  })

  const logouthandle = async(e)=>{
    try{
      e.preventDefault();
      const res = await api.post("/auth/logout")
      navigate("/login")
    } catch(err) {
      console.log("logout err", err.response.data)
    }
  }
  

  return (
   
    <>
    <nav className={styles.navbox}>
      <p onClick={()=>GoToMainPage()} className={styles.Daliytext}>
        Day Daliys
      </p>
      <div className={styles.nametext}>
        사용자님 환영합니다!
      </div>
      <div className={styles.MyInfoText}
       onClick={GoToMyInfoPage}>
        내정보
      </div>
      <div className={styles.LogOutText}
      onClick={logouthandle}>
        로그아웃
      </div>
    </nav>
  </>
    
  )
}

export default Nav