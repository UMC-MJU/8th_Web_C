import { PagenationDto } from "../types/common";
import { axiosInstance } from "./axios";


export const getLplist = async (PagenationDto: PagenationDto) => {
    const { data } = await axiosInstance.get('/v1/lps', {
    })
    
    return data;
};