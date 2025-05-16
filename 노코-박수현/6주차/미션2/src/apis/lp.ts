import { PaginationDto, SearchPaginationDto } from "../types/common";
import { ResponseLpListDto, ResponseLpCommentListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLplist = async (PaginationDto: SearchPaginationDto): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get('/v1/lps', {
        params: PaginationDto,
    });
    return data;
};

export const getLpCommentList = async (lpid: string, PaginationDto: PaginationDto): Promise<ResponseLpCommentListDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpid}/comments`, {
        params: PaginationDto,
    });
    return data;
}