import { PaginationDto } from "../types/common";
import { ResponseDeleteLpDto, ResponseLikeLpDto, ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";
import { RequestLpDto } from "../types/lp";
import { CreateLpsDto } from "../types/lp";
import { CreateLpsResponseDto } from "../types/lp";

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });

  return data;
};

export const postLike = async({lpId}: RequestLpDto):Promise<ResponseLikeLpDto> => {
  const {data} = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
}

export const deleteLike = async ({lpId}: RequestLpDto):Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
}

export const deleteLp = async ({lpId}: RequestLpDto): Promise<ResponseDeleteLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}`);
  return data;
};

export const createLp = async(body: CreateLpsDto): Promise<CreateLpsResponseDto> => {
  const {data} = await axiosInstance.post("/v1/lps", body);
  console.log("데이터용",data)
  return data;
};