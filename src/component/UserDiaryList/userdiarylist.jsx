import React from "react";
import Nav from "../Main/nav/nav";
import styles from "./userdiarylist.module.css"
import { useState,useEffect } from 'react'

function UserDiaryList (){

const [searchKeyword,SetSearchKeyword]=useState("")
const [diaryList,setDiaryList]=useState([]);
const [sortState,setSortState]=useState("new");

 useEffect(()=>{
  const fetchData=async()=>{

    //get 가정
    const response=[
      {name:"예환",title:"안녕",date:"2025.03.26",conetent:"오늘의 날씨가 너무 좋아용"},
      {name:"필성",title:"성진",date:"2025.04.01",conetent:"adadad"},
      {name:"필성",title:"안녕필성",date:"2025.04.01",conetent:"adadad"},
      {name:"성진이",title:"안녕필성",date:"2025.04.01",conetent:"adadad"},
      {name:"성진",title:"안녕필성",date:"2025.04.01",conetent:"adadad"},
      {name:"성진",title:"안녕필성",date:"2025.04.01",conetent:"adadad"},
      
      
    ];
    setDiaryList(response); 
  }
  fetchData();
  },[])

  const filterDiaryList=[...diaryList].filter(diary=>diary.title.includes(searchKeyword))
  const sortDiaryList=[...filterDiaryList].sort((a,b)=> {
  const dateA= new Date(a.date)
  const dateB= new Date(b.date)

    return sortState==="new" ? dateB-dateA: dateA-dateB;

   })



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
                 <p className={styles.DaliyTitleText}>{diary.name}님의 일기</p>
                <span className={styles.DaliyTitle2Text}>{diary.title}</span>
                <span className={styles.DaliyDateText}>{diary.date}</span>
                 <hr />
                 <div className={styles.DaliyContentText}>{diary.conetent}</div>
             </div>
    ))}
  </div>
</main>
        </>
    )
}
export default UserDiaryList;
