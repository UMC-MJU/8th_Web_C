import { postSignin } from "../apis/auth"
import useForm from "../hooks/useForm"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { userSinginInformation, validateSignin } from "../utils/validate"
import SocialLoginPage from "./SocialLoginPage"
import { LOCAL_STORAGE_KEY } from "../constants/key"

export default function LoginPage() {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } = useForm<userSinginInformation>({
    initialValues: {
      email: "",
      password: ""
    },
    validate: validateSignin,
  })
  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
    }
    catch (error) {
      alert(error)
    }
  }

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex mb-5 w-[300px] max-h-[30px]">
        {/*현재 이전 경로가 아닌 홈 경로임*/}
        <a href="/" className="text-2xl px-2">&lt;</a>
        <h1 className="text-2xl text-center font-bold text-black px-21">로그인</h1>
      </div>
      <SocialLoginPage />
      <div className="flex flex-col gap-3"> OR </div>
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder="이메일"
        />
        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}
        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"password"}
          placeholder="비밀번호"
        />
        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}
        <button
          type="button"
          onClick={() => { handleSubmit() }}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-large hover:bg-blue-700 transition-colors duration-200 disabled:bg-[#ccc] cursor-pointer disabled:cursor-not-allowed"
        >
          로그인
        </button>
      </div>
    </div>
  )
}