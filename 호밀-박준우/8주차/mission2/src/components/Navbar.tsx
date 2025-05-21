import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import leadingIcon from "../assets/Leading-icon.png";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const { accessToken, logout } = useAuth();
  const [myInfo, setMyInfo] = useState<ResponseMyInfoDto["data"] | null>(null);

  useEffect(() => {
    if (!accessToken) {
      setMyInfo(null);
      return;
    }
    getMyInfo()
      .then((res) => setMyInfo(res.data || null))
      .catch(() => setMyInfo(null));
  }, [accessToken]);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/v1/auth/signout");
      logout();
    },
  });

  return (
    <nav className="sticky top-0 bg-white dark:bg-gray-900 shadow-md w-full z-10">
      <div className="flex items-center justify-between p-4">
        <button onClick={toggleSidebar}>
          <img src={leadingIcon} alt="메뉴" className="cursor-pointer w-6 h-6" />
        </button>
        <Link to="/" className="text-black text-xl font-bold">
          돌려돌려LP판
        </Link>
        <div className="flex space-x-6">
          {myInfo ? (
            <>
              <span>{myInfo.name}님 반갑습니다.</span>
              <button
                onClick={() => logoutMutate()}
                className="px-4 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1 text-black rounded hover:bg-gray-100"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 text-black rounded hover:bg-gray-100"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
