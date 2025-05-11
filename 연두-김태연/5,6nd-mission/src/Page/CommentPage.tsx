import { useState, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CircleUserRound } from "lucide-react";
import { useAuth } from '../context/AuthContext'; 

import CommentSkeleton from "../components/CommentSkeleton";
const COMMENTS_PER_PAGE = 10;

export default function CommentPage(): JSX.Element {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const location = useLocation();
  const { id: lpId } = location.state || {};

  const { token, isLoggedIn } = useAuth(); //

  if (!lpId) {
    return <div className="text-white text-center mt-10">유효하지 않은 접근입니다.</div>;
  }
const toggleOrder = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  const fetchComments = async ({ pageParam = 0 }): Promise<FetchCommentsResponse> => {
    console.log(`Fetching comments for lpId: ${lpId}, cursor: ${pageParam}, order: ${order}`);
    const backendApiUrl = import.meta.env.VITE_SERVER_API_URL;
    if (!backendApiUrl) {
        console.error("VITE_SERVER_API_URL environment variable is not set!");
        throw new Error("Backend API URL is not configured.");
    }
    try {
      const headers: any = {
           'Cache-Control': 'no-cache',
           'Pragma': 'no-cache',
           'Expires': '0'
      };

      if (token) {
         headers['Authorization'] = `Bearer ${token}`;
      } else {
         console.warn("Attempting to fetch comments without a token. Expected 401 if login is required.");
      }

      const res = await axios.get(`${backendApiUrl}/v1/lps/${lpId}/comments`, { 
        params: { 
          cursor: pageParam,
          limit: COMMENTS_PER_PAGE,
          order
        },
        headers: headers 
      });

      console.log("API Response:", res.data);

      const responseData = res.data.data; 

      if (!responseData || !Array.isArray(responseData.data)) {
          console.error("Invalid API response structure:", res.data);
           if (typeof res.data === 'string' && res.data.startsWith('<!doctype html>')) {
              throw new Error("Received HTML instead of JSON. Check your backend API URL or proxy settings.");
           }
          throw new Error("Invalid API response structure for comments.");
      }

      return {
        data: responseData.data,
        nextCursor: responseData.nextCursor,
        hasNext: responseData.hasNext,
      };

    } catch (error) {
       console.error("Error fetching comments:", error);
       if (axios.isAxiosError(error)) {
          console.error("Axios error details:", error.response?.status, error.response?.data);
          if (error.response?.status === 401) {
             console.error("401 Unauthorized: Authentication failed. Please check if you are logged in or your token is valid.");
          }
           if (error.response?.status === 404) {
             console.error("API endpoint not found. Check the URL:", `${backendApiUrl}/v1/lps/${lpId}/comments`);
          }
       }
       throw error;
    }
  };

  // useInfiniteQuery 훅 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery<FetchCommentsResponse, Error>({
    queryKey: ["comments", lpId, order],
    queryFn: fetchComments,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
        return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
    enabled: !!lpId && isLoggedIn, 
    retry: 3,
    retryDelay: 1000
  });

  // ... (toggleOrder 함수는 동일)

  // 로딩 상태 또는 에러 상태 처리
   if (!isLoggedIn && !lpId) { 
       return <div className="text-white text-center mt-10">로그인이 필요하거나 유효하지 않은 접근입니다.</div>;
   }

   if (!isLoggedIn && lpId) { 
       return <div className="text-white text-center mt-10">댓글을 보려면 로그인이 필요합니다.</div>;
   }
  if (isLoading) {
     return <div className="text-white text-center mt-10">댓글 로딩 중...</div>;
  }
  if (isError) {
     return <div className="text-red-500 text-center mt-10">댓글을 불러오는 데 실패했습니다: {error?.message}</div>;
  }

  const allComments = data?.pages.flatMap(page => page.data) || [];
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
          className="flex-grow px-3 py-1 rounded bg-[#1d1f22] text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#F0648C]"
          placeholder="댓글을 입력해주세요"
          disabled={isFetching || !isLoggedIn} 
        />
        <button 
          className="w-20 text-sm px-2 py-1 border rounded bg-black hover:bg-[#F0648C] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isFetching || !isLoggedIn}
        >
          작성
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
                {page?.data?.map((comment: Comment) => (
                  <div key={comment.id} className="flex items-start gap-3 bg-[#2a2d31] p-3 rounded">
                    <CircleUserRound size={24} color="#F0648C" />
                    <div className="flex-1">
                      <p className="text-sm font-bold">{comment.author?.name || "알 수 없음"}</p>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </Fragment>
            ))
          )}
        </div>

      {/* 더보기 버튼 (다음 페이지가 있을 때만 표시) */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="w-full mt-4 text-sm text-[#F0648C] border border-[#F0644C] rounded py-2 hover:bg-[#F0648C] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetchingNextPage ? "댓글 불러오는 중..." : "더 보기"}
        </button>
      )}

       {/* 모든 데이터를 다 불러왔을 때 메시지 */}
       {!hasNextPage && !isEmpty && !isFetching && (
           <div className="text-center text-gray-500 mt-4">
              더 이상 댓글이 없습니다.
           </div>
       )}
    </div>
  );
}
