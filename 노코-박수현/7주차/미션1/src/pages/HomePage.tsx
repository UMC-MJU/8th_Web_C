import { useOutletContext } from "react-router-dom";
import LpList from "../components/LpCard/LpCard";
import { PAGENATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

export default function HomePage() {
  const { search, isSidebarOpen, setIsSidebarOpen } = useOutletContext<{ search: string, isSidebarOpen: boolean, setIsSidebarOpen: (value: boolean) => void }>();
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);
  //const { data, isPending, isError } = useGetLpList({ search, order });
  const { data: lps, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetInfiniteLpList(20, search, order); // 50은 페이지당 아이템 수, "desc"는 정렬 기준
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) return <div>Error...</div>;

  return (
    <>
      {search && isPending && <div>Loading...</div>}

      {(
        <div className="relative h-10 mb-4">
          <div className="absolute right-0">
            <label className="text-sm text-gray-600 mr-2 inline-block">정렬:</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value as PAGENATION_ORDER)}
              className="px-2 py-1 border rounded text-sm inline-block"
            >
              <option value={PAGENATION_ORDER.desc}>최신순</option>
              <option value={PAGENATION_ORDER.asc}>오래된순</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex h-full">
        <SideBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="w-full p-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {lps?.pages?.map((page) => page.data.data)
            ?.flat()
            ?.map((lp) => <LpList key={lp.id} lp={lp} />)}
          {isFetching && <LpCardSkeletonList count={20} />}
        </div>
        <div ref={ref} />
      </div>
    </>
  )
}
