import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../../types/common";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";
import CommentSkeletonList from "./CommentSkeletonList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../apis/axios";
import useGetMyInfo from "../../hooks/queries/useGetMyInfo";
import { useAuth } from "../../context/AuthContext";

interface CommentsProps {
  lpId: number;
  order: PAGINATION_ORDER;
}

const Comments = ({ lpId, order }: CommentsProps) => {

  const { ref, inView } = useInView({ threshold: 0 });
  const queryClient = useQueryClient();

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  const [inputValue, setInputValue] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
  } = useGetInfiniteCommentList(lpId, 10, "", order);

  // 댓글 생성
  const { mutate, isPending: isPosting } = useMutation({
    mutationFn: async (content: string) => {
      const res = await axiosInstance.post(`/v1/lps/${lpId}/comments`, {
        content,
      });
      return res.data;
    },
    onSuccess: () => {
      setInputValue("");
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });

  // 댓글 수정
  const { mutate: updateComment } = useMutation({
    mutationFn: async ({ commentId, content }: { commentId: number; content: string }) => {
      const res = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, {
        content,
      });
      return res.data;
    },
    onSuccess: () => {
      setEditingCommentId(null);
      setEditContent("");
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId: number) => {
      const res = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const comments = commentPages?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="space-y-4">
      {/* 댓글 입력창 */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-gray-700 rounded">
        <div className="w-8 h-8 rounded-full bg-blue-200 text-white flex items-center justify-center font-bold text-sm">
          박
        </div>
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="flex-1 p-2 rounded bg-gray-600 text-white text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="px-3 py-1 bg-blue-200 hover:bg-blue-600 text-white text-sm rounded"
          onClick={() => mutate(inputValue)}
          disabled={!inputValue.trim() || isPosting}
        >
          {isPosting ? "작성 중..." : "작성"}
        </button>
      </div>

      {/* 댓글 리스트 */}
      {comments.map((comment) => (
        <div key={comment.id} className="bg-gray-700 p-3 rounded">
          <div className="flex items-center gap-2 mb-1 justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">
                {comment.author?.name || "익명"}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            {/* 본인 댓글일 경우 수정/삭제 버튼 */}
            {me?.data.id===comment.authorId && (
              <div className="text-white text-xs space-x-2">
                <button onClick={() => {
                  setEditingCommentId(comment.id);
                  setEditContent(comment.content);
                }}>수정</button>
                <button onClick={() => deleteComment(comment.id)}>삭제</button>
              </div>
            )}
          </div>
          {editingCommentId === comment.id ? (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                className="flex-1 p-1 text-sm text-black rounded"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button
                className="bg-green-500 text-white px-2 rounded text-sm"
                onClick={() => updateComment({ commentId: comment.id, content: editContent })}
              >
                저장
              </button>
              <button
                className="bg-gray-500 text-white px-2 rounded text-sm"
                onClick={() => setEditingCommentId(null)}
              >
                취소
              </button>
            </div>
          ) : (
            <p className="text-sm text-white">{comment.content}</p>
          )}
        </div>
      ))}

      {(isFetching || isLoading) && <CommentSkeletonList count={3} />}
      <div ref={ref} className="h-1" />
    </div>
  );
};

export default Comments;
