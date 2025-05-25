import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import { QUERY_KEY } from "../../constants/key";
import { LpData } from "../../types/lp";

const fetchLpDetail = async (lpId: string): Promise<LpData> => {
  const res = await axiosInstance.get(`/v1/lps/${lpId}`);
  return res.data.data;
};

export default function useLpDetail(lpId: string) {
  return useQuery({
    queryKey: [QUERY_KEY.lpDetail, lpId],
    queryFn: () => fetchLpDetail(lpId),
    enabled: !!lpId,
  });
}
