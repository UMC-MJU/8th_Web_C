import { api } from "../app/api";

// 로그인
export const SigninAPI = async (data: { email: string; password: string }) => {
    try {
      const response = await api.post("/v1/auth/signin", data);
      console.log("로그인 성공 응답:", response.data);
      return response.data;
    } catch (error) {
      console.error("로그인 API 요청 중 오류 발생:", error);
      throw error;
    }
  };
  