import axios from "axios";

// localStorage에서 accessToken 가져오기
export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

// axios 인스턴스 생성
export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiForm = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 요청 인터셉터: 요청마다 Authorization 헤더에 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiForm.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// //  응답 인터셉터: 401 에러 발생 시 자동 로그아웃
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // 401 에러 발생 → 로그아웃 처리
//       console.error("토큰 만료: 자동 로그아웃 처리");
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken"); // 혹시 있을 수도 있는 refreshToken도 삭제
//       alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
//       window.location.href = "/login"; // 로그인 페이지로 이동
//     }
//     return Promise.reject(error);
//   },
// );

// apiForm.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // 401 에러 발생 → 로그아웃 처리
//       console.error("토큰 만료: 자동 로그아웃 처리");
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken"); // 혹시 있을 수도 있는 refreshToken도 삭제
//       alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
//       window.location.href = "/login"; // 로그인 페이지로 이동
//     }
//     return Promise.reject(error);
//   },
// );
