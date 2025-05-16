import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLike(lpId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.lpDetail, lpId],
            exact: true,
          });
    },
  });
}

export default useDeleteLike;