import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 

export default function PassSignUpPage(): JSX.Element {
    const navigate = useNavigate();    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-y-6">

            {/* 헤더 */}
            <div className="relative w-full max-w-sm h-10 flex items-center">
                <p className="absolute left-0 text-lg cursor-pointer"
                    onClick={() => navigate("/EmailSignUpPage")}
                >&lt;</p>
                <p className="mx-auto text-sm font-semibold">회원가입</p>
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative w-full max-w-sm">
                <input
                    type={showPassword ? "text" : "password"}
                    className="rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full pr-10"
                    placeholder="비밀번호를 입력해주세요"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            {/* 비밀번호 확인 */}
            <div className="relative w-full max-w-sm">
                <input
                    type={showPassword ? "text" : "password"}
                    className="rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full pr-10"
                    placeholder="비밀번호를 입력해주세요"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
            
            {/* 다음 버튼 */}
            <button
                className="w-full max-w-sm rounded bg-[#131314] text-white py-2"
                onClick={() => navigate("/FinalSignUpPage")}
            >
                다음
            </button>
        </div>
    );
}
