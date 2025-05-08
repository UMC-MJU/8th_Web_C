import React from 'react';
import { useLocation } from 'react-router-dom';

const SpinningCD: React.FC = () => {
  const location = useLocation();
  const imageUrl = location.state?.thumbnail;

  if (!imageUrl) {
    return <div>이미지가 없습니다.</div>;
  }

  return (
    <div className="w-60 h-60 mx-auto">
      <div className="relative w-full h-full animate-spin-slow rounded-full">
          <img
            src={imageUrl}
            alt="CD Cover"
            className="rounded-full w-full h-full border-2 border-[#F0648C]"
          />
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white border-[#F0648C] rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-gray-300" />
      </div>

    </div>
  );
};

export default SpinningCD;
