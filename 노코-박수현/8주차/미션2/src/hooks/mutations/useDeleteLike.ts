import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { LpData, RequestLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,

    onMutate: async (lp: RequestLpDto) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lpDetail, lp.lpId],
      });

      const previousLpPost = queryClient.getQueryData<LpData>([
        QUERY_KEY.lpDetail,
        lp.lpId
      ]);

      const newLpPost = { ...previousLpPost };

      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      const likedIndex = previousLpPost?.likes.findIndex((like) => like.userId === userId) ?? -1; // like id 찾기

      if (likedIndex >= 0) {
        previousLpPost?.likes.splice(likedIndex, 1);
      } else {
        const newLike = { id: Date.now(), userId, lpId: Number(lp.lpId) }; // id를 모르기 때문의 임의로 생성
        previousLpPost?.likes.push(newLike);
      }

      queryClient.setQueryData([QUERY_KEY.lpDetail, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData([QUERY_KEY.lpDetail, newLp.lpId], context?.previousLpPost);
    },

    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpDetail, variables.lpId],
      })
    }
  });
}

export default useDeleteLike;