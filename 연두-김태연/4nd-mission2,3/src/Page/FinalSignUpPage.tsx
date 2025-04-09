import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircleUserRound } from "lucide-react";

export default function FinalSignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickname.trim()) {
      console.log("회원가입 완료:", nickname);
      navigate("/");
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
