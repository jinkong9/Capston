import axios from "axios";

const api = axios.create({
  baseURL: "https://daisy.wisoft.io/yehwan/app1",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (err) => {
  failedQueue.forEach((prom) => {
    if (err) {
      prom.reject(err);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.log("인터셉터 에러 발생:", JSON.stringify(err.response?.data));
    const originalRequest = err.config;

    // originalRequest가 없거나, 재시도가 이미 있다면 더 이상 진행안함
    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(err);
    }

    // errorCode 기준
    if (
      err.response?.status === 401 &&
      err.response?.data?.errorCode === "TOKEN_EXPIRED"
    ) {
      if (isRefreshing) {
        // 이미 토큰 재발급이 진행 중이라면, 큐에 넣고 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((e) => Promise.reject(e));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log("토큰 재발급을 시도합니다.");
        await api.post("/auth/refresh", {});
        console.log("토큰 재발급 성공!");
        processQueue(null);
        return api(originalRequest); // 재발급 성공 후, 원래 요청을 다시 실행
      } catch (refreshErr) {
        console.error("토큰 재발급 실패:", refreshErr);
        processQueue(refreshErr);
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);

export default api;
