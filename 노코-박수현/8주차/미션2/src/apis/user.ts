import { ResponseMyInfoDto } from "../types/auth";
import { RequestUserDto } from "../types/user";
import { axiosInstance } from "./axios";

export const patchUser = async (user: RequestUserDto): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.patch('/v1/users', user);
    return data;
}

export const deleteUser = async () => {
    const { data } = await axiosInstance.delete('/v1/users');
    return data;
}