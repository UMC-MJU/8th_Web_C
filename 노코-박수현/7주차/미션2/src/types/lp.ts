import { commonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
}

export type Lp = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export type LpData = Lp & {
    tags: Tag[];
    likes: Likes[];
}

export type author = {
    id: number;
    name: string;
    email: string;
    bio: null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string
}

export type LpCommentData = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: author;
}

export type RequestLpDto = {
    lpId: string | undefined;
}

export type RequestAddLpDto = {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
}

export type ResponseLpListDto = CursorBasedResponse<LpData[]>

export type ResponseLpCommentListDto = CursorBasedResponse<LpCommentData[]>

export type ResponseLikeLpDto = commonResponse<{
    id: number;
    userId: number;
    lpId: number;
}>;

export type ResponseImageDto = commonResponse<{
    imageUrl: string;
}>;

export type ResponseLpDto = commonResponse<Lp>;