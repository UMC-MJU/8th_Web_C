import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Headers(): JSX.Element {
  const navigate = useNavigate();

  const { isLoggedIn, name, logout } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  // 메뉴 열기/닫기 토글
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };
  
  //window.innerWidth 6주차 미션1의 화면 크기에 따른 사이드바 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  
  return (
    <div className="flex justify-between mx-8 mt-2.5 cursor-pointer">
       
       <div className="flex items-center space-x-5">

          {/* 햄버거 버튼 */}
          <button onClick={toggleMenu}>
            <span className="w-6 h-1 bg-[#F0648C] mb-1 block rounded px-3"></span>
            <span className="w-6 h-1 bg-[#F0648C] mb-1 block rounded px-3"></span>
            <span className="w-6 h-1 bg-[#F0648C] mb-1 block rounded px-3"></span>
          </button>

          {/* 사이드 메뉴 */}
          <div
            className={`fixed top-10 left-0 w-50 h-full shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-end p-4">
            </div>

            <div className="flex flex-col items-center space-y-4 mt-10">
              <button
                className="text-sm text-[#F0648C] hover:underline font-bold"
                // onClick={() => navigate("/SearchPage")}
              >
                찾기
              </button>
                <>
                  <button
                    className="text-sm text-[#F0648C] hover:underline font-bold"
                    onClick={() => navigate("/MyPage")}
                  >
                    마이페이지
                  </button>
                </>
            </div>
          </div>
          <p className="font-bold text-[#F0648C] mr-8 mb-1" onClick={() => navigate("/")}>
            DOILGO_LP
          </p>
      </div>


      {/* 로그인/회원가입 또는 마이페이지, 로그아웃 버튼 */}
      <div className="mr-1 hidden lg:flex space-x-2">
        {!isLoggedIn ? (
          <>
            <button
              className="w-20 text-sm border rounded px-3 py-2 hover:bg-[#F0648C] font-bold"
              onClick={() => navigate("/LoginPage")}
            >
              로그인
            </button>
            <button
              className=" text-sm border rounded px-3 py-2 hover:bg-[#F0648C] font-bold"
              onClick={() => navigate("/EmailSignUpPage")}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-[#F0648C] py-2">
              {name}님 반갑습니다. 
            </p>
            <button
              className="text-sm border rounded px-3 py-2 hover:bg-[#F0648C]"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
}
