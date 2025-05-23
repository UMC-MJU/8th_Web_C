import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGENATION_ORDER } from "../../enums/common";
import { getLplist } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { ResponseLpListDto } from "../../types/lp";

function useGetInfiniteLpList(limit: number, search: string, order: PAGENATION_ORDER) {
    return useInfiniteQuery({
        queryFn: ({ pageParam }) => getLplist({ cursor: pageParam, limit, search, order }),
        queryKey: [QUERY_KEY.lps, search, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage: ResponseLpListDto) => {
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
        },
    });
}

export default useGetInfiniteLpList;