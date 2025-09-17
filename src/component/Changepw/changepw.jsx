import React, { useState } from "react";
import style from "./changepw.module.css";
import api from "../CreatContextAPI/api";

export default function Changepw() {
  const [pw, setPw] = useState({
    beforepw: "",
    newpw: "",
  });

  const handlePW = async (e) => {
    try {
      e.preventDefault();
      const res = await api.patch("/me/password", {
        before_password: pw.beforepw,
        new_password: pw.newpw,
      });
      console.log("good", res.response);
      if (res.status == 200) {
        window.close();
      }
    } catch (err) {
      console.log("이상해", err.response);
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
            onChange={(e) => {
              setPw({
                ...pw,
                beforepw: e.target.value,
              });
            }}
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
            onChange={(e) => {
              setPw({
                ...pw,
                newpw: e.target.value,
              });
            }}
          ></input>
        </div>
        <p className={style.inputtext}>*새 비밀번호를 한번 더 입력해주세요 .</p>
        <div>
          <input
            className={style.inputbox}
            type="password"
            id="checkepw"
            name="checkpw"
            placeholder="새로운 비밀번호를 다시입력해주세요."
          ></input>
        </div>
        <button onClick={handlePW} type="submit" className={style.submit}>
          제출하기
        </button>
      </div>
    </div>
  );
}
