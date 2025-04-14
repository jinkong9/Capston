import { useState } from 'react';
import axios from 'axios';

function Writediary() {
  const [inputData, setInputData] = useState({
    title: "",
    content: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        "https://kingfish-welcome-tiger.ngrok-free.app/me/diaries", 
        {
          use_theme: true,
          title: inputData.title,
          content: inputData.content,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "1234", 
          }
        }
      );
      console.log("일기 작성 성공:", response.data);
    } catch (error) {
      console.error("일기 작성 실패:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='title'
        type="text"
        placeholder="제목"
        value={inputData.title}
        onChange={handleChange}
      />
      <br />
      <textarea
        name='content'
        placeholder="내용"
        value={inputData.content}
        onChange={handleChange}
      />
      <br />
      <button type="submit">제출</button>
    </form>
  );
}

export default Writediary;
