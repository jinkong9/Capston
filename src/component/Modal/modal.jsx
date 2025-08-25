import React, { useEffect } from "react";
import styles from "./modal.module.css"
import { useModalContext } from "../CreatContextAPI/modalContext";

function ModalPage(){
   const {modalState, SetModalState}=useModalContext()
    if (!modalState) return null

    useEffect(()=>{
      console.log("모달 상태", modalState)
    },[modalState])

    return(

      <div className={styles.OverRay} onClick={()=> SetModalState(null)} >
       <div className={styles.BodyContainer} onClick={(e)=>e.stopPropagation()}>
            <form  className={styles.FormCotainer}>
              <div  className={styles.InputTtitle}> {modalState.title}   
          </div>
              <br />
              <div className={styles.MyInfoBox}>
                <div className={styles.NameBox}>{modalState.author.full_name}</div>
                <div className={styles.DayBox}>{new Date(modalState.created_at).toLocaleDateString("ko-KR",{timeZone:"Asia/Seoul"})}</div>
              </div>
              <div className={styles.Line}></div>                                 
              <div  className={styles.InputText}>
                {modalState.content}
               
              </div>
         
              <br />
            
            </form>
            </div>
          </div>
    )




}
export default ModalPage;