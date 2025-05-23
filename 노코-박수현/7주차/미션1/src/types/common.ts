import { PAGENATION_ORDER } from "../enums/common";

export type commonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export type CursorBasedResponse<T> = commonResponse<{
    data: T;
    nextCursor: number | null;
    hasNext: boolean;
}>

export type SearchPaginationDto = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: PAGENATION_ORDER;
}

export type PaginationDto = {
    cursor?: number;
    limit?: number;
    order?: PAGENATION_ORDER;
}