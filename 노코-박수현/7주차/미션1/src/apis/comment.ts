import { ResponseCommentDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const postComment = async (
    lpId: string
    , content: string
): Promise<ResponseCommentDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });
    return data;
}