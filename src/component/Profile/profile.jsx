import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMyAvatar } from "../Hook/myavatar";
import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";

function Profilepage() {
  const avatar = useMyAvatar();

  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageurl = URL.createObjectURL(file);
      setPreviewUrl(imageurl);
      setSelectedFile(file);
    } else {
      console.log("이미지 저장 오류");
    }
  };

  // 프로필 변경 버튼 클릭 시
  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("변경할 이미지를 선택해 주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    try {
      const response = await axios.patch(
        "https://daisy.wisoft.io/yehwan/app1/me/profile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      console.log("프로필 수정 완료", response);
      alert("프로필이 수정되었습니다.");
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log("프로필 수정 오류", error.response);
      alert("프로필 이미지 수정에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (!avatar) return;
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `https://daisy.wisoft.io/yehwan/app1/avatars/${avatar}`,
          { withCredentials: true },
        );
        console.log("프로필 불러오기 성공!", avatar);
      } catch (error) {
        console.log("프로필 불러오기 오류", error.response);
      }
    };
    fetchAvatar();
  }, [avatar]);

  return (
    <div className={styles.MainContainer}>
      <div className={styles.Mainbox}>
        <div className={styles.SubTitleBox}>
          <h3>프로필 변경</h3>
        </div>
        <div className={styles.MyProfileBox}>
          <h3>내 프로필</h3>
          <div className={styles.MyProfile}>
            <img
              className={styles.MyProfileImg}
              alt="내 프로필 이미지"
              src={
                previewUrl ||
                `https://daisy.wisoft.io/yehwan/app1/avatars/${avatar}`
              }
            ></img>
          </div>
        </div>
        <div className={styles.ProfileChangeBox}>
          <div className={styles.ProfileChangetitleBox}>
            <h4 className={styles.ProfileSubTitle}>프로필 이미지</h4>
            <input
              onChange={handleFileChange}
              className={styles.HiddenInput}
              id="fileUpload"
              type="file"
              accept="image/*"
            ></input>
            <label htmlFor="fileUpload" className={styles.CustomButton}>
              내 컴퓨터에서 이미지 찾기
            </label>
          </div>
          <div className={styles.MyProfileCheckBox}>
            <div className={styles.MyProfileWriteCircle}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  className={styles.PreviewImage}
                  alt="미리보기 이미지"
                ></img>
              ) : (
                <p className={styles.PreviewText}>선택된 이미지가 없습니다.</p>
              )}
            </div>
            <div onClick={handleSubmit} className={styles.ProfileSubmitButton}>
              프로필 변경
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilepage;
