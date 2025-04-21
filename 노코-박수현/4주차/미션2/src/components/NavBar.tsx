import { NavLink } from "react-router-dom"

const HOME = { to: '/', label: '돌려돌려LP판' };

const LINKS = [
    { to: '/login', label: '로그인' },
    { to: '/signup', label: '회원가입' },
]

export default function NavBar() {
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
            {LINKS.map(({ to, label }) => (
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
        </div>
    )
}
