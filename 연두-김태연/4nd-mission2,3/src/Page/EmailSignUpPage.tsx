import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function EmailSignUpPage(): JSX.Element {
  const navigate = useNavigate();

    // 좀 더 수정하고 싶은점 -> 입력 -> 에러 -> 에러문 출력 -> 지움 -> 에러문 출력 X 하고싶은데...
  const EmailSchema = z.object({
    Email: z
      .string()
      .regex(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "올바른 이메일 형식을 입력해주세요."
      )
  });
  

  type EmailFormValue = z.infer<typeof EmailSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValue>({
    resolver: zodResolver(EmailSchema),
    mode: "onChange",
  });

  const onSubmit = (data: EmailFormValue) => {
    if (isValid) {
      navigate("/PassSignUpPage", {
        state: {
          email: data.Email, // 입력한 이메일 값 넘겨야 함
        },
      });
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-6">
      <div className="relative w-full max-w-sm h-10 flex items-center">
        <p className="absolute left-0 text-lg cursor-pointer" onClick={() => navigate("/")}>
          &lt;
        </p>
        <p className="mx-auto text-sm font-semibold">회원가입</p>
      </div>

       {/* 구글 로그인 버튼 */}
       <button
        type="button"
        className="relative flex items-center justify-center px-3 h-10 w-full max-w-sm bg-[#131314] text-[#e3e3e3] text-sm font-roboto font-medium border border-[#8e918f] rounded transition-all duration-200 overflow-hidden hover:shadow-md focus:outline-none"
      >
        <div className="absolute left-3 w-5 h-5 min-w-[20px]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
        </div>
        <span className="z-10">구글 로그인</span>
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-sm gap-y-3"
      >
        <input
          className="rounded border border-gray-300 px-4 py-2 text-sm focus:outline-none w-full pr-10"
          placeholder="이메일을 입력해주세요"
          type="email"
          {...register("Email")}
        />
        {errors.Email && (
          <p className="text-red-600 text-xs">{errors.Email.message}</p>
        )}
        {/* {errors.Email && (
          <p className="text-red-600 text-xs">올바른 이메일 형식을 입력해주세요.</p>
        )} */}
        
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
