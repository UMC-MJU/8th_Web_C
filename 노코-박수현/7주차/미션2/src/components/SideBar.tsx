import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteUser from "../hooks/mutations/useDeleteUser";
import { getMyInfo } from "../apis/auth"; // 사용자 정보 API
import { ResponseMyInfoDto } from "../types/auth";

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);
    const { mutate: deleteUser } = useDeleteUser(); // userId 있으면 삭제

    // 사용자 정보 불러오기
    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.warn("AccessToken이 없어서 사용자 정보를 불러오지 않음");
                return;
            }

            try {
                const response: ResponseMyInfoDto = await getMyInfo();
                setUserId(response.data.id);
            } catch (error) {
                console.error("사용자 정보를 불러오지 못했습니다.");
            }
        };

        fetchUser();
    }, []);


    const handleGoPage = (page: string) => () => {
        navigate(page);
        onClose();
    };

    const handleDeleteAccount = () => {
        if (!userId) {
            alert("사용자 정보를 불러오지 못했습니다.");
            return;
        }

        deleteUser(undefined, {
            onSuccess: () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                alert("계정이 탈퇴되었습니다.");
                setModal(false);

                // 강제 새로고침으로 상태 초기화
                window.location.href = "/";
            },
            onError: () => {
                alert("탈퇴 실패");
            },
        });
    };

    const openModal = () => setModal(true);
    const closeModal = () => setModal(false);

    return (
        <>
            {modal && (
                <>
                    <div className="fixed h-full w-full bg-black/20 z-10" onClick={closeModal} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[360px] bg-white z-50 shadow-lg rounded-lg p-6 flex flex-col justify-between">
                        <h2 className="text-xl font-semibold text-center">정말 탈퇴하시겠습니까?</h2>
                        <div className="flex justify-end gap-4 mt-6">
                            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={closeModal}>취소</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={handleDeleteAccount}>확인</button>
                        </div>
                    </div>
                </>
            )}

            <aside
                className={`
                    md:static top-0 left-0 h-full w-60 bg-gray-100 shadow-md z-2
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div className="p-6">
                    <ul className="space-y-4 text-gray-800">
                        <li className="hover:text-pink-500 cursor-pointer" onClick={handleGoPage("/")}>홈</li>
                        <li className="hover:text-pink-500 cursor-pointer" onClick={handleGoPage("/my")}>마이페이지</li>
                        <li className="hover:text-pink-500 cursor-pointer" onClick={openModal}>탈퇴하기</li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
