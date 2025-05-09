// import { createContext, useContext, useEffect, useState } from "react";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   login: (token: string) => void;
//   logout: () => void;
//   name: string; 

// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [name, setname] = useState<string>("");

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const login = (token: string) => {
//     localStorage.setItem("accessToken", token);
//     setIsLoggedIn(true);
//     setname(name);
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     setIsLoggedIn(false);
//     setname("");
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout, name }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // 커스텀 훅
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth 오류발생");
//   }
//   return context;
// };
import { createContext, useContext, useEffect, useState } from "react";
import { MeAPI } from "../api/MeAPI"; // 사용자 정보 가져오는 API

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  name: string; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo(); // 로그인 시 사용자 정보 가져오기
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const userData = await MeAPI(); // 사용자 정보 가져오기 API
      setName(userData.name); // 서버에서 받은 name을 상태에 저장
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
    fetchUserInfo(); // 로그인 시 사용자 정보 가져오기
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setName(""); // 로그아웃 시 name 초기화
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, name }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 오류발생");
  }
  return context;
};
