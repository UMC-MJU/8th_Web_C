// src/hooks/queries/useGetLpList.ts
import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getCommentList } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

interface CommentQueryDto extends PaginationDto {
    lpId: number;
  }

  function useGetComment({ lpId, cursor, search, order, limit }: CommentQueryDto) {
    return useQuery({
      queryKey: [QUERY_KEY.comments, { lpId, cursor, search, order, limit }],
      queryFn: () => getCommentList({ cursor, search, order, limit }, lpId),
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    });
  }
  
  export default useGetComment;