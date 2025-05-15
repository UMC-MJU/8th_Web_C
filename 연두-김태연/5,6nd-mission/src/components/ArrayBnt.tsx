import { useState } from "react";

export default function ArrayBnt(): JSX.Element {
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleSortChange = (order: 'latest' | 'oldest') => {
    setSortOrder(order);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
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
                  className=" text-center block w-full px-4 py-2 text-sm text-white hover:text-[#F0648C]"
                >
                 오래된순
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
