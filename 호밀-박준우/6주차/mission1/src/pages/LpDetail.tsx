import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../apis/axios";
import { useEffect, useState } from "react";
import { Lp } from "../types/lp";
import { formatDistanceToNow } from "date-fns";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";

const LpDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState<Lp>();
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchLp = async () => {
            try {
                const res = await axiosInstance.get(`/v1/lps/${id}`);
                setData(res.data.data);
            } catch (error) {
                console.error("LP 디테일 요청 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLp();
    }, [id]);


    if (loading) return <div>Loading...</div>;
    if (!data) return <div>LP 정보를 불러올 수 없습니다.</div>;

      return (
    <div className="flex h-dvh">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 mt-20 bg-black min-h-screen px-4 py-10">
          <div className="max-w-3xl mx-auto bg-gray-800 text-white rounded-xl shadow-lg p-8 space-y-6">
            {/* 상단 - 작성자 + 시간 + 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={data.thumbnail}
                  alt="user"
                  className="w-10 h-10 rounded-full bg-gray-700"
                />
                <span className="font-semibold">{data.authorId}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <span className="text-sm">
                  {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                </span>
                <AiOutlineEdit className="w-5 h-5 hover:text-white cursor-pointer" />
                <AiOutlineDelete className="w-5 h-5 hover:text-white cursor-pointer" />
              </div>
            </div>

            {/* 제목 */}
            <h1 className="text-3xl font-bold">{data.title}</h1>

            {/* 썸네일 */}
            <div className="flex justify-center">
              <div className="relative w-72 h-72 bg-gray-700 rounded-full shadow-2xl overflow-hidden">
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className="absolute inset-0 w-full h-full object-cover animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              </div>
            </div>

            {/* 본문 */}
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {data.content}
            </p>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-700 text-sm px-3 py-1 rounded-full text-gray-200"
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            {/* 좋아요 */}
            <div className="flex items-center gap-2">
              <AiOutlineHeart className="text-pink-500 w-6 h-6" />
              <span>{data.likes.length}</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

};

export default LpDetail