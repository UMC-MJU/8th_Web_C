import { api } from "../app/api";

// 회원가입
export const SignUpAPI = async (data: {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string; }) => {
    try {
      const response = await api.post("/v1/auth/Signup", data);
      console.log("회원가입 성공 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("회원가입 API 요청 중 오류 발생:", error);
      throw error;
    }
  };
  