
import { useState,useEffect } from 'react'
import Slider from "react-slick";  
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './main.module.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Writediary from '../../Writediary/writediary';
import Nav from '../../Nav/nav';

function Main() {

  const navigate=useNavigate();
  const [text,setText]=useState("일기 주제 텍스트")
  const [titleState,setTitleState]=useState({tittleState: ""})
  const [diaryList,setDiaryList]=useState([]);

  


  useEffect(()=>{
    const getData=async()=>{
      try{
        const response= await axios.get("https://daisy.wisoft.io/yehwan/app1/themes/today",)
        console.log("렌덤주제 서버응답 :",response.data.theme)
        setText(response.data.theme)
       
      }
    catch(error){
      console.error("get요청 실패",error) 
    }
    }
    getData();
  },[])

  useEffect(()=>{
    const fetchData=async()=>{
     try{
      const response=await axios.get("https://daisy.wisoft.io/yehwan/app1/diaries/recent")
      console.log(response.data.diaries)
      setDiaryList(response.data.diaries)
      

     }
    catch(error){
      console.error("최근 사용자 일기 get 에러" ,error)
    }
    };
    fetchData();
    },[])
  
    
  

  const settings={
    dots:true,
    infinite:false,
    speed:500,
    slidesToShow: Math.min(diaryList.length, 3),  
    slidesToScroll: 1,   
    centerPadding: "1%",
    
  }

  const GoToUserListPage=()=>{
    navigate("/user-diaries",{state:{diaryListData:diaryList}});
  }

  const GoToWritePage=()=>{
    navigate("/write-diary",{state:{theme:text}});
  }
  return (
   
    <>
   <Nav></Nav>
   <div className={styles.SubNavBox}>
     <p className={styles.SubText}>오늘은 무슨 이야기를 들려주시나요?</p>
   </div>
   <header className={styles.Header}>
    <h2 className={styles.HeadText}>오늘의 주제!</h2>
    <div className={styles.HeadBox}>
      <h3 className={styles.HeadBoxText}>{text}</h3>
      <p className={styles.Prompt}>이 주제로 일기를 작성할까요?</p>
      <div onClick={()=>{GoToWritePage()}} className={styles.WriteButton}>일기 작성하기 
      <img  className={styles.ButtonImage} src='/pen.png'></img>
      </div>
    </div>
   </header>
   

   <main className={styles.MainContainer}>
    <h2 className={styles.MainText}>최근 사람들이 쓴 일기에요!</h2>
    <div onClick={()=>GoToUserListPage()} className={styles.UserInfoButton}>사용자 둘러보기</div>
    <Slider {...settings} className={styles.SliderContainer}>
      {diaryList.map((diary,index)=>(
      <div key={index}>
        <div  className={styles.DaliyBox}>
          <p className={styles.DaliyTitleText}>{diary.author.full_name}님의 일기</p>
          <span className={styles.DaliyTitle2Text}>{diary.title}</span>
          <span className={styles.DaliyDateText}>{new Date(diary.created_at).toLocaleDateString("ko-KR")}</span>
          <div className={styles.Line}></div>
          <div className={styles.DaliyContentText}> {diary.content.length>10? diary.content.substring(0,10)+"...":diary.content}
      </div>
      </div>
      </div>

      ))}
    </Slider>
</main>

<h2 className={styles.FooterTitleText}>여러분의 소중한 추억을 작성하고 공유해요!</h2>
<footer className={styles.footerCnontainer}>
  <div className={styles.FooterBox}>
  <img className={styles.FooterImg1} src="/footer1.png" alt="" />
  <p className={styles.Footertext1}>매일 렌덤으로 뽑아주는 주제를 통해 <br></br>나만의 일기를 간편하게 작성해 봐요!
  </p>
  </div>
  <div className={styles.FooterBox}>
  <img className={styles.FooterImg2} src="/footer2.png" alt="" />
  <p className={styles.Footertext2}>철저한 보안으로 당신의 일기를 보호할 <br></br>수 있어요!
  </p>
  </div>
  <div className={styles.FooterBox}>
  <img className={styles.FooterImg3} src="/footer3.png" alt="" />
  <p className={styles.Footertext3}>내가 작성한 일기를 공유하면서 다른 <br></br>사람의 일기도 볼 수 있어요!
  </p>
  </div>
 

</footer>
    </>
  
     
    
  )
}

export default Main