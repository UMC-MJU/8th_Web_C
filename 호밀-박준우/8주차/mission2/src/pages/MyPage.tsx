import { useEffect, useRef, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axios";
import { useUpdateNickname } from "../components/UpdateNicknameDto";

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateNickname } = useUpdateNickname();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      setData(response);
      setName(response.data.name);
      setBio(response.data.bio || "");
      setAvatarUrl(response.data.avatar || "");
    };
    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post("/v1/uploads/public", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = res.data.data.imageUrl;
      setAvatarUrl(imageUrl);
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      alert("이미지를 업로드하지 못했습니다.");
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("이름은 빈칸일 수 없습니다.");
      return;
    }

    updateNickname({ name });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center space-y-4 w-full max-w-sm">
        <button
          className="text-sm text-blue-600 underline hover:text-blue-800"
          onClick={() => setIsEditing(true)}
        >
          설정
        </button>
        <div className="flex justify-center">
          <img
            src={avatarUrl || "/placeholder.png"}
            alt="프로필 사진"
            className="w-24 h-24 rounded-full object-cover border"
            onClick={() => isEditing && fileInputRef.current?.click()}
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
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
          disabled={!isEditing}
        />
        <input
          className="w-full p-2 border rounded"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="자기소개 "
          disabled={!isEditing}
        />
        <h1 className="text-gray-600">{data?.data.email}</h1>

        {isEditing && (
          <button
            className="w-full bg-blue-500 text-white rounded-md px-6 py-3 hover:bg-blue-600"
            onClick={() => {
              handleSubmit();
              setIsEditing(false);
            }}
          >
            프로필 저장
          </button>
        )}

        <button
          className="w-full bg-gray-300 text-gray-700 rounded-md px-6 py-3 hover:bg-gray-400"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MyPage;
