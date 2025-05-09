import { useOutletContext } from "react-router-dom";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpList from "../components/LpList";
import { PAGENATION_ORDER } from "../enums/common";
import { useState } from "react";
import SideBar from "../components/SideBar";

export default function HomePage() {
  const { search, isSidebarOpen, setIsSidebarOpen } = useOutletContext<{ search: string, isSidebarOpen: boolean, setIsSidebarOpen: (value: boolean) => void }>();
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);
  const { data, isPending, isError } = useGetLpList({ search, order });

  if (isError) return <div>Error...</div>;

  return (
    <>
      {search && isPending && <div>Loading...</div>}

      {data && (
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
        <div className="w-full p-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {data?.data.map((lp) => <LpList key={lp.id} lp={lp} />)}
        </div>
      </div>
    </>
  )
}
