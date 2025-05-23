import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

//전역 변수로 refresg 요청의 Promise를 저장해서 중복 요청을 방지
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    // headers: {
    //     Authorization: `Bearer ${accessToken ? JSON.parse(accessToken) : null}`,
    // },
});


// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
},
    (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 에러 발생 시 refreshToken을 사용하여 accessToken을 갱신
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        // 401 에러가 발생하고, 원본 요청이 refreshToken을 사용하지 않은 경우
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            //refresh 엔드포인트에서 401 에러가 발생하면 중복 재요청을 방지하기 위해 로그아웃 처리
            console.log()
            if (originalRequest.url === "/v1/auth/refresh") {
                const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                removeAccessToken();
                removeRefreshToken();
                window.location.href = "/login"; // 로그인 페이지로 리다이렉트
                return Promise.reject(error);
            }

            // 재시도 플래그
            originalRequest._retry = true;

            //이미 리프레시 요청이 진행 중인 경우, 해당 Promise를 반환
            if (!refreshPromise) {
                refreshPromise = (async () => {
                    const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = getRefreshToken();
                    const { data } = await axiosInstance.post("/v1/auth/refresh", { refresh: refreshToken });
                    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);

                    // 새 accessToken을 반환하여 다른 요청들이 이것들을 사용할 수 있도록 함
                    return data.data.accessToken;
                })()
                    .catch((error) => {
                        console.log(error)
                        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                        removeAccessToken();
                        removeRefreshToken();
                    })
                    .finally(() => {
                        // 요청이 끝나면 refreshPromise를 초기화
                        refreshPromise = null;
                    });
            }
            // 진행중인 refreshPromise가 해결될 때까지 기다림
            return refreshPromise.then((newAccessToken) => {
                // 원본 요청의 Authorization 헤더를 새 accessToken으로 업데이트
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                // 업데이트 된 원본 요청을 다시 전송
                return axiosInstance(originalRequest);
            });
        }
        // 401 에러가 아닌 경우, 원본 에러를 그대로 반환
        return Promise.reject(error);
    }
)