import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DelAPI } from "../api/DelAPI";
import { useMutation } from "@tanstack/react-query";


export default function Headers(): JSX.Element {
  const navigate = useNavigate();

  const { isLoggedIn, user, logout } = useAuth(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      logout();
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
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


  // 회원 탈퇴
    const DeleteAccount = async() => {
      try{
          await DelAPI();
          logout();
          navigate("/");
          alert("회원 탈퇴에 완료했습니다.");
      }catch(error){
          console.error("탈퇴 실패: ",error);
          alert("회원 탈퇴에 실패했했습니다.");
  
      }
    }

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
            className={`absolute z-50  flex-col h-full  top-10 left-0 w-50  shadow-lg transform transition-transform duration-300 ease-in-out 
              ${isMenuOpen ? "translate-x-0" : "-translate-x-full" }`}
          >
            <div className="flex justify-end p-4">
            </div>

            <div className="flex flex-col items-center space-y-4 mt-10">
              <button
                className="text-sm text-[#F0648C] hover:underline font-bold"
                onClick={() => navigate("/SearchPage")}
              >
                찾기
              </button>
                <>
                  <button
                    className="text-sm mb-90 text-[#F0648C] hover:underline font-bold"
                    onClick={() => navigate("/MyPage")}
                  >
                    마이페이지
                  </button>
                </>
                  <div className="mt-auto mb-10">
                  <button
                    className="text-sm border rounded px-8 hover:bg-[#F0648C] h-10"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    회원 탈퇴
                  </button>
                </div>
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
            {user?.name}님 반갑습니다.</p>
            <button
              className="text-sm border rounded px-3 py-2 hover:bg-[#F0648C]"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
      </div>

      {/* 탈퇴 모달달 */}
      {showConfirmModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-[#1d1f22] p-6 rounded-lg shadow-lg w-80">
          <h2 className="text-lg font-bold mb-4 text-center">정말로 탈퇴하시겠습니까?</h2>
          <div className="flex justify-center space-x-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 w-20 px-4 py-2 rounded"
              onClick={() => setShowConfirmModal(false)}
            >
              아니여
            </button>
            <button
              className="bg-[#F0648C] text-white px-4 py-2 rounded w-20"
              onClick={async () => {
                setShowConfirmModal(false);
                await DeleteAccount();
              }}
            >
              예
            </button>
          </div>
        </div>
  </div>
)}

    </div>
  );
}
