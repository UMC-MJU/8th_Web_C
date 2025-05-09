import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from 'react';
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

interface NavBarProps {
    search: string;
    setSearch: (value: string) => void;
    onToggleSidebar: () => void;
}

const HOME = { to: '/', label: '돌려돌려LP판' };
const LINKS = [
    { to: '/login', label: '로그인' },
    { to: '/signup', label: '회원가입' },
];
const MY = { to: '/my', label: '마이페이지' };

export default function NavBar({
    search,
    setSearch,
    onToggleSidebar
}: NavBarProps) {
    const navigate = useNavigate();
    const { logout, accessToken } = useAuth();
    const [isInputVisible, setIsInputVisible] = useState(false);
    const wrapperRef = useRef(null);
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            setData(response);
        };

        if (accessToken) getData();
    }, []);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !(wrapperRef.current as HTMLElement).contains(event.target as Node)) {
                setIsInputVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="flex gap-3 p-4 shadow-sm">
            <button onClick={onToggleSidebar} className="text-2xl mr-2 cursor-pointer">
                ☰
            </button>
            <NavLink to={HOME.to} className="text-2xl text-[#E6259D] font-bold rounded-lg px-4 py-2 mr-auto hover:text-black transition-colors duration-300">
                {HOME.label}
            </NavLink>
            {(
                <div ref={wrapperRef}>
                    {isInputVisible ? (
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1"
                            placeholder="검색어를 입력하세요"
                            autoFocus
                        />
                    ) : (
                        <button
                            onClick={() => setIsInputVisible(true)}
                            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                        >
                            {accessToken ? `🔍 ${data?.data?.name}님 반갑습니다.` : "🔍"}
                        </button>
                    )}
                </div>
            )}
            {!accessToken && LINKS.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                        isActive
                            ? 'text-black font-bold bg-gray-100 rounded-lg px-4 py-2 max-h-[40px] shadow-md'
                            : 'text-white hover:text-black transition-colors duration-300 bg-[#FF1D9C] max-h-[40px] hover:bg-gray-300 rounded-lg px-4 py-2 shadow-md'
                    }
                >
                    {label}
                </NavLink>
            ))}

            {accessToken && (
                <>
                    <img
                        src={data?.data?.avatar}
                        alt="logo"
                        className="w-10 h-10 rounded-full border-black hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => navigate("/my")}
                    />
                    <NavLink
                        to={MY.to}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-black font-bold bg-gray-100 rounded-lg px-4 py-2 max-h-[40px] shadow-md'
                                : 'text-white hover:text-black transition-colors duration-300 bg-[#FF1D9C] max-h-[40px] hover:bg-gray-300 rounded-lg px-4 py-2 shadow-md'
                        }
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
            )}
        </div>
    );
}
