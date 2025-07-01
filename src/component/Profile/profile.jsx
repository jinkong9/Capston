import React, { useEffect } from "react";
import styles from "./profile.module.css"
import { useState } from "react";
import { use } from "react";
import { se } from "date-fns/locale";
import axios from "axios";
import { useMyAvatar } from "../Hooks/myinfo";

function Profilepage(){
    const avatar=useMyAvatar();

    const [ImageChoiceState, SetImageChoiceState]=useState(false);
    const [previewUrl, SetPreviewUrl]=useState();
    const [selected, Setselected]=useState();
    const [selectedFile, SetSelectedFile]=useState();
    const [myProfile,SetMyprofile]=useState();
    const handleClick =(index)=>{
        Setselected(index)
    }
    const handleFileChange = (event)=>{
        const file=event.target.files[0];
        if(file){
            const imageurl=URL.createObjectURL(file)
            SetPreviewUrl(imageurl);
            SetSelectedFile(file)
            SetImageChoiceState(true)
        }
        else{
            console.log("이미지 저장 오류")
        }

    }
    const handleSubmit=async()=>{
        if(!SetSelectedFile){
            alert("이미지를 선택해 주세요")
            return;
        }  
        const formData=new FormData();
        formData.append("avatar",selectedFile)
        try{
            const response=await axios.patch("https://daisy.wisoft.io/yehwan/app1/me/profile", formData,
                {
                    headers:{ "Content-Type": "multipart/form-data",},
                }
            );
            console.log("프로필 수정 완료")
            window.location.reload()
           
            alert("프로필이 수정되었습니다")
            
            
        }
        catch(error){
            console.log("프로필 수정 오류")
            alert("프로필 이미지를 선택해 주세요")
        }
    }

   
    useEffect(()=>{
        if(!avatar) return;
        const responseData=async()=>{
            try{
                const response=await axios.get(`https://daisy.wisoft.io/yehwan/app1/avatars/${avatar}`)
                
                console.log("프로필 불러오기 성공!")
                console.log("avatar 값:", avatar);
            }
            catch(error){
                console.log("프로필 불러오기 오류")
            }



        }
        responseData();


    },[avatar])
   


    return(
        <div className={styles.MainContainer}>
           <div className={styles.Mainbox}>
                <div className={styles.SubTitleBox}>
                    <h3>프로필 변경</h3>
                </div>
                <div className={styles.MyProfileBox}>
                <h3>내 프로필</h3>
                <div className={styles.MyProfile}>
                    <img className={styles.MyProfileImg} alt="내 프로필 이미지" src={`https://daisy.wisoft.io/yehwan/app1/avatars/${avatar}`}></img>


                </div>
                 </div>
                 <div className={styles.ProfileChangeBox}>
                     <div className={styles.ProfileChangetitleBox}>
                        <h4 className={styles.ProfileSubTitle}>내 프로필</h4>
                        <input onChange={handleFileChange}  className={styles.HiddenInput}id="fileUpload" type="file" accept="image/*"></input>
                        <label  htmlFor="fileUpload" className={styles.CustomButton}>내 컴퓨터에서 이미지 찾기</label>
                     </div>
                     <div className={styles.MyProfileCheckBox}>
                        {!ImageChoiceState&&(
                        <div className={styles.MyProfilesChoice}>
                            {[1,2,3,4,5,6].map((num, idx)=>(
                            <div onClick={()=>handleClick(idx)} key={num} className={`${styles[`CustomProfile${num}`]} ${selected===idx? styles.selected: ""}`}>
                        </div>
                         ))}
                        </div>
                        )}
                    
                      {ImageChoiceState&&(
                         <div className={styles.MyProfileWriteCircle}>
                         {previewUrl&&(
                            <img src={previewUrl} className={styles.PreviewImage}></img> 
                         )}   
                        </div>

                      )}  
                      <div onClick={()=> handleSubmit()} className={styles.ProfileSubmitButton}>프로필 변경</div>
                     </div>
               
                </div>

           </div>
        
     </div>    
    )
       

    

}
export default Profilepage;