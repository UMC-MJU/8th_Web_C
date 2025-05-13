// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  // 카드 클릭 핸들러

  // 검색어, 정렬 상태
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  // 무한 스크롤 훅
  const {
    data: lpsPages,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) return <div className="mt-20 text-center">Error...</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 검색 input */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
      />

      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-4 space-x-2">
        <button
          className={`px-4 py-2 rounded border ${
            order === "desc"
              ? "bg-pink-500 text-white"
              : "bg-gray-800 text-white"
          }`}
          onClick={() => setOrder("desc")}
        >
          최신순
        </button>
        <button
          className={`px-4 py-2 rounded border ${
            order === "asc"
              ? "bg-pink-500 text-white"
              : "bg-gray-800 text-white"
          }`}
          onClick={() => setOrder("asc")}
        >
          오래된순
        </button>
      </div>

      {/* LP 카드 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isPending && <LpCardSkeletonList count={20} />}
        {lpsPages?.pages
          .map((page) => page.data.data)
          .flat()
          .map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      <div ref={ref} className="mt-4 text-center" />
      {/* 더 가져오기 트리거 */}
    </div>
  );
};

export default HomePage;
