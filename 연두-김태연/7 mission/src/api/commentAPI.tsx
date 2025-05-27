import { api } from "../app/api";

export interface CreateCommentInput {
  lpId: number;
  content: string;
}

export interface FetchCommentsResponse {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
}

export interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface GetCommentsParams {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: "asc" | "desc";
  token?: string;
}
// 댓글 불러오기기
export const getCommentsApi = async ({
  lpId,
  cursor = 0,
  limit = 10,
  order = "asc",
  token,
}: GetCommentsParams): Promise<FetchCommentsResponse> => {


  const res = await api.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor, limit, order },
  });

  const responseData = res.data.data;

  if (!responseData || !Array.isArray(responseData.data)) {
    throw new Error("Invalid API response structure for comments.");
  }

  return {
    data: responseData.data,
    nextCursor: responseData.nextCursor,
    hasNext: responseData.hasNext,
  };
};
//댓글 생성성
export const createComment = async ({ lpId, content }: CreateCommentInput) => {
 
  const response = await api.post(
    `/v1/lps/${lpId}/comments`,
    { content },
  );

  return response.data;
};

// 댓글 수정
export const patchCommentAPI = async ({
  lpId,
  commentId,
  content,
}: {
  lpId: number;
  commentId: number;
  content: string;
}) => {
  const res = await api.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
  return res.data;
};



// 댓글 삭제
export const delCommentAPI = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}) => {
  const res = await api.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return res.data;
};
