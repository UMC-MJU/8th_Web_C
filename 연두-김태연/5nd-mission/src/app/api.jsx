// import axios from "axios";

// // localStorage에서 accessToken 가져오기
// export const getAccessToken = () => {
//   return localStorage.getItem("accessToken");
// };

// // axios 인스턴스 생성
// export const api = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const apiForm = axios.create({
//   baseURL: import.meta.env.VITE_SERVER_API_URL,
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });

// // 요청 인터셉터: 요청마다 Authorization 헤더에 토큰 추가
// api.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// apiForm.interceptors.request.use(
//   (config) => {
//     const token = getAccessToken();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

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
//       window.location.href = "/LoginPage"; // 로그인 페이지로 이동
//     }
//     return Promise.reject(error);
//   },
// );

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then(token => {
//             originalRequest.headers['Authorization'] = `Bearer ${token}`;
//             return api(originalRequest);
//           })
//           .catch(err => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem('refreshToken');
//         const res = await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/auth/refresh-token`, {
//           refreshToken,
//         });

//         const newAccessToken = res.data.accessToken;
//         localStorage.setItem('accessToken', newAccessToken);
//         api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
//         processQueue(null, newAccessToken);
//         return api(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
//         window.location.href = "/LoginPage";
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );
import axios from "axios";

export const getAccessToken = () => localStorage.getItem("accessToken");

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { "Content-Type": "application/json" },
});

export const apiForm = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: { "Content-Type": "multipart/form-data" },
});

// 요청 인터셉터 공통 함수
const addAuthHeader = (config) => {
  const token = getAccessToken();
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

api.interceptors.request.use(addAuthHeader, Promise.reject);
apiForm.interceptors.request.use(addAuthHeader, Promise.reject);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token));
  failedQueue = [];
};

const setupResponseInterceptor = (instance) => {
  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;

      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return instance(originalRequest);
          }).catch(e => Promise.reject(e));
        }

        isRefreshing = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const res = await axios.post(
            `${import.meta.env.VITE_SERVER_API_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const newToken = res.data.accessToken;
          localStorage.setItem("accessToken", newToken);
          instance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          processQueue(null, newToken);
          return instance(originalRequest);
        } catch (refreshErr) {
          processQueue(refreshErr, null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          window.location.href = "/LoginPage";
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(err);
    }
  );
};

setupResponseInterceptor(api);
setupResponseInterceptor(apiForm);
