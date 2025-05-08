import { useQuery } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
dayjs.locale('ko'); // 한글...이 안 나온다...   
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

const fetchLps = async (): Promise<Lp[]> => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/v1/lps`);
  if (!response.ok) {
    throw new Error('LP 목록을 불러오는 데 실패했습니다.');
  }

  const json = await response.json();
  const lpList = json.data?.data;

  if (!lpList || !Array.isArray(lpList)) {
    throw new Error('LP 데이터가 없습니다.');
  }

  return lpList;
};

export default function LpList(): JSX.Element {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); 

  const { data, error, isLoading } = useQuery<Lp[]>({
    queryKey: ['lps'],
    queryFn: fetchLps,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  const handleDetailLp = (lp: Lp) => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/LoginPage");
      return;
    }

    navigate('/DetailLP', {
      state: {
        thumbnail: lp.thumbnail,
        name: lp.tags[0]?.name || "작성자 없음", 
        title: lp.title,
        createdAt: lp.createdAt,
        content: lp.content,
      },
    });
  };

  return (
    <div className="mx-8 mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {data?.map((lp) => {
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
    </div>
  );
}
