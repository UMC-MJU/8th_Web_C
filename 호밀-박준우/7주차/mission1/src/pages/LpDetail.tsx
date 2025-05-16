import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { axiosInstance } from "../apis/axios";
import { useEffect, useState } from "react";
import { Lp } from "../types/lp";
import { formatDistanceToNow } from "date-fns";
import { AiFillHeart, AiOutlineEdit, AiOutlineDelete, AiOutlineHeart } from "react-icons/ai";
import Comments from "../components/Comment/Comment";
import { PAGINATION_ORDER } from "../types/common";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import { useDeleteLp } from "../hooks/mutations/useDeleteLp";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

const LpDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const { id } = useParams();
  const [data1, setData1] = useState<Lp>();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { accessToken } = useAuth();

  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();
  const { mutate: deleteMutate } = useDeleteLp();
 
  //수정 로직
  const { mutate: updateLpMutate } = useMutation({
    mutationFn: async (payload: Partial<Lp>) => {
      const res = await axiosInstance.patch(`/v1/lps/${id}`, payload);
      return res.data;
    },
    onSuccess: (res) => {
      setData1(res.data);
      setIsEditing(false);
      alert("LP 정보가 성공적으로 수정되었습니다.");
    },
  });

  const isLiked = data1?.likes
    .map((like) => like.userId)
    .includes(me?.data.id as number);

  useEffect(() => {
    fetchLp();
  }, []);

  const fetchLp = async () => {
    try {
      const res = await axiosInstance.get(`/v1/lps/${id}`);
      setData1(res.data.data);
    } catch (error) {
      console.error("LP 디테일 요청 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 좋아요 버튼 
  const handleToggleLike = () => {
    if (isLiked) {
      disLikeMutate({ lpId: Number(id) });
    } else {
      likeMutate({ lpId: Number(id) });
    }
    if (loading) return <div>Loading...</div>;
  };

  // 삭제 버튼
  const handleDelete = () => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteMutate({ lpId: Number(id) });
    }
  };

  // 수정 버튼
  const handleEdit = () => {
    if (!data1) return;
    setIsEditing(true);
    setEditTitle(data1.title);
    setEditContent(data1.content);
  };

  return (
    <div className="flex h-dvh">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 mt-20 bg-black min-h-screen px-4 py-10">
          <div className="max-w-3xl mx-auto bg-gray-800 text-white rounded-xl shadow-lg p-8 space-y-6">
            {/* 상단 - 작성자 + 시간 + 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src={data1?.thumbnail}
                  alt="user"
                  className="w-10 h-10 rounded-full bg-gray-700"
                />
                <span className="font-semibold">{data1?.authorId}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                {isEditing && (
                  <button
                    className="px-3 py-1 bg-pink-500 text-white rounded"
                    onClick={() => updateLpMutate({ title: editTitle, content: editContent })}
                  >
                    저장
                  </button>
                )}
                <span className="text-sm">
                  {data1?.createdAt
                    ? formatDistanceToNow(new Date(data1.createdAt), { addSuffix: true })
                    : ""}
                </span>
                <AiOutlineEdit
                  onClick={handleEdit}
                  className="w-5 h-5 hover:text-white cursor-pointer"
                />
                <AiOutlineDelete
                  onClick={handleDelete}
                  className="w-5 h-5 hover:text-white cursor-pointer"
                />
              </div>
            </div>

            {/* 제목 */}
            {isEditing ? (
              <input
                type="text"
                className="text-3xl font-bold w-full p-2 text-black"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <h1 className="text-3xl font-bold">{data1?.title}</h1>
            )}

            {/* 썸네일 */}
            <div className="flex justify-center">
              <div className="relative w-72 h-72 bg-gray-700 rounded-full shadow-2xl overflow-hidden">
                <img
                  src={data1?.thumbnail}
                  alt={data1?.title}
                  className="absolute inset-0 w-full h-full object-cover animate-spin"
                  style={{ animationDuration: "8s" }}
                />
              </div>
            </div>

            {/* 본문 */}
            {isEditing ? (
              <textarea
                className="w-full p-2 text-black"
                rows={5}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            ) : (
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {data1?.content}
              </p>
            )}

            {/* 태그 */}
            <div className="flex flex-wrap gap-2">
              {data1?.tags.map((tag) => (
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
              <button className="cursor-pointer" onClick={handleToggleLike}>
                {isLiked ? (
                  <AiFillHeart className="text-pink-500 w-6 h-6" />
                ) : (
                  <AiOutlineHeart className="text-pink-500 w-6 h-6" />
                )}
              </button>
              <span>{data1?.likes.length}</span>
            </div>

            {/* 댓글 영역 */}
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">댓글</h2>
              {/* 정렬 버튼 */}
              <div className="flex justify-end mb-2 space-x-2">
                <button
                  className={`px-3 py-1 rounded border text-sm ${order === PAGINATION_ORDER.asc ? "bg-pink-500 text-white" : "bg-gray-800 text-white"}`}
                  onClick={() => setOrder(PAGINATION_ORDER.asc)}
                >
                  오래된순
                </button>
                <button
                  className={`px-3 py-1 rounded border text-sm ${order === PAGINATION_ORDER.desc ? "bg-pink-500 text-white" : "bg-gray-800 text-white"}`}
                  onClick={() => setOrder(PAGINATION_ORDER.desc)}
                >
                  최신순
                </button>
              </div>
              <Comments lpId={Number(id)} order={order} />
              <CommentSkeletonList count={3} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LpDetail;
