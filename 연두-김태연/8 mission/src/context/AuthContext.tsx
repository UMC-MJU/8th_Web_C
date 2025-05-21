import { createContext, useContext, useEffect, useState } from "react";
import { MeAPI } from "../api/MeAPI"; 
import axios from "axios"; 

interface User {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: User | null;
  token: string | null;
  updateUser: (user: Partial<User>) => void; 

}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const updateUser = (newUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...newUser } : prev));
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserInfo(token);
    } else {
      setUser(null);
    }
  }, [token]);

  const fetchUserInfo = async (currentToken: string) => {
    try {
      const userData = await MeAPI();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      logout();
    }
  };

  const login = (newToken: string) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, logout, isLoggedIn, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 오류발생: AuthProvider 안에서 사용해야 합니다.");
  }
  return context;
};
