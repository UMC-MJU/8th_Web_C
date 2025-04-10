import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PassSignUpPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const passwordSchema = z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다.");

  const PassSchema = z
    .object({
      Password: passwordSchema,
      ConfirmPassword: z.string(),
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
      path: ["ConfirmPassword"],
      message: "비밀번호가 일치하지 않습니다.",
    });

  type PassFormValue = z.infer<typeof PassSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassFormValue>({
    resolver: zodResolver(PassSchema),
    mode: "onChange",
  });

  const onSubmit = (data: PassFormValue) => {
    if (isValid) {
      console.log("회원가입 데이터:", data);
      navigate("/FinalSignUpPage", {
        state: {
          email,
          password: data.Password,
        },
      });
          }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-6">
      {/* 헤더 */}
      <div className="relative w-full max-w-sm h-10 flex items-center">
        <p
          className="absolute left-0 text-lg cursor-pointer"
          onClick={() => navigate("/EmailSignUpPage")}
        >
          &lt;
        </p>
        <p className="mx-auto text-sm font-semibold">회원가입</p>
      </div>

      {/* 이메일 표시 */}
      <div className="relative w-full max-w-sm">
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <Mail size={20} />
        </div>
        <p className=" h-9 rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full pr-10">
          {email}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-sm gap-y-3"
      >
        {/* 비밀번호 */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className=" h-9 rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full pr-10"
            placeholder="비밀번호를 입력해주세요"
            {...register("Password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.Password && (
            <p className="text-red-600 text-xs mt-1">{errors.Password.message}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative">
          <input
            type={showCheckPassword ? "text" : "password"}
            className=" h-9 rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full pr-10"
            placeholder="비밀번호를 다시 입력해주세요"
            {...register("ConfirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowCheckPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showCheckPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.ConfirmPassword && (
            <p className="text-red-600 text-xs mt-1">{errors.ConfirmPassword.message}</p>
          )}
        </div>

        {/* 다음 버튼 */}
        <button
          type="submit"
          className={`w-full max-w-sm rounded text-white py-2 ${
            isValid ? "bg-[#F0648C] cursor-pointer" : "bg-[#131314] cursor-not-allowed"
          }`}
          disabled={!isValid}
        >
          다음
        </button>
      </form>
    </div>
  );
}
