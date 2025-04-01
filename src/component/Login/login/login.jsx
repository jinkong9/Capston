import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import DDlogo from "/DDlogo.webp";
import style from './login.module.css';
import axios from 'axios';

 
export default function Login() {
  const [login, setLogin] = useState('Login');
  const [info, setInfo] = useState({
    id : '',
    password : ''
})
  const navigate = useNavigate();

  // const fetchData = async () => {
  //   try{
  //     const res = await axios.get("비밀번호 찾는곳");
  //     setData(res.data);
  //   } catch(err){
  //     console.error("Error", err);
  //   }
  // };

  // useEffect(()=>{
  //   if (login == 'Success') {
  //     navigate('/');
  //   }
  // },[login, navigate]);

  // const successLogin = async () => {
  //   setLogin('Wait');

  //   try{
  //     const res = await axios.post('login API', info);

  //     if (res.data.success) {
  //       setLogin('Success');
  //     } else {
  //       setLogin('Login');
  //       alert('회원정보를 다시 입력하세요. !');
  //     }
  //   } catch (err) {
  //     setLogin('Login');
  //     alert('로그인 오류.');
  //   }
  // }


  return (
    <div className={style.container}>
      <div className="logo">
      {/* <img className={style.logo} src={DDlogo} alt="로고"></img> */}
      </div>
      <p className={style.headertext}>회원님의 정보를 입력해주세요 .</p>
      <div>
        <div>
        <input className={style.inputbox} 
        type="text" 
        id="id" 
        name="idbox" 
        placeholder='아이디를 입력하세요.'
        onChange={(e)=> {
          setInfo({
            ...info,
            id : e.target.value,
          });
        }}
        ></input>
        </div>
        <br></br>
        <div>
        <input className={style.inputbox} 
        type="password" 
        id="password" 
        name="pwbox" 
        placeholder='비밀번호를 입력하세요.'
        onChange={(e)=> {setInfo({
          ...info,
          password : e.target.value,
        })}}
        ></input></div>
      </div>
     <button className={style.submitbutton}
     onClick={()=>{
      setLogin('Wait');

    }}> {login}
     </button>
     {login === 'Wait' && <p className={style.loginbox}>로그인 중...</p>}
     <div>
      <Link to ="/findinfo">
     <button className={style.findbutton}>Find Password</button>
     </Link>
     </div>
    </div>
  )
}
