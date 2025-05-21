import { useState, Fragment } from "react";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import { useAuth } from '../context/AuthContext'; 
import { Pencil } from 'lucide-react';
import { Trash2 } from 'lucide-react';

import { createComment, getCommentsApi, patchCommentAPI, delCommentAPI } from "../api/commentAPI"; 
import CommentSkeleton from "../components/CommentSkeleton";

export default function CommentPage(): JSX.Element {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const location = useLocation();
  const [comInput, setComInput] = useState<string>("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");

  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuth();
  // const isMyComment = comment.author?.id === user?.id;  
  // console.log(user);
  const { id: lpId } = location.state || {};

  const toggleOrder = () => setOrder((prev) => (prev === "asc" ? "desc" : "asc"));

  const {
    mutate: addComment,
    isLoading: isAddingComment,
  } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setComInput("");
      queryClient.invalidateQueries(["comments", lpId, order]);
    },
    onError: () => {
      alert("댓글을 추가하는 데 실패했습니다.");
    },
  });

  const {
    mutate: updateComment,
  } = useMutation({
    mutationFn: patchCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", lpId, order]);
      setEditingId(null);
      setEditingContent("");
    },
    onError: () => {
      alert("댓글 수정에 실패했습니다.");
    },
  });

  const {
    mutate: deleteComment,
  } = useMutation({
    mutationFn: delCommentAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", lpId, order]);
    },
    onError: () => {
      alert("댓글 삭제에 실패했습니다.");
    },
  });

  const fetchComments = async ({ pageParam = 0 }) => {
    if (!lpId) return;
    return await getCommentsApi({
      lpId: Number(lpId),
      cursor: pageParam,
      limit: 10,
      order,
      token: token || localStorage.getItem("token") || "",
    });
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["comments", lpId, order],
    queryFn: fetchComments,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId && isLoggedIn,
    retry: 3,
    retryDelay: 1000,
  });

  const handleAddComment = () => {
    const trimmed = comInput.trim();
    if (!trimmed || !lpId) return;
    addComment({ lpId, content: trimmed });
  };

  const handleUpdateComment = (commentId: number) => {
    if (!editingContent.trim() || !lpId) return;
    updateComment({ lpId, commentId, content: editingContent });
  };

  const handleDeleteComment = (commentId: number) => {
    if (!lpId) return;
    if (confirm("댓글을 삭제하시겠습니까?")) {
      deleteComment({ lpId, commentId });
    }
  };

  const {  user, token } = useAuth();
  console.log(user);
  if (!lpId) {
    return <div className="text-white text-center mt-10">유효하지 않은 접근입니다.</div>;
  }

  if (!isLoggedIn) {
    return <div className="text-white text-center mt-10">댓글을 보려면 로그인이 필요합니다.</div>;
  }

  if (isLoading) {
    return <div className="text-white text-center mt-10">댓글 로딩 중...</div>;
  }

  if (isError) {
    return <div className="text-red-500 text-center mt-10">댓글을 불러오는 데 실패했습니다: {error.message}</div>;
  }

  const allComments = data?.pages.flatMap((page) => page.data) || [];
  const isEmpty = allComments.length === 0 && !isFetching;

  return (
    <div className="bg-[#212529] w-[50%] h-auto mx-auto mt-12 mb-10 p-6 rounded-lg text-white space-y-4">
      <div className="flex justify-between items-center mb-4">
        <p className="font-bold">댓글 ({allComments.length})</p>
        <button
          onClick={toggleOrder}
          className="text-sm px-2 py-1 border rounded bg-black"
          disabled={isFetching}
        >
          {order === "desc" ? "최신순 ▽" : "오래된순 ▽"}
        </button>
      </div>

      {/* 댓글 입력 */}
      <div className="flex justify-between items-center space-x-2">
        <input
          value={comInput}
          onChange={(e) => setComInput(e.target.value)}
          className="flex-grow px-3 py-1 rounded bg-[#1d1f22] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F0648C]"
          placeholder="댓글을 입력해주세요"
          disabled={!isLoggedIn || isFetching}
        />
        <button
          onClick={handleAddComment}
          disabled={!isLoggedIn || isAddingComment || isFetching}
          className="w-20 text-sm px-2 py-1 border rounded bg-black hover:bg-[#F0648C] hover:text-white disabled:opacity-50"
        >
          {isAddingComment ? "작성 중..." : "작성"}
        </button>
      </div>

      <div className="space-y-4">
        {isLoading || (isFetching && allComments.length === 0) ? (
          Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={i} />)
        ) : isEmpty ? (
          <div className="text-center text-gray-500">아직 댓글이 없습니다. 첫 댓글을 달아보세요!</div>
        ) : (
          data?.pages.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.data.map((comment: Comment) => {
                const isMyComment = comment.author?.id === user?.id;
                return (
                  <div key={comment.id} className="flex items-start gap-3 bg-[#2a2d31] p-3 rounded">
                    <CircleUserRound size={24} color="#F0648C" />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{comment.author?.name || "알 수 없음"}</p>
                      {editingId === comment.id ? (
                        <>
                          <textarea
                            className="w-full bg-[#1d1f22] text-white p-2 rounded"
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleUpdateComment(comment.id)}
                              className="text-sm text-white bg-[#F0648C] px-2 py-1 rounded"
                            >
                              저장
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-sm text-gray-400 px-2 py-1 border rounded"
                            >
                              취소
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                      )}
                    </div>
                    {isMyComment && (
                      <div className="flex flex-row gap-1 ml-2">
                        <button
                          onClick={() => {
                            setEditingId(comment.id);
                            setEditingContent(comment.content);
                          }}
                          className="text-xs text-gray-300 hover:text-white"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-xs text-gray-300 hover:text-red-400"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </Fragment>
          ))
        )}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full mt-4 text-sm text-[#F0648C] border border-[#F0648C] rounded py-2 hover:bg-[#F0648C] hover:text-white disabled:opacity-50"
        >
          {isFetchingNextPage ? "댓글 불러오는 중..." : "더 보기"}
        </button>
      )}

      {!hasNextPage && !isEmpty && !isFetching && (
        <div className="text-center text-gray-500 mt-4">
          더 이상 댓글이 없습니다.
        </div>
      )}
    </div>
  );
}

