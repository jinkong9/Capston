import React, { useEffect, useState } from 'react'
import style from './join.module.css';
import DDlogo from "/DDlogo.webp";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Join() {

  const [info, setInfo] = useState({
    name : "",
    id : "",
    password : "",
    passwordconfirm : "",
    email : ""
  });
  const [agree, setAgree] = useState("");
  const [join, setJoin] = useState("");
  const navigate = useNavigate();

  //useEffect(() => {
  //  if (info.name && !/^[가-힣]+$/.test(info.name)) {
  //    alert('한글만 입력해주세요');
  //  }
  //}, [info.name]);

  //useEffect(() => {
  //  if (info.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
  //    alert('올바른 이메일을 입력해주세요');
  //  }
  // }, [info.email]); useForm 사용 -> useEffect 줄이기 

  // const handleJoin = async () => {
  //  if (!info.name || !info.age || !info.id || !info.password || !info.email) {
  //    alert("모든 필드를 입력해주세요.");
  //    return;
  //  }

    if (info.password !== info.passwordconfirm) {
      alert ("비밀번호를 확인해주세요 !");
      return;
    }

  // if (agree !== "true") {
  //    alert("개인정보 수집에 동의해야 합니다.");
  //    return;
  //  }

  //  try {
  //    await axios.post('UserData API', info);
  //    alert("회원가입이 완료되었습니다!");
  //    navigate('/');
  //  } catch (err) {
  //    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
  //  }
  //};
  // 이름은 한국어만, email 제대로안하면 오류뛰어

  return (
    <div className={style.container}>
      <img className={style.logo} src={DDlogo} alt='메인로고'></img>
      <h3 className={style.joinwrite}>회원가입</h3>
      <div>
      <div>
        <input className={style.joincon}
        type="text"
        id = "email"
        name="emailbox"
        placeholder="e-mail"
        value={info.email}
        onChange={(e)=>{setInfo({
          ...info,
          email : e.target.value
        })}}
        > 
        </input></div><br></br>
        <div>
        <input className={style.joincon}
        type="text"
        id = "id"
        name="idbox"
        placeholder="아이디"
        value={info.id}
        onChange={(e)=>{ setInfo({
          ...info,
          id : e.target.value
        })
        }}
        > 
        </input></div><br></br>
        <div>
        <input className={style.joincon}
        type="text"
        id = "pw"
        name="pwbox"
        placeholder="비밀번호"
        value={info.password}
        onChange={(e)=>{setInfo({
          ...info,
          password : e.target.value
        })}}
        > 
        </input></div><br></br>
        <div>
        <input className={style.joincon}
        type="text"
        id = "pwconfirm"
        name="pwbox"
        placeholder="비밀번호 확인"
        onChange={(e)=>{setInfo({
          ...info,
          password : e.target.value
        })}}
        > 
        </input></div><br></br>
        <div className={style.agreement}>
          <div className={style.agreementHeader}>
            <div className={style.agreementTitle}>
              <label htmlFor="privacy">개인정보 수집 동의</label>
            </div>
            <div className={style.agreementButtons}>
              <label className={style.agreeButton}>
                <input
                  type="checkbox"
                  checked={agree === "true"}
                  onChange={() => setAgree("true")}
                />
                동의합니다
              </label>
              <label className={style.disagreeButton}>
                <input
                  type="checkbox"
                  checked={agree === "false"}
                  onChange={() => {
                    setAgree("false");
                    alert('동의하지 않을 시 회원가입이 불가합니다.');
                  }}
                />
                동의하지 않습니다
              </label>
            </div>
          </div>
          <div className={style.agreementContent}>
            {/* 기존의 내용을 여기에 유지 */}
          </div>
        </div>
       <br></br>
        <button 
        className={style.agreebox}
        onClick={()=>{ setJoin("true") }}
        >회원가입</button>
      </div>
    </div>
  )
}
