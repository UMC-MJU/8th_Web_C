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
