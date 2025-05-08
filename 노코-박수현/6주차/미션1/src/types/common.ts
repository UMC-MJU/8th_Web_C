import { PAGENATION_ORDER } from "../enums/common";

export type commonResponse<T> = {
    status: boolean,
    statusCode: number,
    message: string,
    data: T
}

export type CursorBasedResponse<T> = commonResponse<T> & {
    nextCursor: number;
    hasNext: boolean;
}

export type PagenationDto = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: PAGENATION_ORDER;
}