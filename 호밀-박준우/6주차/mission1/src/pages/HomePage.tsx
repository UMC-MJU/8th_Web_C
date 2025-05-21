import { useState } from "react";
import { Link } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../types/common";
import { Lp } from "../types/lp";

export default function HomePage() {

  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const { data, isLoading, isError } = useGetLpList({
    cursor: undefined,
    search: "",
    order,
    limit: 12,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <span className="text-lg">로딩 중...</span>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center text-red-500 mt-8">
        LP 목록을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  const lpList: Lp[] = data?.data

  return (
    <div className="p-4">
      {/* 정렬 토글 버튼 */}
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={
            order === PAGINATION_ORDER.desc
              ? "px-4 py-2 bg-blue-500 text-white rounded"
              : "px-4 py-2 bg-gray-200 text-gray-700 rounded"
          }
        >
          최신순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={
            order === PAGINATION_ORDER.asc
              ? "px-4 py-2 bg-blue-500 text-white rounded"
              : "px-4 py-2 bg-gray-200 text-gray-700 rounded"
          }
        >
          오래된순
        </button>
      </div>

      {/* LP 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {lpList.map((lp) => {
          const uploadedDate = new Date(lp.createdAt).toLocaleDateString();
          const likeCount = lp.likes?.length ?? 0;

          return (
            <Link
              key={lp.id}
              to={`/lp/${lp.id}`}
              className="group relative block overflow-hidden rounded-lg shadow transition-transform transform hover:scale-105"
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-white text-base font-semibold mb-1 truncate">
                  {lp.title}
                </h3>
                <p className="text-xs text-gray-200 mb-1">
                  업로드: {uploadedDate}
                </p>
                <p className="text-xs text-gray-200">❤️ {likeCount}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
