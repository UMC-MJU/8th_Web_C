import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { useNavigate } from "react-router-dom";

export const useDeleteLp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteLp,
    onSuccess: (data) => {
        console.log("성공", data);
        alert("삭제가 완료되었습니다.");
        navigate("/"); // 홈으로 이동
      },
    onError: (err) => {
        console.error("삭제", err);
      alert("삭제에 실패했습니다.");
    },
  });
}