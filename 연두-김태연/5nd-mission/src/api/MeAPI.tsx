import { api } from "../app/api";

// 내 정보 조회 API
export const MeAPI = async () => {
  try {
    const response = await api.get("/v1/users/me"); 
    console.log("유저 정보 성공 응답:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("유저 정보 API 요청 중 오류 발생:", error);
    throw error;
  }
};

