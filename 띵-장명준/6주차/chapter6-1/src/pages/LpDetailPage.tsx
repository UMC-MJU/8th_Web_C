// src/pages/LpDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../apis/axios"; // axios 인스턴스 경로
import LoadingSpinner from "../components/LoadingSpinner";
import { Lp } from "../types/lp"; // Lp 타입
import { formatDistanceToNow } from "date-fns";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";

type ResponseLpDetailDto = { data: Lp };

const LpDetailPage: React.FC = () => {
  // 🚩 useParams 제네릭은 실제 라우트 파라미터 이름( lpId or lpid )에 맞춰 바꿔주세요
  const { lpId } = useParams<{ lpId: string }>();
  const id = Number(lpId);

  // React-Query로 상세 데이터 가져오기
  const { data, isLoading, error } = useQuery<Lp, Error>({
    queryKey: ["lpDetail", id],
    queryFn: async () => {
      const res = await axiosInstance.get<ResponseLpDetailDto>(`/v1/lps/${id}`);
      return res.data.data;
    },
    enabled: Boolean(lpId),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error || !data)
    return (
      <div className="p-4 text-center">
        상세 정보를 불러오는 중 오류가 발생했습니다.
      </div>
    );

  const lp = data;

  return (
    <div className="px-4 py-12 flex justify-center">
      <div className="max-w-3xl w-full bg-gray-850 rounded-2xl p-8 space-y-6">
        {/* Header: 작성자 · 시간 · 편집/삭제 */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={lp.thumbnail}
              alt="avatar"
              className="w-10 h-10 rounded-full bg-gray-700"
            />
            <span className="text-white font-medium">{lp.authorId}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">
              {formatDistanceToNow(new Date(lp.createdAt), { addSuffix: true })}
            </span>
            <AiOutlineEdit className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <AiOutlineDelete className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white">{lp.title}</h1>

        {/* Thumbnail */}
        <div className="flex justify-center">
          <div className="relative w-80 h-80 bg-gray-800 rounded-xl shadow-2xl">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="absolute inset-0 w-full h-full object-cover rounded-full border-2 border-gray-700 animate-spin"
              style={{ animationDuration: "8s" }}
            />
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-300 leading-relaxed">{lp.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-xs bg-gray-700 text-gray-200 rounded-full px-3 py-1"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* Likes */}
        <div className="flex items-center gap-2">
          <AiOutlineHeart className="w-6 h-6 text-pink-500" />
          <span className="text-white">{lp.likes.length}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
