import axios from "axios";
import React, { useEffect, useState } from "react";


export const useMyAvatar = () => {
  const [userAvatar, setUserAvatar] = useState();

  useEffect(() => {
    const responseData = async () => {
      try {
        const response = await axios.get(
          "https://daisy.wisoft.io/yehwan/app1/me",
        { withCredentials: true }
        );
        setUserAvatar(response.data.user.avatar);
        console.log("내 정보에서 아바타 정보 불러오기 성공!");
        console.log(response.data)
      } catch (error) {
        console.log("에러 응답 상태", error.response.status);
        console.log("에러 응답 데이터", error.response.data);
      }
    };
    responseData();
  }, []);

  return userAvatar;
};


