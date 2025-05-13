import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* 사이드바가 열렸을 때만 렌더링되는 투명 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={onClose}
        />
      )}
      <div
        className={`
        h-full bg-gray-200 text-black transition-width duration-300 ease-in-out
        overflow-hidden
        ${isOpen ? "w-64" : "w-0"}
      `}
      >
        {/* 필요하면 닫기 버튼 */}
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
          </nav>

          <div className="absolute bottom-4 left-4 text-sm opacity-60">
            탈퇴하기
          </div>
        </div>
      </div>
    </>

  );
}
