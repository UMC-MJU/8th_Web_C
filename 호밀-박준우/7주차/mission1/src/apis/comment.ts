import { PaginationDto } from "../types/common";
import { CommentDto} from "../types/comment";
import { axiosInstance } from "./axios";

export const getCommentList = async (
  paginationDto: PaginationDto,
  lpId: number
): Promise<CommentDto> => {
  const { data } = await axiosInstance.get(`v1/lps/${lpId}/comments`, {
    params: paginationDto
  });

  return data;
};