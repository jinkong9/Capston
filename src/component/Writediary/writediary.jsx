import { use, useState } from 'react';
import axios from 'axios';
import styles from "./writediary.module.css"
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Writediary() {
  const {state} =useLocation()
  const navigate=useNavigate();
  const [titleState,setTitleState]=useState(true)


  const [inputData, setInputData] = useState({
    title: "",
    content: ""
  });
  const [name,setName]=useState("정필성")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (inputData.content.trim().length < 10) {
      alert("내용은 최소 10자 이상 입력해야 합니다.");
    
      return;
    }
 
    try {
      const response = await axios.post(
        "https://daisy.wisoft.io/yehwan/app1/me/diaries", 
        {
          use_theme: {titleState},
          title: inputData.title,
          content: inputData.content,
        }
     
      );
      console.log("일기 작성 성공:", response.data);
      alert("제출 완료 ")
      goToMainPage()
    } catch (error) {
      console.error("일기 작성 실패:", error);
    }
  };
  const goToMainPage=()=>{
    navigate("/") 
  }
  console.log(titleState)
  return (
    
    <div className={styles.BodyContainer}>
      {titleState&&(
       <div className={styles.RandomBox}>
       <h3>{state.theme}</h3> 
    </div>
 )}
    <div className='TtitleStateBox'>
    <input className={styles.ToggleButton} type='checkbox'  onClick={()=>setTitleState(prev=>!prev)} />자유주제로 작성하기
  
    </div>
    <form onSubmit={handleSubmit} className={styles.FormCotainer}>
      <input
        className={styles.InputTtitle}
        name='title'
        type="text"
        placeholder="제목"
        value={inputData.title}
        onChange={handleChange}
      />
      <br />
      <div className={styles.MyInfoBox}>
         <div className={styles.NameBox}>{name}</div>
         <div className={styles.DayBox}>2025.04.30</div>
      </div>
      <div className={styles.Line}></div>
      <br />
      <textarea
        className={styles.InputText}
        name='content'
        placeholder="내용을 입력해 주세요"
        value={inputData.content}
        onChange={handleChange}
      />
      <br />
      <button className={styles.SubmitButton} type="submit">저장하기</button>
    </form>
    </div>
  );
 
}

export default Writediary;
