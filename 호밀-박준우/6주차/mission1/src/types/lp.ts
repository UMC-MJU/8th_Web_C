import { CursorBasedResponse } from "./common";

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

    export type ResponseLpListDto = CursorBasedResponse<{data: Lp[]}>;