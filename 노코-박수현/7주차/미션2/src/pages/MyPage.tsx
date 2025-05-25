import { useEffect, useRef, useState } from "react";
import usePatchUser from "../hooks/mutations/usePatchUser";
import useUploadImage from "../hooks/mutations/useUploadImage";

import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";

export default function MyPage() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { accessToken } = useAuth();
    const { data: me, isLoading } = useGetMyInfo(accessToken);
    const { mutate: patchUser } = usePatchUser({ onOptimisticUpdate: () => setEdit(false) });
    const { mutate: uploadImage } = useUploadImage();

    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // 정보 로드 후 상태 초기화
    useEffect(() => {
        if (me) {
            setName(me.data.name);
            setBio(me.data.bio ?? "");
            setImageUrl(me.data.avatar);
        }
    }, [me]);

    const handleEditToggle = () => {
        if (edit) {
            patchUser(
                {
                    name,
                    bio,
                    avatar: imageUrl || me?.data.avatar,
                },
                {
                    onError: (error) => {
                        console.error("사용자 정보 수정 실패:", error);
                        alert("수정 실패");
                        setEdit(true);
                    },
                }
            );
        } else {
            setEdit(true);
        }
    };

    const addImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            uploadImage(file, {
                onSuccess: (res) => {
                    setImageUrl(res.data.imageUrl);
                },
                onError: () => {
                    alert("이미지 업로드 실패");
                },
            });
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-4xl font-bold">마이페이지</h1>

            <img
                src={imageUrl}
                alt="avatar"
                className="w-40 h-40 rounded-full border-black object-cover cursor-pointer"
                onClick={edit ? handleImageClick : undefined}
            />
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={addImageFile}
                className="hidden"
            />

            <div className="flex flex-col gap-2 text-left">
                <h2 className="text-2xl">
                    이름:
                    {edit ? (
                        <input
                            className="ml-2 border rounded px-2"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    ) : (
                        <span className="ml-2">{me?.data.name}</span>
                    )}
                </h2>
                <h2 className="text-2xl">
                    소개:
                    {edit ? (
                        <input
                            className="ml-2 border rounded px-2"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    ) : (
                        <span className="ml-2">{me?.data?.bio}</span>
                    )}
                </h2>
                <h2 className="text-2xl">이메일: {me?.data?.email}</h2>
            </div>

            <button
                className="bg-gray-300 border border-gray-800 px-5 py-2 rounded font-bold cursor-pointer"
                onClick={handleEditToggle}
            >
                {edit ? "완료" : "수정"}
            </button>
        </div>
    );
}
