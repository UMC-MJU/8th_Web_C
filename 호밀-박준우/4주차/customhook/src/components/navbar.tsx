import { NavLink } from "react-router-dom";

const Navbar = () => {
    const activeClass = "text-blue-600 font-bold border-b-2 border-blue-600";
    const baseClass = "p-2";

    return (
        <nav className="flex justify-center gap-4 py-4 border-b">
            <NavLink
                to="/"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
            >
                홈
            </NavLink>
            <NavLink
                to="/movies"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
            >
                인기영화
            </NavLink>
            <NavLink
                to="/nowplaying"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
            >
                상영중
            </NavLink>
            <NavLink
                to="/toprated"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
            >
                평점높은
            </NavLink>
            <NavLink
                to="/upcomming"
                className={({ isActive }) => `${baseClass} ${isActive ? activeClass : ""}`}
            >
                개봉예정
            </NavLink>
        </nav>
    );
};

export default Navbar;
