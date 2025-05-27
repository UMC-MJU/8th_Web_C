import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { PAGENATION_ORDER } from "../../enums/common";

const useDeleteComment = (lpId: string, order: PAGENATION_ORDER) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ commentId }: { commentId: number }) => deleteComment(lpId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.comments, lpId, order],
            }).then(() => {
            });
        }
    });
};


export default useDeleteComment;
