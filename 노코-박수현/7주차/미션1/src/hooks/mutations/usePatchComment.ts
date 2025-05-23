import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { PAGENATION_ORDER } from "../../enums/common";

const usePatchComment = (lpId: string, order: PAGENATION_ORDER) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content, commentId }: { content: string, commentId: number }) => patchComment(lpId, commentId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.comments, lpId, order],
            }).then(() => {
            });
        }
    });
};


export default usePatchComment;
