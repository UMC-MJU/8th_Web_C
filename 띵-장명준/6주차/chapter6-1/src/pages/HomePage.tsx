// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import type { Lp } from "../types/lp";

type LpId = Lp["id"];

const HomePage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

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

  if (isPending) return <div className="mt-20 text-center">Loading...</div>;
  if (isError) return <div className="mt-20 text-center">Error.</div>;

  // 카드 클릭 핸들러
  const handleCardClick = (id: LpId) => {
    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
      return;
    }
    navigate(`/lp/${id}`);
  };

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
        {lpsPages?.pages
          .map((page) => page.data.data)
          .flat()
          .map((lp) => (
            <div
              key={lp.id}
              className="
                group relative rounded-lg overflow-hidden shadow-lg
                transform hover:scale-105 transition-all duration-300
                cursor-pointer
              "
              onClick={() => handleCardClick(lp.id)}
            >
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="object-cover w-full h-48"
              />

              {/* Hover overlay */}
              <div
                className="
                  absolute inset-0 bg-black/50
                  flex flex-col justify-end p-4
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <h3 className="text-white text-lg font-bold">{lp.title}</h3>
                <p className="text-gray-300 text-sm">
                  {new Date(lp.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-300 text-sm flex items-center">
                  ❤️ <span className="ml-1">{lp.likes.length}</span>
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* 더 가져오기 트리거 */}
      <div ref={ref} className="mt-4 text-center">
        {isFetching && <div>Loading more…</div>}
      </div>
    </div>
  );
};

export default HomePage;
