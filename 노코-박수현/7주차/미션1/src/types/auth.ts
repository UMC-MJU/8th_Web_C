import { commonResponse } from "./common";

//로그인
export type RequestSigninDto = {
    email: string;
    password: string;
}
export type ResponseSigninDto = commonResponse<{
    id: number,
    name: string,
    accessToken: string,
    refreshToken: string
}>;

//회원가입
export type RequestSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string
}

export type ResponseSignupDto = commonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | string;
    createdAt: Date;
    updatedAt: Date;
}>;

//내 정보 조회
export type ResponseMyInfoDto = commonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | string;
    createdAt: Date;
    updatedAt: Date;
}>;