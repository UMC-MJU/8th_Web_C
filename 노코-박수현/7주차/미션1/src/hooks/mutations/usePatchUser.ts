import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../../apis/user";
import { QUERY_KEY } from "../../constants/key";
import { RequestUserDto } from "../../types/user";

const usePatchUser = (userId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ name, bio, avatar }: RequestUserDto) => patchUser({ name, bio, avatar }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.myInfo, userId],
            });
        }
    });
};


export default usePatchUser;
