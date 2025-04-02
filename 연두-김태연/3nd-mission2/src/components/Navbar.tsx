import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  return (
      <>
        <div className="flex w-full items-start justify-start space-x-3 text-lg font-medium pl-0">
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold cursor-pointer" onClick={() => navigate("/")}>홈</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold cursor-pointer" onClick={() => navigate("/movie/MovieUpComig")}>인기영화</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold cursor-pointer" onClick={() => navigate("/movie/MovieNowPlaying")}>상영 중</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold cursor-pointer" onClick={() => navigate("/movie/MovieTopRated")}>평점 높은</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold cursor-pointer"  onClick={() => navigate("/movie/MovieUpComig")}>개봉 예정</span>
        </div>


        <div className="flex items-center justify-center space-x-2 mt-4">
          <button className="px-2 py-1 text-sm border rounded">
            &lt;
          </button>
          <span className="text-sm  font-bold">1 페이지</span>
          <button className="px-2 py-1 text-sm border rounded">
            &gt;
          </button>
        </div>
      </>
    );
  }
  