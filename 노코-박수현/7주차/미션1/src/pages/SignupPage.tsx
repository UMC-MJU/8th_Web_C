import { z } from "zod";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SocialLoginPage from "./SocialLoginPage";
const schema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상 입력하셔야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하 입력하셔야 합니다." }),
  passwordCheck: z
    .string()
    .min(8, { message: "비밀번호는 8자 이상 입력하셔야 합니다." })
    .max(20, { message: "비밀번호는 20자 이하 입력하셔야 합니다." }),
  name: z.string().min(1, { message: "이름을 입력하셔야 합니다." }),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFilds = z.infer<typeof schema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const { register, handleSubmit, control, formState: { errors, isSubmitting, isValid }
  } = useForm<FormFilds>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<FormFilds> = async (data: FormFilds) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordCheck, ...rest } = data;
      await postSignup(rest);
      navigate("/login");
    }
    catch (error) {
      alert(error);
    }
  };
  const email = useWatch({ control, name: "email" });
  const passwordCheck = useWatch({ control, name: "passwordCheck" });
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3 items-center justify-center">
        {count === 0 &&
          <>
            <div className="flex mb-5 w-[300px] max-h-[30px]">
              <h1 className="text-2xl text-center font-bold text-black w-full">회원가입</h1>
            </div>
            <SocialLoginPage />
            <div className="flex items-center w-[300px] gap-2 my-4">
              <hr className="flex-grow border-t border-gray-800" />
              <span className="text-gray-800 text-sm px-5">OR</span>
              <hr className="flex-grow border-t border-gray-800" />
            </div>
            <input
              {...register("email")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={"email"}
              placeholder="이메일"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
            <button
              type="button"
              onClick={() => setCount(1)}
              disabled={!email || !!errors.email}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-large hover:bg-blue-700 transition-colors duration-200 disabled:bg-[#ccc] cursor-pointer disabled:cursor-not-allowed"
            >
              다음
            </button>
          </>
        }
        {count === 1 && <>
          <div className="relative flex items-center justify-center mb-5 w-[300px] max-h-[30px]">
            <button
              type="button"
              onClick={() => setCount(0)}
              className="absolute left-0 text-2xl px-2"
            >
              &lt;
            </button>
            <h1 className="text-2xl font-bold text-black">회원가입</h1>
          </div>
          <div className="w-[300px]">
            <h1 className=""> ✉ {email}</h1>
          </div>
          <input
            {...register("password")}
            className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm w-[300px]
            ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
            type={"password"}
            placeholder="비밀번호"
          />
          {errors?.password && (
            <div className="text-red-500 text-sm">{errors.password.message}</div>
          )}
        </>
        }
        {count === 1 &&
          <>
            <input
              {...register("passwordCheck")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={"password"}
              placeholder="비밀번호 확인"
            />
            {errors?.passwordCheck && (
              <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
            )}
            <button
              type="button"
              onClick={() => setCount(2)}
              disabled={!passwordCheck || !!errors.passwordCheck}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-large hover:bg-blue-700 transition-colors duration-200 disabled:bg-[#ccc] cursor-pointer disabled:cursor-not-allowed"
            >
              다음
            </button>
          </>
        }
        {count === 2 &&
          <>
            <div className="relative flex items-center justify-center mb-5 w-[300px] max-h-[30px]">
              <button
                type="button"
                onClick={() => setCount(1)}
                className="absolute left-0 text-2xl px-2"
              >
                &lt;
              </button>
              <h1 className="text-2xl font-bold text-black">회원가입</h1>
            </div>
            <div className="w-50 h-50 rounded-full border-black">
              <img
                src="https://i.namu.wiki/i/Rp_83lMxjLl5A8e3-lLKTzDHoxNYY3JHEmyMd2eJEaGjVKOMkPVvJ4sAIZrVoZhN1GQLIeBBgVtKJtrW-U0tCeSRgXE-McBWIS46lz1y8hSCFj-lpaCK-jP4xejVcOQAbSYLTs5YovMX6weJncgoLg.webp"
                alt="logo"
                className="w-full h-full" />
            </div>
            <input
              {...register("name")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={"name"}
              placeholder="이름"
            />
            {errors?.name && (
              <div className="text-red-500 text-sm">{errors.name.message}</div>
            )}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-large hover:bg-blue-700 transition-colors duration-200 disabled:bg-[#ccc] cursor-pointer disabled:cursor-not-allowed"
            >
              회원가입 완료
            </button>
          </>
        }
      </div>
    </div >
  )
}
