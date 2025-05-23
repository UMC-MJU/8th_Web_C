import { useMutation } from "@tanstack/react-query";
import { postImage } from "../../apis/lp";

export default function useUploadImage() {
  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return postImage(formData);
    },
  });
}