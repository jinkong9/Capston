import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import DDlogo from "/DDlogo.webp";
import style from './login.module.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import moment from "moment";

 
export default function Login() {
  const [info, setInfo] = useState({
    email : '',
    password : ''
})
  const api = axios.create({
    baseURL: 'https://daisy.wisoft.io/yehwan/app1',
    withCredentials: true
  })

  const [accessToken, setaccessToken] = useState(null);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(['refreshToken']);

  // useEffect(() => {
  //   api.interceptors.request.use((config)=>{
  //     if(accessToken){
  //       config.headers['Authorization'] = `Bearer ${accessToken}`;
  //     }
  //     return config;
  //   })
  // },[accessToken])


  const handleLogin = async(e) =>{
    try{
      e.preventDefault();
      const res = await api.post("/auth/login", {
        email : info.email,
        password : info.password
      })
    // const token = res.data.token;
  //  setaccessToken(token)
  //  setCookie('refreshToken', res.data.refreshToken,{
  //   path: '/',
  //   maxAge : 60 * 60 * 24 * 7,
  //   secure: true,
  //   sameSite: 'none'
  //  })
  console.log("success",res.data);
  // navigate('/');
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
