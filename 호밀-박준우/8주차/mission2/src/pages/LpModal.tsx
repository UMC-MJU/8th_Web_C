import { useState, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useCreateLp from "../hooks/mutations/useCreateLp";
import { axiosInstance } from "../apis/axios";

const AddLpModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createLp } = useCreateLp();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async () => {
    if (!title || !content || !fileInputRef.current?.files?.[0]) {
      alert("모든 값을 입력해주세요");
      return;
    }

    try {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await axiosInstance.post("/v1/uploads/public", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = uploadRes.data.data.imageUrl;

      createLp({
        title,
        content,
        thumbnail: imageUrl,
        tags,
        published: true,
      });

      closeModal();
    } catch (error) {
      console.error("LP 생성 실패:", error);
      alert("LP 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 z-50"
      >
        <AiOutlinePlus size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-60">
          <div className="relative bg-gray-900 p-8 rounded-xl w-[90%] max-w-md text-white">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              &times;
            </button>

            <div className="flex justify-center mb-4 cursor-pointer" onClick={handleImageClick}>
              <img
                src={thumbnail || "/lp-placeholder.png"}
                alt="LP"
                className="w-40 h-40 object-cover rounded-full border border-gray-600"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="LP Name"
              className="w-full mb-2 p-2 bg-gray-800 rounded text-white"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="LP Content"
              className="w-full mb-2 p-2 bg-gray-800 rounded text-white resize-none"
            />
            <div className="flex mb-2">
              <input
                placeholder="LP Tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 p-2 bg-gray-800 rounded-l text-white"
              />
              <button onClick={handleAddTag} className="bg-pink-600 px-4 rounded-r">Add</button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-white"
                >
                  <span className="mr-1">{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-sm ml-1 hover:text-red-400"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gray-700 py-2 rounded mt-2 hover:bg-gray-600"
            >
              Add LP
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLpModal;
