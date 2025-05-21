import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../App";
import { QUERY_KEY } from "../constants/key";
import { axiosInstance } from "../apis/axios";

interface UpdateNicknameDto {
  name: string;
}

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: async ({ name }: UpdateNicknameDto) => {
      const { data } = await axiosInstance.patch("/v1/users/me", { name });
      return data;
    },
    onMutate: async ({ name }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.me] });

      const previous = queryClient.getQueryData([QUERY_KEY.me]);

      queryClient.setQueryData([QUERY_KEY.me], (old: any) => ({
        ...old,
        data: {
          ...old.data,
          name,
        },
      }));

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY.me], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.me] });
    },
  });
};
