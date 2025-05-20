import React from 'react'
import style from './changepw.module.css';

const ChangePwPage = () =>{
  const width = 500;
  const height = 600;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  const feature = `width=${width}, height=${height}, left=${left}, top=${top}, resizable=no, scrollbar=yes`
  page = window.open(
    '/changepw',
    'ChangePwPage',
    feature
  ); //사용할 컴포넌트에 입력하기 
} //handlesubmit으로 api연결하고 유효성 검사하고 팝업닫기도 한번에 넣고 useState로 정보들 담기

const ClosePwPage = () => {
  page.close();
}

export default function Changepw() {
  return (
    <div className={style.container}>
        <div className={style.maintext}>
        <p>비밀번호 변경</p>
        </div>
        <div className={style.inputwrap}>
        <p className={style.inputtext}>*기존 비밀번호를 입력해주세요 .</p>
        <div>
            <input className={style.inputbox} type="password" id="beforepw" name="beforepw" placeholder="비밀번호를 입력해주세요.">
            </input>
        </div>
        <p className={style.inputtext}>*새 비밀번호를 입력해주세요 .</p>
        <div>
            <input className={style.inputbox} type="password" id="afterpw" name="afterpw" placeholder="새로운 비밀번호를 입력해주세요.">
            </input>
        </div>
        <p className={style.inputtext}>*새 비밀번호를 한번 더 입력해주세요 .</p>
        <div>
            <input className={style.inputbox} type="password" id="checkepw" name="checkpw" placeholder="새로운 비밀번호를 다시입력해주세요.">
            </input>
        </div>
        <button onClick={ClosePwPage} type="submit" className={style.submit}>제출하기</button>
        </div> 
    </div>
  )
}
