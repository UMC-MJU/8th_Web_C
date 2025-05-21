import LpList from "../Query/LPList";
import { useState } from "react";
import AddLp from "../components/AddLp";
import { Plus } from 'lucide-react';


export default function HomePage(): JSX.Element {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const toggleDropdown = () => setDropdownOpen(prev => !prev);
  const handleSortChange = (order: 'latest' | 'oldest') => {
    setSortOrder(order);
    setDropdownOpen(false);
  };

  const toggleModal = () => setIsModalOpen(prev => !prev);

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="w-full max-w-5xl px-50 flex justify-start mt-7">
        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="w-28 px-4 py-2 bg-black border border-gray-300 rounded text-sm font-bold text-white text-center"
          >
            {sortOrder === 'latest' ? '최신순 ▽' : '오래된순 ▽'}
          </button>

          {dropdownOpen && (
            <div className="absolute w-28 left-0 mt-1 bg-black border border-gray-300 rounded shadow-md z-10">
              {sortOrder !== 'latest' && (
                <button
                  onClick={() => handleSortChange('latest')}
                  className="text-center block w-full px-4 py-2 text-sm text-white hover:text-[#F0648C]"
                >
                  최신순
                </button>
              )}
              {sortOrder !== 'oldest' && (
                <button
                  onClick={() => handleSortChange('oldest')}
                  className="text-center block w-full px-4 py-2 text-sm text-white hover:text-[#F0648C]"
                >
                  오래된순
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* LP 리스트 */}
      <div className="w-full flex justify-center mt-4">
        <LpList />
      </div>

      {/* + 버튼 */}
      <button
        onClick={toggleModal}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#F0648C] flex items-center justify-center shadow-lg hover:bg-[#e2557d]"
      >
        <Plus size={28} color="white" />
      </button>

      {/* AddLp 모달 */}
      {isModalOpen && (
        <AddLp onClose={toggleModal} />
      )}
    </div>
  );
}
