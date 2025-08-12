import axios from "axios";
import React, { useEffect, useState } from "react";

// myinfo.js
export const useMyAvatar = () => {
  const [userAvatar, setUserAvatar] = useState();

  useEffect(() => {
    const responseData = async () => {
      try {
        const response = await axios.get(
          "https://daisy.wisoft.io/yehwan/app1/me",
          { withCredentials: true },
        );
        setUserAvatar(response.data.user.avatar);
        console.log("내 정보에서 아바타 정보 불러오기 성공!");
      } catch (error) {
        console.log("사용자 정보 불러오기 실패", error.response);
      }
    };
    responseData();
  }, []);

  return userAvatar;
};

// Profilepage.js
