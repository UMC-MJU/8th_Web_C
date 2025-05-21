import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};

export type Lp ={
        id: string;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorId: number;
        createdAt:Date; 
        updateAt: Date;
        tags: Tag[];
        likes: Likes[];
};

export type RequestLpDto = {
    lpId: number;
}

export type CreateLpsDto = {
    title: string,
    content: string,
    thumbnail: string,
    tags: string[],
    published: boolean,
};

export type CreateLpsResponseDto = CommonResponse<{
    id: number,
    title: string,
    content: string,
    thumbnail: string,
    published: boolean,
    authorId: number,
    createdAt: Date,
    updatedAt: Date,
}>

    export type ResponseLpDto = CommonResponse<Lp>;
 
    export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

    export type ResponseLikeLpDto = CommonResponse<{
        id : number;
        userId: number;
        lpId: number;
    }>

    export type ResponseDeleteLpDto = CommonResponse<boolean>;