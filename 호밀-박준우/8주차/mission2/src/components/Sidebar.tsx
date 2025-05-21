import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  // 탈퇴 로직
  const { mutate: deleteUser } = useMutation({
    mutationFn: async () => {
      const res = await axiosInstance.delete("/v1/users");
      return res.data;
    },
    onSuccess: () => {
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    },
  });

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-30" onClick={onClose} />}

      {isOpen && (
  <div
    className="w-64 h-full bg-gray-200 text-black transition-all duration-300 ease-in-out overflow-hidden fixed z-40"
  >

        <div className="p-4">
          <button
            onClick={onClose}
            className="cursor-pointer mb-4 lg:hidden text-gray-600 hover:text-black"
          >
            ✕ 닫기
          </button>
          <h2 className="text-pink-500 font-bold text-2xl mb-6">
            돌리고돌리고
          </h2>
          <nav className="space-y-4">
            <Link to="/search" className="block hover:text-blue-500">
              🔍 찾기
            </Link>
            <Link to="/my" className="block hover:text-blue-500">
              👤 마이페이지
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="block text-left text-gray-700 hover:text-red-500"
            >
              🗑️ 탈퇴하기
            </button>
          </nav>
        </div>
      </div>)}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-xl text-white text-center space-y-4 w-[90%] max-w-sm">
            <button
              className="absolute top-3 right-4 text-white text-xl"
              onClick={() => setShowConfirm(false)}
            >
              ×
            </button>
            <h2 className="text-lg font-semibold">정말 탈퇴하시겠습니까?</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => deleteUser()}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                예
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-pink-500 text-white rounded"
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
