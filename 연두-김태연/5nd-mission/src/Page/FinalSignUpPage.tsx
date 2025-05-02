import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { CircleUserRound } from "lucide-react";
import { SignUpAPI } from "../api/SignupAPI";

export default function FinalSignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const [nickname, setNickname] = useState("");
  const email = location.state?.email;
  const password = location.state?.password;
  
  console.log(email);
  console.log(password);
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname.trim()) return;
  
    const signupData = {
      name: nickname,
      email,
      password,
      bio: "임의지정",
      avatar: "https://postfiles.pstatic.net/MjAyMzAzMDJfMjkw/MDAxNjc3NzIwOTU4MTU1.r86yw28ansOA6ZJB5P4wwynvSkjMNsPZix-vM6MUeHwg.xoiZpXl7aRYCvTfhRMYOcYNy_xbD0lv18FQQ-SUX_44g.JPEG.useop22/IMG_7014.JPG?type=w3840"
    };
  
    try {
      const res = await SignUpAPI(signupData);
      console.log("회원가입 성공:", res);
      navigate("/LoginPage");
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입에 실패했어요. 다시 시도해주세요.");
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-6">
      {/* 헤더 */}
      <div className="relative w-full max-w-sm h-10 flex items-center">
        <p
          className="absolute left-0 text-lg cursor-pointer"
          onClick={() => navigate("/PassSignUpPage")}
        >
          &lt;
        </p>
        <p className="mx-auto text-sm font-semibold">회원가입</p>
      </div>

      <CircleUserRound size={150} color="#F0648C" />

      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full max-w-sm gap-y-3"
      >
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full"
          placeholder="닉네임을 입력해주세요"
        />
        <button
          type="submit"
          disabled={!nickname.trim()}
          className={`w-full max-w-sm rounded py-2 text-white ${
            nickname.trim()
              ? "bg-[#F0648C] cursor-pointer"
              : "bg-[#131314] cursor-not-allowed"
          }`}
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
}
