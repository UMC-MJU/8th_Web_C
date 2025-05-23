import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGENATION_ORDER } from "../../enums/common";
import { getLpCommentList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpCommentListDto } from "../../types/lp";

function useGetInfiniteCommentList(lpid: string, limit: number, order: PAGENATION_ORDER) {
    return useInfiniteQuery({
        queryFn: ({ pageParam }) => getLpCommentList(lpid, { cursor: pageParam, limit, order }),
        queryKey: [QUERY_KEY.comments, lpid, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpCommentListDto) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
    });
}

export default useGetInfiniteCommentList;