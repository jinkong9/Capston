import React, { useState } from "react";
import style from "./changepw.module.css";
import api from "../CreatContextAPI/api";

export default function Changepw() {
  const [pw, setPw] = useState({
    beforepw: "",
    newpw: "",
    confirmpw: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setPw((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePopUp = () => {
    if (window.opener) {
      window.opener.postMessage("ChangePW", "*");
    }
    window.close();
  };

  const handlePW = async (e) => {
    if (pw.beforepw === pw.newpw) {
      alert("기존 비밀번호와 다르게 설정해주세요.");
      return;
    }
    if (!pw.beforepw || !pw.newpw || !pw.confirmpw) {
      alert("모든 칸을 채워주세요.");
      return;
    }
    if (pw.newpw !== pw.confirmpw) {
      alert("새로운 비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      e.preventDefault();
      const res = await api.patch("/me/password", {
        before_password: pw.beforepw,
        new_password: pw.newpw,
      });
      console.log("good", res.response);
      if (res.status == 200) {
        handlePopUp();
      }
    } catch (err) {
      console.log("비번바꾸기 오류", err.response);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.maintext}>
        <p>비밀번호 변경</p>
      </div>
      <div className={style.inputwrap}>
        <p className={style.inputtext}>*기존 비밀번호를 입력해주세요 .</p>
        <div>
          <input
            className={style.inputbox}
            type="password"
            id="beforepw"
            name="beforepw"
            placeholder="비밀번호를 입력해주세요."
            onChange={handlechange}
          ></input>
        </div>
        <p className={style.inputtext}>*새 비밀번호를 입력해주세요 .</p>
        <div>
          <input
            className={style.inputbox}
            type="password"
            id="newpw"
            name="newpw"
            placeholder="새로운 비밀번호를 입력해주세요."
            onChange={handlechange}
          ></input>
        </div>
        <p className={style.inputtext}>*새 비밀번호를 한번 더 입력해주세요 .</p>
        <div>
          <input
            className={style.inputbox}
            type="password"
            id="confirmpw"
            name="confirmpw"
            placeholder="새로운 비밀번호를 다시입력해주세요."
            onChange={handlechange}
          ></input>
        </div>
        <button onClick={handlePW} type="submit" className={style.submit}>
          제출하기
        </button>
      </div>
    </div>
  );
}
