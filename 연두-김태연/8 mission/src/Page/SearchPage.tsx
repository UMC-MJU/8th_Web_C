import { Search } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import useDebounce from '../Hook/uesDebounce';
import useFetchLpList from '../Hook/useFetchLpList';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
dayjs.locale('ko');
dayjs.extend(relativeTime);

// LP 데이터 타입 정의
interface Lp {
  id: number;
  thumbnail: string;
  title: string;
  createdAt: string;
  likes: { id: number; userId: number; lpId: number }[];
  tags: { id: number; name: string }[];
  content: string;
}

export default function SearchPage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredLps, setFilteredLps] = useState<Lp[]>([]);
  const debouncedQuery = useDebounce({ value: query, delay: 500 });
  const navigate = useNavigate();
  const {isLoggedIn} = useAuth();
  const lpList = useFetchLpList() as Lp[]; 

  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      try {
         setRecentSearches(JSON.parse(stored));
      } catch (error) {
         console.error("오류 : localStorage", error);
         setRecentSearches([]);
      }
    }
  }, []); 

  
  useEffect(() => {
    console.log('useEffect 실행: debouncedQuery:', debouncedQuery, 'lpList.length:', lpList.length);

    if (!debouncedQuery.trim()) {
      console.log('debouncedQuery 비어있음. filteredLps 초기화.');
      setFilteredLps([]);
      return;
    }

    if (lpList.length === 0) {
        console.log('lpList 비어있음. 필터링 건너뛰기.');
        setFilteredLps([]); 
        return;
    }

    console.log(`필터링 시작: 검색어="${debouncedQuery}"`);
    const result = lpList.filter(lp =>
      lp.title?.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    setFilteredLps(result); 
    console.log('필터링된 결과 개수:', result.length);

  }, [debouncedQuery, lpList]); 

  const handleSearch = () => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    const updatedSearches = [trimmedQuery, ...recentSearches.filter(item => item !== trimmedQuery)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 입력 필드에서 Enter 키 눌렀을 때
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };


  const handleRecentSearchClick = (item: string) => {
    setQuery(item);
   
  };


  // 결과 없음 상태 메시지 결정 로직 개선
   const showNoResults = !debouncedQuery.trim() ? (
        <p className="mt-8 text-center text-gray-400">검색어를 입력해 주세요.</p>
    ) : lpList.length === 0 ? (
     
         <p className="mt-8 text-center text-gray-400">LP 목록 로딩 중...</p> 
    ) : filteredLps.length === 0 ? ( 
        <p className="mt-8 text-center text-gray-400">'{debouncedQuery}'에 대한 검색 결과가 없습니다.</p>
    ) : null; 

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
    <div className="p-4 max-w-3xl mx-auto  text-white min-h-screen"> 
      {/* 검색 입력 필드 */}
      <div className="flex items-center border border-gray-600 rounded-md px-3 py-2 focus-within:border-[#F0648C] transition-colors">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          className="flex-1 outline-none ml-2 text-white placeholder-gray-500"
          placeholder="검색어를 입력하세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
         
      </div>

      {/* 최근 검색어 */}
      {recentSearches.length > 0 && query.trim() !== '' && filteredLps.length === 0 && ( 
         <div className="mt-4">
          <h2 className="text-sm text-gray-400 mb-2">최근 검색어</h2>
          <ul className="space-y-2">
            {recentSearches.map((item, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-300 bg-[#2a2f34] px-4 py-2 rounded hover:bg-[#343a40] cursor-pointer transition-colors"
                onClick={() => handleRecentSearchClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 검색 결과 */}
      {filteredLps.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredLps.map((lp) => ( 
             <div
                 key={lp.id} 
                 className="group bg-[#2a2f34] rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                 onClick={() => handleDetailLp(lp)}
             >
              <div className="w-full aspect-square overflow-hidden relative">
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-base font-semibold truncate">{lp.title}</p>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-300">
                    <p>{dayjs(lp.createdAt).fromNow()}</p>
                    <div className="flex items-center gap-1">
                       <Search size={14} /> 
                      <p>{lp.likes.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
