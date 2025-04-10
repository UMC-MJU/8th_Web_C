import { useNavigate } from "react-router-dom";
import Profile from "../assets/user.png";

export default function FinalSignUpPage(): JSX.Element {
    const navigate = useNavigate();    
    
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-y-6">

            {/* 헤더 */}
            <div className="relative w-full max-w-sm h-10 flex items-center">
                <p className="absolute left-0 text-lg cursor-pointer"
                    onClick={() => navigate("/PassSignUpPage")}
                >&lt;</p>
                <p className="mx-auto text-sm font-semibold">회원가입</p>
            </div>

            {/* 프로필 */}
            <img src={Profile}></img>
            {/* 이메일 */}
            <div className="flex flex-col w-full max-w-sm gap-y-3">
                <input
                    className="rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full"
                    placeholder="비밀번호를 입력해주세요"
                />
            </div>

            {/* 다음 */}
            <button className="w-full max-w-sm rounded bg-[#F0648C] text-white py-2">회원가입 완료</button>
        </div>
    );
}
