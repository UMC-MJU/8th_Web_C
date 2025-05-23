import { ResponseCommentDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const postComment = async (
    lpId: string
    , content: string
): Promise<ResponseCommentDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
    return data;
}

export const patchComment = async (
    lpId: string,
    commentId: number,
    content: string
): Promise<ResponseCommentDto> => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
    return data;
}

export const deleteComment = async (
    lpId: string,
    commentId: number,
): Promise<ResponseCommentDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
    return data;
}