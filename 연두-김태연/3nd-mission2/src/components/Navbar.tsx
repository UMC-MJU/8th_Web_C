export default function Navbar() {
    return (
      <>
        <div className="flex w-full items-start justify-start space-x-3 text-lg font-medium pl-0">
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold">홈</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold">인기영화</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold">상영 중</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold">평점 높은</span>
            <span className="hover:text-[rgb(129,114,207)] transition duration-300 font-bold">개봉 예정</span>
        </div>


        <div className="flex items-center justify-center space-x-2 mt-4">
          <button className="px-2 py-1 text-sm border rounded">
            &lt;
          </button>
          <span className="text-sm  font-bold">1 페이지</span>
          <button className="px-2 py-1 text-sm border rounded">
            &gt;
          </button>
        </div>
      </>
    );
  }
  