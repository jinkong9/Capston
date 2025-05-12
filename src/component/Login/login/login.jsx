import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import DDlogo from "/DDlogo.webp";
import style from './login.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

 
export default function Login() {
  const [info, setInfo] = useState({
    email : '',
    password : ''
})
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['accessToken']);

  // useEffect(()=>{
  //   if (login == 'Success') {
  //     navigate('/');
  //   }
  // },[login, navigate]);

  const handleLogin = async(e) =>{
    try{
      e.preventDefault();
      const res = await axios.post("https://daisy.wisoft.io/yehwan/app1/auth/login", {
        email : info.email,
        password : info.password
      })
    const token = res.data.token;
    setCookie('accessToken', token, {
    path : '/',
    maxAge : 3600
    //secure : true https일때
  })
  console.log("data",res.data);
  navigate('/');
    } catch(err) {
      console.log("Login error:", err.response ? err.response.data : err.message);
    }
}

  return (
    <div className={style.container}>
      <div className="logo">
      {/* <img className={style.logo} src={DDlogo} alt="로고"></img> */}
      </div>
      <p className={style.headertext}>회원님의 정보를 입력해주세요 .</p>
      <div>
        <div>
        <input className={style.inputbox} 
        type="email" 
        id="email" 
        name="emailbox" 
        placeholder='이메일을 입력하세요.'
        onChange={(e)=> {
          setInfo({
            ...info,
            email : e.target.value,
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
     type="submit"
     onClick={handleLogin}> 
      Login</button>
     <div>
      <Link to ="/findinfo">
     <button className={style.findbutton}>Find Password</button>
     </Link>
     </div>
    </div>
  )
}
