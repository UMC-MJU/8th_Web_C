import { PaginationDto, SearchPaginationDto } from "../types/common";
import { ResponseLpListDto, ResponseLpCommentListDto, RequestLpDto, ResponseLikeLpDto, ResponseImageDto, RequestAddLpDto, ResponseLpDto } from "../types/lp";
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

export const postLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
    return data;
}

export const deleteLike = async ({ lpId }: RequestLpDto): Promise<ResponseLikeLpDto> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
}

export const postImage = async (formData: FormData): Promise<ResponseImageDto> => {
    const { data } = await axiosInstance.post('/v1/uploads/', formData);
    return data;
}

export const postLp = async (lpData: RequestAddLpDto): Promise<ResponseLpDto> => {
    const { data } = await axiosInstance.post('/v1/lps', lpData);
    return data;
}