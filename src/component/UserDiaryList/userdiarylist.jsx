import React from "react";
import Nav from "../Nav/nav";
import styles from "./userdiarylist.module.css"
import { useState,useEffect } from 'react'
import { useLocation } from "react-router-dom";

function UserDiaryList (){
const {state}=useLocation();

const [searchKeyword,SetSearchKeyword]=useState("")
const [diaryList,setDiaryList]=useState([]);
const [sortState,setSortState]=useState("new");




  const filterDiaryList=[...diaryList].filter(diary=>diary.title.includes(searchKeyword))
  const sortDiaryList=[...filterDiaryList].sort((a,b)=> {
  const dateA= new Date(a.date)
  const dateB= new Date(b.date)

    return sortState==="new" ? dateB-dateA: dateA-dateB;

   })
 useEffect(() => {
    if (state && state.diaryListData) {
      setDiaryList(state.diaryListData);
    } else {
      
      setDiaryList([]);
    }
  }, [state]);



    return(
        <>
        <Nav></Nav>
      

        <main className={styles.MainContainer}>
            <h2 className={styles.MainTitle}>다른 사람들이 쓴 일기에요!</h2>
            <input placeholder="제목을 입력하세요"
                   type="text"
                   value={searchKeyword}
                   onChange={(e)=>SetSearchKeyword(e.target.value)}
                   className={styles.TitleInputBox}/>
           
              <div className={styles.SortButton} onClick={()=> sortState==="new" ? setSortState("old"):setSortState("new")}>
                {sortState==="new" ? "최신 순" : "오래된 순"}
              </div>
           
            <div className={styles.DailyListWrapper}>
                 {sortDiaryList.map((diary, index) => (
                <div key={index} className={styles.DaliyBox}>
                 <p className={styles.DaliyTitleText}>{diary.author.full_name}님의 일기</p>
                <span className={styles.DaliyTitle2Text}>{diary.title}</span>
                <span className={styles.DateText}>{new Date(diary.created_at).toLocaleDateString("ko-KR")}</span>
                <div className={styles.Line}></div>
                <div className={styles.DaliyContentText}>{diary.content.length>10? diary.content.substring(0,10)+"...":diary.content}</div>
             </div>
    ))}
  </div>
</main>
        </>
    )
}
export default UserDiaryList;

