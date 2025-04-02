import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", label: "홈" },
    { path: "/movie/MoviePopular", label: "인기영화" },
    { path: "/movie/MovieNowPlaying", label: "상영 중" },
    { path: "/movie/MovieTopRated", label: "평점 높은" },
    { path: "/movie/MovieUpComig", label: "개봉 예정" },
  ];

  return (
    <>
      <div className="flex w-full items-start justify-start space-x-3 text-lg font-medium pl-0">
        {navItems.map((item) => (
          <span
            key={item.path}
            className={`transition duration-300 font-bold cursor-pointer ${
              location.pathname === item.path
                ? "text-[rgb(129,114,207)]"
                : "hover:text-[rgb(129,114,207)]"
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </span>
        ))}
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
  