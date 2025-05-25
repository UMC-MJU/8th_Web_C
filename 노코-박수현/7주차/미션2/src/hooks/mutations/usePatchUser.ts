import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../../apis/user";
import { QUERY_KEY } from "../../constants/key";
import { RequestUserDto } from "../../types/user";
import { ResponseMyInfoDto } from "../../types/auth";

const usePatchUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchUser,
        onMutate: async ({ name, bio, avatar }: RequestUserDto) => {

            const me = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo,
            ]);

            if (!me) return;

            const patchMe: ResponseMyInfoDto = {
                ...me,
                data: {
                    ...me.data,
                    name: name ?? me.data.name,
                    bio: bio ?? me.data.bio,
                    avatar: avatar ?? me.data.avatar,
                },
            };

            console.log(patchMe)
            queryClient.setQueryData([QUERY_KEY.myInfo], patchMe);

            return { me, patchMe };
        },

        onError: (err, variables, context) => {
            console.log(err, variables);
            queryClient.setQueryData([QUERY_KEY.myInfo], context?.me);
        },

        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.myInfo],
            })
        }
    });
}


export default usePatchUser;
