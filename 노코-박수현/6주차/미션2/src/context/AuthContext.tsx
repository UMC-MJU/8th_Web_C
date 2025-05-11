import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    login: (sigininData: RequestSigninDto) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const { getItem: getAccessTokenFromStorage, setItem: setAccessTokenInStorage, removeItem: removeAccessTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const { getItem: getRefreshTokenFromStorage, setItem: setRefreshTokenInStorage, removeItem: removeRefreshTokenFromStorage } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(getAccessTokenFromStorage());

    const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshTokenFromStorage());

    const login = async (sigininData: RequestSigninDto) => {
        try {
            const { data } = await postSignin(sigininData);

            if (data) {
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;

                setAccessTokenInStorage(newAccessToken);
                setRefreshTokenInStorage(newRefreshToken);

                setAccessToken(newAccessToken);
                setRefreshToken(newAccessToken);
                alert("로그인 성공");
                window.location.href = "/"; // 로그인 성공 시 홈으로 이동
            }
        } catch (error) {
            console.error("err: " + error); // toast ui 활용할 것
            alert("로그인 실패");
        }
    }

    const logout = async () => {
        try {
            await postLogout(); // 기존 로그아웃 localStorage.clear()에서 바꾸기
            removeAccessTokenFromStorage();
            removeRefreshTokenFromStorage();

            setAccessToken(null);
            setRefreshToken(null);

            alert("로그아웃 성공");
        } catch (error) {
            console.error("err: " + error); // toast ui 활용할 것
            alert("로그아웃 실패");
        }
    }

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}