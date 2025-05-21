import { useOutletContext } from "react-router-dom";
import LpList from "../components/LpCard/LpCard";
import { PAGENATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { postImage, postLp } from "../apis/lp";
import LPTag from "../components/LPTag";
export default function HomePage() {
  const { search, isSidebarOpen, setIsSidebarOpen } = useOutletContext<{
    search: string;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
  }>();
  
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");
  const [lpName, setLpName] = useState("");
  const [lpContent, setLpContent] = useState("");

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    isError,
    fetchNextPage,
  } = useGetInfiniteLpList(20, search, order);

  const { ref, inView } = useInView({ threshold: 0 });

  const addImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    if (!image) return;

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const res = await postImage(formData);
        setImageUrl(res?.data?.imageUrl); // adjust if shape differs
      } catch (err) {
        console.error("이미지 업로드 실패", err);
      }
    };

    uploadImage();
  }, [image]);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
    }
    setTagInput("");
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const closeModal = () => {
    setModal(false);
    setImageUrl("");
    setImage(null);
    setTags([]);
    setTagInput("");
  };

  const handleSubmitLp = async () => {
    if (!lpName || !lpContent || tags.length === 0 || !imageUrl) {
      alert("모든 값을 입력해주세요.");
      return;
    }
  
    try {
      const response = await postLp({
        title: lpName,
        content: lpContent,
        tags: tags,
        thumbnail: imageUrl,
        published: true,
      });
      console.log("LP 생성 성공", response);
      alert("lp 생성 성공")
      closeModal(); // 모달 닫기
    } catch (err) {
      console.error("LP 생성 실패", err);
      alert("LP 생성에 실패했습니다.");
    }
  };

  if (isError) return <div>Error...</div>;

  return (
    <>
      {search && isPending && <div>Loading...</div>}

      {/* 플로팅 버튼 */}
      <button
        className="fixed bottom-4 right-4 h-20 w-20 rounded-full bg-[#F61C96] z-10 cursor-pointer border border-white"
        onClick={() => setModal(true)}
      />

      {/* 모달 */}
      {modal && (
        <>
          <div
            className="fixed h-full w-full bg-black/20 z-10"
            onClick={closeModal}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[420px] bg-gray-200 z-50 shadow-lg rounded-lg">
            <button
              className="absolute top-4 right-4 text-gray-600 text-xl font-bold hover:text-black cursor-pointer"
              onClick={closeModal}
            >
              ×
            </button>
            <div className="flex flex-col justify-center items-center my-10 w-full px-6">
              <label className="cursor-pointer">
                <img
                  src={
                    imageUrl ||
                    "https://blog.kakaocdn.net/dn/CRdB6/btqEOaqXNVs/K1gio0IwR8gVCHcttHFOW0/img.png"
                  }
                  alt="Image"
                  className="w-40 h-40 object-cover rounded"
                />
                <input
                  type="file"
                  onChange={addImageFile}
                  className="hidden"
                />
              </label>

              {/* 입력 폼 */}
              <div className="grid grid-rows-3 gap-4 py-10 w-full">
              <input
                  className="border border-gray-300 rounded px-2 py-1"
                  placeholder="LP Name"
                  type="text"
                  value={lpName}
                  onChange={(e) => setLpName(e.target.value)}
              />
                <input
                  className="border border-gray-300 rounded px-2 py-1"
                  placeholder="LP Content"
                  type="text"
                  value={lpContent}
                  onChange={(e) => setLpContent(e.target.value)}
                />

                <div className="flex gap-2">
                  <input
                    className="border border-gray-300 rounded px-2 py-1 flex-grow"
                    placeholder="LP Tag"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <button
                    className="bg-gray-300 w-20 h-full rounded cursor-pointer"
                    onClick={handleAddTag}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* 태그 리스트 */}
              <div className="flex flex-wrap gap-2">
                <LPTag contents={tags} onDelete={handleDeleteTag} />
              </div>

              <button className="mt-6 bg-[#FF1E9C] text-white px-6 py-2 rounded-lg shadow-lg" onClick={handleSubmitLp}>
                Add LP
              </button>
            </div>
          </div>
        </>
      )}

      {/* 본문 */}
      <div className="flex h-full">
        <SideBar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="w-full p-10">
          {/* 정렬 셀렉트 */}
          <div className="flex justify-end mb-4">
            <div className="text-sm">
              <label className="text-gray-600 mr-2">정렬:</label>
              <select
                value={order}
                onChange={(e) =>
                  setOrder(e.target.value as PAGENATION_ORDER)
                }
                className="px-2 py-1 border rounded"
              >
                <option value={PAGENATION_ORDER.desc}>최신순</option>
                <option value={PAGENATION_ORDER.asc}>오래된순</option>
              </select>
            </div>
          </div>

          {/* LP 카드 리스트 */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {lps?.pages
              ?.flatMap((page) =>
                page.data.data.map((lp) => <LpList key={lp.id} lp={lp} />)
              )}
            {isFetching && <LpCardSkeletonList count={20} />}
          </div>

          <div ref={ref} />
        </div>
      </div>
    </>
  );
}
