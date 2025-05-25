import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLplist } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
//import { ResponseLpListDto } from "../../types/lp";

// const initialData: ResponseLpListDto = {
//     status: true,
//     statusCode: 200,
//     message: "",
//     data: {
//         data: [],
//     },
//     nextCursor: 0,
//     hasNext: false,
// };

function useGetLpList({ cursor, limit, search, order }: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, cursor, limit, order],
        queryFn: () => getLplist({
            cursor,
            limit: 50,
            search,
            order,
        }),
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분
        //enabled: Boolean(search), // 조건에 따라 쿼리를 실행 여부 제어
        refetchInterval: 100 * 60, // 1분마다 refetch
        // initialData: initialData, // 초기 데이터 설정

        // 파리미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임을 줄여줌
        // keepPreviousData: true, // 이전 데이터 유지
        select: data => data.data, // 쿼리 결과에서 data만 추출
    });
}

export default useGetLpList;