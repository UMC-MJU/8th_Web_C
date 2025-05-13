import { CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
}

export type LpData = {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    tags: Tag[];
    likes: Likes[];
}

export type author = {
    id: number;
    name: string;
    email: string;
    bio: null;
    avatar: null;
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

export type ResponseLpListDto = CursorBasedResponse<LpData[]>

export type ResponseLpCommentListDto = CursorBasedResponse<LpCommentData[]>