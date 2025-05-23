import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/user";

const useDeleteUser = () => {

    return useMutation({
        mutationFn: deleteUser,
    });
};


export default useDeleteUser;
