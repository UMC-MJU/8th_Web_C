import { api } from "../app/api";
// 회원 탈퇴
export const DelAPI = async () => {
  try {
    const response = await api.delete("/v1/users");
    console.log("회원 탈퇴 성공: ", response.data);
    return response.data;
  } catch (error) {
    console.error("회원 탈퇴 API 요청 실패: ", error);
    throw error;
  }
};
