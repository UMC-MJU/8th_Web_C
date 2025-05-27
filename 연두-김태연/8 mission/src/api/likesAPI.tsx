import { api } from "../app/api";

export interface Like {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string; 
  published: boolean; 
}

// 게시글 좋아요
export const addLikeAPI = async (lpId: number) => {
  const response = await api.post(`/v1/lps/${lpId}/likes`);
  return response.data;
};

// 게시글 좋아요 취소소
export const delLikeAPI = async (lpId: number) => {
  const response = await api.delete(`/v1/lps/${lpId}/likes`);
  return response.data;
};