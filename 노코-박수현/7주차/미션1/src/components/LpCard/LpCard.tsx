import { useEffect, useState } from "react";
import { LpData } from "../../types/lp";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useDeleteLike from "../../hooks/mutations/useDeleteLike";
import usePostLike from "../../hooks/mutations/usePostLike";
import { getMyInfo } from "../../apis/auth";
import { ResponseMyInfoDto } from "../../types/auth";

interface LpListProps {
    lp: LpData;
}

export default function LpCard({ lp }: LpListProps) {
    const [userId, setUserId] = useState<number | null>(null);
    const [likes, setLikes] = useState(lp.likes);
    const [isHover, setIsHover] = useState(false);

    const { mutate: postLikeMutate } = usePostLike(lp.id.toString());
    const { mutate: deleteLikeMutate } = useDeleteLike(lp.id.toString());

    const isLiked = likes.some((like) => like.userId === userId);

    const handleLike = () => {
        postLikeMutate(
            { lpId: lp.id.toString() },
            {
                onSuccess: () => {
                    if (userId !== null) {
                        setLikes((prev) => [
                            ...prev,
                            {
                                id: Date.now(), // 임시 ID
                                lpId: lp.id,
                                userId,
                            },
                        ]);
                    }
                },
            }
        );
    };

    const handleDislike = () => {
        deleteLikeMutate(
            { lpId: lp.id.toString() },
            {
                onSuccess: () => {
                    setLikes((prev) => prev.filter((like) => like.userId !== userId));
                },
            }
        );
    };

    useEffect(() => {
        const fetchUser = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) return;

            try {
                const response: ResponseMyInfoDto = await getMyInfo();
                setUserId(response.data.id);
            } catch (error) {
                console.error("사용자 정보를 불러오지 못했습니다.");
            }
        };

        fetchUser();
    }, []);

    return (
        <div
            className="group relative overflow-hidden w-100 h-100 shadow-lg transition-transform duration-500 hover:scale-115 hover:z-1"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <img
                src={lp?.thumbnail}
                alt={`${lp.title}의 이미지`}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {isHover && (
                <div className="absolute inset-0 pointer-events-none">
                    <Link
                        to={`/lp/${lp.id}`}
                        className="absolute bottom-10 left-4 text-white text-lg font-bold drop-shadow-lg hover:text-blue-400 cursor-pointer pointer-events-auto"
                    >
                        {lp.title}
                    </Link>
                    <p className="absolute bottom-4 left-4 text-white text-lg drop-shadow-lg">
                        {new Date(lp.createdAt).toLocaleDateString("ko-KR").replace(/\s/g, "")}
                    </p>
                    <p
                        className="absolute bottom-4 right-8 text-lg drop-shadow-lg cursor-pointer pointer-events-auto"
                        onClick={isLiked ? handleDislike : handleLike}
                    >
                        <Heart
                            color={isLiked ? "red" : "white"}
                            fill={isLiked ? "red" : "transparent"}
                        />
                    </p>
                    <p className="absolute bottom-4 right-4 text-white text-lg drop-shadow-lg">
                        {likes.length}
                    </p>
                </div>
            )}
        </div>
    );
}
