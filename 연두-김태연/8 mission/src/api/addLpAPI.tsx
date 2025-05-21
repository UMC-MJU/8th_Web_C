import axios from 'axios';
import { api } from "../app/api";

export interface AddLpPayload {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string; 
  published: boolean; 
}

export const addLpAPI = async (data: AddLpPayload) => {
  const requestBody = {
    title: data.title,
    content: data.content,
    tags: data.tags,
    thumbnail: data.thumbnail, 
    published: data.published, 
  };

  const response = await api.post('/v1/lps', requestBody); 
  return response.data;
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const uploadResponse = await api.post('/v1/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (uploadResponse.data.status) {
      const imageUrl = uploadResponse.data.data.imageUrl; 
      console.log('이미지 URL:', imageUrl);
      return imageUrl;
    } else {
      throw new Error('파일 업로드 실패');
    }
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    throw new Error('파일 업로드에 실패했습니다');
  }
};

