
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLike, deleteLike } from "../apis/lp";
import { QUERY_KEY } from "../constants/key";

export const useToggleLike = (lpId: number, isLiked: boolean, currentUserId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await deleteLike({ lpId });
      } else {
        await postLike({ lpId });
      }
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lps, lpId] });

      const previous = queryClient.getQueryData([QUERY_KEY.lps, lpId]);

      queryClient.setQueryData([QUERY_KEY.lps, lpId], (old: any) => {
        if (!old) return old;
        const updatedLikes = isLiked
          ? old.data.likes.filter((l: any) => l.userId !== currentUserId)
          : [...old.data.likes, { id: Date.now(), userId: currentUserId, lpId }];

        return {
          ...old,
          data: {
            ...old.data,
            likes: updatedLikes,
          },
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY.lps, lpId], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
    },
  });
};
