
import { useState } from 'react'
import styles from './nav.module.css'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

function Nav() {
  const navigate=useNavigate();

  const GoToMainPage=()=>{
    navigate("/main")
  }
  const GoToLoginPage=()=>{
    navigate("/")
  }
  const [ ,removeCookie] = useCookies(['accessToken']);
 
   const deleteCookie = ()=> {
     removeCookie('accessToken',{ path: '/' });
     console.log('로그아웃완료');
   }
  return (
   
    <>
    <nav className={styles.navbox}>
      <p onClick={()=>GoToMainPage()} className={styles.Daliytext}>
        Day Daliys
      </p>
      <div className={styles.nametext}>
       님 환영합니다!
      </div>
      <div className={styles.MyInfoText}>
        내정보
      </div>
      <div className={styles.LogOutText}
      onClick={()=>{deleteCookie(),GoToLoginPage()}}>
        로그아웃
      </div>
    </nav>
  </>
    
  )
}

export default Nav