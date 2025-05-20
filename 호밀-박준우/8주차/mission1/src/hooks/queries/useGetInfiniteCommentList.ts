import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "../../apis/comment";
import { PAGINATION_ORDER } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteCommentList(
  lpId: number,
  limit: number,
  search: string,
  order: PAGINATION_ORDER,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getCommentList({ cursor: pageParam, limit, search, order }, lpId),
    queryKey: [QUERY_KEY.comments, lpId,search, order],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteCommentList;