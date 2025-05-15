import { useInfiniteQuery } from '@tanstack/react-query'; 
import { Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Fragment, useRef, useEffect } from 'react'; 

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; 
dayjs.locale('ko'); // 한글 설정
dayjs.extend(relativeTime);

interface Lp {
  id: number;
  thumbnail: string;
  title: string;
  createdAt: string;
  likes: { id: number; userId: number; lpId: number }[];
  tags: { id: number; name: string }[];
  content: string;
}

const ITEMS_PER_PAGE = 9; 

const fetchLps = async ({ pageParam = 1 }): Promise<{ data: Lp[], nextPage: number | undefined }> => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/v1/lps?page=${pageParam}&limit=${ITEMS_PER_PAGE}`);
  
  if (!response.ok) {
    const errorBody = await response.json().catch(() => null); 
    const errorMessage = errorBody?.message || 'LP 목록을 불러오는 데 실패했습니다.';
    throw new Error(errorMessage);
  }

  const json = await response.json();
  const lpList = json.data?.data; 

  if (!lpList || !Array.isArray(lpList)) {
    throw new Error('유효한 LP 데이터 형식이 아닙니다.');
  }

  const nextPage = lpList.length < ITEMS_PER_PAGE ? undefined : pageParam + 1;

  return { data: lpList, nextPage };
};

const LpSkeleton: React.FC = () => (
  <div className="lp-item animate-pulse">
    <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-300"> 
    </div>
    <div className="mt-2">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="flex justify-between">
        <div className="h-3 bg-gray-300 rounded w-1/4"></div> 
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div> 
          <div className="h-3 bg-gray-300 rounded w-8"></div> 
        </div>
      </div>
    </div>
  </div>
);


export default function LpList(): JSX.Element {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); 

  // useInfiniteQuery 훅 사용
  const { 
    data, 
    error, 
    isLoading,      
    isFetchingNextPage,
    hasNextPage,    
    fetchNextPage,   
    isError           
  } = useInfiniteQuery({
    queryKey: ['lps'],
    queryFn: fetchLps,
    initialPageParam: 1, 
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
  });

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || isLoading || isError) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 } 
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, isLoading, isError, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="mx-8 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
          <LpSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="mx-8 mt-5 text-red-500">데이터를 불러오지 못했습니다: {error?.message}</div>;
  }

  const handleDetailLp = (lp: Lp) => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/LoginPage");
      return;
    }

    navigate('/DetailLP', {
      state: {
        id: lp.id,
        thumbnail: lp.thumbnail,
        name: lp.tags && lp.tags.length > 0 ? lp.tags[0].name : "작성자 없음", 
        title: lp.title,
        createdAt: lp.createdAt,
        content: lp.content,
      },
    });
  };

  return (
    <div className="mx-8 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {data?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.data.map((lp) => {
              const relative = dayjs(lp.createdAt).fromNow(); 

              return (
                <div
                  key={lp.id}
                  className="lp-item group transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10"
                >
                  <div className="w-full aspect-square overflow-hidden rounded-lg relative">
                    <img
                      src={lp.thumbnail}
                      alt={lp.title}
                      className="w-50 h-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-40 border-0"
                      onClick={() => handleDetailLp(lp)}
                    />

                    <div className="absolute inset-0 flex flex-col justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <p className="text-sm font-semibold px-8">{lp.title}</p> 
                      <div className="flex justify-between mx-8 mt-2.5 cursor-pointer">
                        <p className="text-sm">{relative}</p>
                        <div className="flex items-center gap-1">
                          <Heart size={16} />
                          <p className="text-sm">{lp.likes.length}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}

        {/* 스켈레톤 UI 표시 */}
        {isFetchingNextPage && (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
              <LpSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {!isLoading && !isFetchingNextPage && hasNextPage && (
         <div ref={loadMoreRef} style={{ height: '20px', margin: '20px 0' }}>
         </div>
      )}

       {!isLoading && !hasNextPage && (
           <div className="text-center text-gray-500 mt-8 mb-16">
              마지막 LP입니다.
           </div>
       )}

    </div>
  );
}
