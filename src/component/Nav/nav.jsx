
import { useState } from 'react'

import styles from './nav.module.css'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const navigate=useNavigate();

  const GoToMainPage=()=>{
    navigate("/")
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
      <div className={styles.LogOutText}>
        로그아웃
      </div>
    </nav>
  </>
    
  )
}

export default Nav