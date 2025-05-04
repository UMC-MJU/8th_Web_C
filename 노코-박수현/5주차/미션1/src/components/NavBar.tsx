import { NavLink, useNavigate } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useAuth } from "../context/AuthContext";

const HOME = { to: '/', label: '돌려돌려LP판' };

const LINKS = [
    { to: '/login', label: '로그인' },
    { to: '/signup', label: '회원가입' },
]

const MY = { to: '/my', label: '마이페이지' };

export default function NavBar() {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className="flex gap-3 p-4 shadow-sm">
            <NavLink
                to={HOME.to}
                className={() => {
                    return 'text-2xl text-[#E6259D] font-bold rounded-lg px-4 py-2 mr-auto hover:text-black transition-colors duration-300'

                }}
            >
                {HOME.label}
            </NavLink>
            {!getItem() && LINKS.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) => {
                        return isActive
                            ? 'text-black font-bold bg-gray-100 rounded-lg px-4 py-2 max-h-[40px] shadow-md'
                            : 'text-white hover:text-black transition-colors duration-300 bg-[#FF1D9C] max-h-[40px] hover:bg-gray-300 rounded-lg px-4 py-2 shadow-md'
                    }}
                >
                    {label}
                </NavLink>
            ))}
            {getItem() && (
                <>
                    <img
                        src="https://i.namu.wiki/i/Rp_83lMxjLl5A8e3-lLKTzDHoxNYY3JHEmyMd2eJEaGjVKOMkPVvJ4sAIZrVoZhN1GQLIeBBgVtKJtrW-U0tCeSRgXE-McBWIS46lz1y8hSCFj-lpaCK-jP4xejVcOQAbSYLTs5YovMX6weJncgoLg.webp"
                        alt="logo"
                        className="w-10 h-10 rounded-full border-black hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => {
                            navigate("/my");
                            window.location.reload();
                        }}
                    />
                    <NavLink
                        to={MY.to}
                        className={({ isActive }) => {
                            return isActive
                                ? 'text-black font-bold bg-gray-100 rounded-lg px-4 py-2 max-h-[40px] shadow-md'
                                : 'text-white hover:text-black transition-colors duration-300 bg-[#FF1D9C] max-h-[40px] hover:bg-gray-300 rounded-lg px-4 py-2 shadow-md'
                        }}
                    >
                        {MY.label}
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="text-white hover:text-black transition-colors duration-300 bg-[#FF1D9C] max-h-[40px] hover:bg-gray-300 rounded-lg px-4 py-2 shadow-md"
                    >
                        로그아웃
                    </button>
                </>
            )
            }
        </div >
    )
}
