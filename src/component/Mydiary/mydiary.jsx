import React from "react";
import Nav from "../Nav/nav";
import styles from "./mydiary.module.css"
import { useState,useEffect } from 'react'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { set } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "../CreatContextAPI/modalContext";
import ModalPage from "../Modal/modal";

function MyDiaryList (){
  const {modalState, SetModalState}=useModalContext()
  const navigate=useNavigate();
  const [diaryList,setDiaryList]=useState([]);
  const [sortState,setSortState]=useState("new");
  const sortDiaryList=[...diaryList].sort((a,b)=> {
  const dateA= new Date(a.created_at)
  const dateB= new Date(b.created_at)
 
    return sortState==="new" ? dateB-dateA: dateA-dateB;

   })

   
  useEffect(() => {
    const getMyDiary=async()=>{
        try {
            const response=await axios.get(
                "https://daisy.wisoft.io/yehwan/app1/me/diaries",
                { withCredentials: true },

            );
            console.log(response.data)
            setDiaryList(response.data.diaries)


            
        } catch (error) {
            console.error("나의 일기 불러오기 오류",error)

        }
    }

   getMyDiary();
   
    
     }, []);

     const deleteDiary=async(id)=>{
      try{
        const response=await axios.delete(
          `https://daisy.wisoft.io/yehwan/app1/me/diaries/${id}`,
          {  withCredentials: true  })
          setDiaryList((prev)=>prev.filter((diary) => diary.id!==id))
          alert("삭제가 완료되었습니다")

      } catch(error){
          console.error("일기 삭제 오류", error)

      }

     }
      const goToEditPage=(diary)=>{
        navigate("/edit-diary", {state:{diary}})
      }





    return(
        <>
        <Nav></Nav>
      

        <main className={styles.MainContainer}>
            <h2 className={styles.MainTitle}>내 일기모음</h2>
           
              <div className={styles.SortButton} onClick={()=> sortState==="new" ? setSortState("old"):setSortState("new")}>
                {sortState==="new" ? "최신 순" : "오래된 순"}
              </div>
           
            <div  className={styles.DailyListWrapper}>
                 {sortDiaryList.map((diary) => (
                <div onClick={()=>SetModalState(diary)} key={diary.id} className={styles.DaliyBox}>
                 <p className={styles.DaliyTitleText}>{diary.author.full_name}님의 일기</p>
                <span className={styles.DaliyTitle2Text}>{diary.title.length>10 ? diary.title.substring(0,10)+ "..." : diary.title}</span>
                <span className={styles.DateText}>{new Date(diary.created_at).toLocaleDateString("ko-KR",{timeZone:"Asia/Seoul"})}</span>
                <div className={styles.Line}></div>
                <div className={styles.DaliyContentText}>{diary.content.length>10? diary.content.substring(0,10)+"...":diary.content}</div>
                <div className={styles.ButtonContainer}>
                 <button onClick={(e)=>{e.stopPropagation(),deleteDiary(diary.id)}} className={styles.DeleteButton}>삭제 버튼</button>
                 <button onClick={(e)=>{e.stopPropagation(),goToEditPage(diary)}} className={styles.EditButton}>수정 버튼</button>
                 </div>
             </div>
             
             
      
              ))}

                
            </div>
          </main>
          {modalState && (
            <ModalPage
              
             
            />
          )}
                  </> )
}
export default MyDiaryList;

