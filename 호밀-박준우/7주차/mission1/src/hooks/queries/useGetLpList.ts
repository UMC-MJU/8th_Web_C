// src/hooks/queries/useGetLpList.ts
import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    // order가 바뀌면 key가 달라져서 자동 refetch
    queryKey: [QUERY_KEY.lps, { cursor, search, order, limit }],
    queryFn: () => getLpList({ cursor, search, order, limit }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetLpList;
