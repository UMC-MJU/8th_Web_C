import { useEffect, useRef, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import usePatchUser from "../hooks/mutations/usePatchUser";
import useUploadImage from "../hooks/mutations/useUploadImage";

export default function MyPage() {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { mutate: patchUser } = usePatchUser(data?.data?.id ?? 0);
    const { mutate: uploadImage } = useUploadImage();

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            setData(response);
            setName(response.data.name);
            setBio(response.data.bio ?? "");
            setImageUrl(response.data.avatar);
        };
        getData();
    }, []);

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

    const handleEditToggle = () => {
        if (edit) {
            patchUser(
                {
                    name,
                    bio,
                    avatar: imageUrl || data?.data?.avatar,
                },
                {
                    onSuccess: () => {
                        setData((prev) =>
                            prev
                                ? {
                                    ...prev,
                                    data: {
                                        ...prev.data,
                                        name,
                                        bio,
                                        avatar: imageUrl,
                                    },
                                }
                                : null
                        );
                        setEdit(false);
                    },
                    onError: (error) => {
                        console.error("사용자 정보 수정 실패:", error);
                        alert("수정 실패");
                    },
                }
            );
        } else {
            setEdit(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-4xl font-bold">마이페이지</h1>

            {/* 이미지 클릭 시 업로드 */}
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
                        <span className="ml-2">{data?.data?.name}</span>
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
                        <span className="ml-2">{data?.data?.bio}</span>
                    )}
                </h2>
                <h2 className="text-2xl">이메일: {data?.data?.email}</h2>
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
