import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { PAGENATION_ORDER } from "../../enums/common";

const useComment = (lpId: string, order: PAGENATION_ORDER) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ content }: { content: string }) => postComment(lpId, content),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.comments, lpId, order],
        }).then(() => {
        });
      }
    });
  };
  

export default useComment;
