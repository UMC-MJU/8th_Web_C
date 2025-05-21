import { useMutation } from "@tanstack/react-query";
import { createLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useCreateLp() {
  return useMutation({
    mutationFn: createLp,
    onSuccess: (data) => {
      alert("LP 생성 완료!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, data?.data.id] });
    },
  });
}

export default useCreateLp;
