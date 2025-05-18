import { useState } from "react";
import { X } from 'lucide-react';
import LP from "../assets/icons/lp.png";
import { useMutation } from '@tanstack/react-query';
import { addLpAPI } from "../api/addLpAPI";
import { uploadFile } from "../api/addLpAPI";

interface AddLpProps {
  onClose: () => void;
}

export default function AddLp({ onClose }: AddLpProps): JSX.Element {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [animateIn, setAnimateIn] = useState(false);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selected = e.target.files?.[0];

  if (selected) {
    setFile(selected);
    setFileName(selected.name);
    setPreviewUrl(URL.createObjectURL(selected));

    // 애니메이션 트리거 초기화 후 재설정 (재선택 시에도 동작)
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), 10);
  }
};

const handleAddTag = () => {
  const trimmed = tagInput.trim();
  if (trimmed && !tags.includes(trimmed)) {
    setTags([...tags, trimmed]);
    setTagInput("");
  }
};

const handleRemoveTag = (tagToRemove: string) => {
  setTags(tags.filter((tag) => tag !== tagToRemove));
};

const mutation = useMutation({
  mutationFn: addLpAPI, 
  onSuccess: () => {
    alert('LP가 성공적으로 추가되었습니다!');
    onClose();
  },
  onError: (error: any) => {
    console.error(error);
    alert('추가 중 오류가 발생했습니다.');
  },
});


// 이미지 업로드 후 LP 생성
const handleSubmit = async () => {
  if (!file) {
    alert("이미지를 선택해주세요.");
    return;
  }

  try {
    const thumbnailUrl = await uploadFile(file);
    const data: AddLpPayload = {
      title,
      content,
      tags,
      thumbnail: thumbnailUrl, 
      published: true
    };

    mutation.mutate(data);
  } catch (error) {
    console.error('파일 업로드에 실패했습니다', error);
  }
};


  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="relative bg-[#2a2c30] w-[500px] p-9 rounded-lg shadow-lg">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-9 text-gray-400 hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="relative flex justify-center items-center mb-6 cursor-pointer">
          <label htmlFor="chooseFile" className="cursor-pointer">
            <img src={LP} width={200} height={200} alt="LP Icon" />
          </label>

          {/* 선택된 이미지 미리보기 */}
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className={`absolute left-[10px] top-0 w-[200px] h-[200px] object-cover rounded border
                          transition-all duration-500 ease-out
                          ${animateIn ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
            />
          )}
        </div>

        {/* 실제 파일 input */}
        <input
          type="file"
          id="chooseFile"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* LP Name */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-[#1d1f22] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F0648C]"
          placeholder="LP Name"
        />

        {/* LP Content */}
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-[#1d1f22] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F0648C]"
          placeholder="LP Content"
        />

        {/* Tag + Add 버튼 */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-grow px-3 py-2 rounded bg-[#1d1f22] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F0648C]"
            placeholder="LP Tag"
          />

          <button 
            onClick={handleAddTag}
            className="px-3 py-2 text-sm rounded bg-black text-white hover:bg-[#F0648C] hover:text-white">
            Add
          </button>
        </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center px-3 py-1 rounded-full bg-black text-white text-sm hover:bg-[#F0648C] hover:text-white"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-white hover:text-gray-200"
                  >
                    <X size={12}/>
                  </button>
                </div>
              ))}
            </div>
          )}

        <button 
          onClick={handleSubmit} disabled={mutation.isPending}
          className="w-full py-2 rounded bg-[#F0648C] text-white font-semibold hover:bg-[#e2557d]">
          Add LP
        </button>
      </div>
    </div>
  );
}
