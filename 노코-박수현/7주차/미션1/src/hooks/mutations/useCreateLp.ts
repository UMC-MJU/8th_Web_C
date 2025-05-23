import { useMutation } from "@tanstack/react-query";
import { postLp } from "../../apis/lp";

export default function useCreateLp() {
  return useMutation({
    mutationFn: postLp,
  });
}