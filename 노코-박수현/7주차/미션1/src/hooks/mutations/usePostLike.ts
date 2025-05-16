import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function usePostLike(lpId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLike,
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.lpDetail, lpId],
            exact: true,
        });
    },
    onError: (error, valuables, content) => {},
    onMutate: () => {
      return 'Hello';
      },
    onSettled: () => {
      return 'Hello';
      }
  });
}

export default usePostLike;