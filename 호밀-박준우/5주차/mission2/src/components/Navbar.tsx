import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-3 text-white">
      <Link to="/" className="text-black text-xl font-bold">
        돌려돌려LP판
      </Link>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="bg-black text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
        >
          로그인
        </Link>
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          회원가입
        </Link>
      </div>
    </nav>
  );
}