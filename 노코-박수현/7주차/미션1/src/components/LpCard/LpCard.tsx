import { useEffect, useState } from "react";
import { LpData } from "../../types/lp";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import useDeleteLike from "../../hooks/mutations/useDeleteLike";
import usePostLike from "../../hooks/mutations/usePostLike";
import { ResponseMyInfoDto } from "../../types/auth";
import { getMyInfo } from "../../apis/auth";

interface LpListProps {
    lp: LpData;
}

export default function LpCard({ lp }: LpListProps) {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);
    const [isHover, setIsHover] = useState(false);
    const [likes, setLikes] = useState(lp.likes);

    const { mutate: postLikeMutate } = usePostLike(lp.id.toString());
    const { mutate: deleteLikeMutate } = useDeleteLike(lp.id.toString());

    const isLiked = likes.some((like) => like.userId === data?.data.id);

    const handleLike = () => {
        postLikeMutate(
            { lpId: lp.id.toString() },
            {
                onSuccess: () => {
                    if (data?.data?.id !== undefined) {
                        setLikes((prev) => [
                            ...prev,
                            {
                                id: Date.now(), // 임시 ID
                                lpId: lp.id,
                                userId: data.data.id,
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
                    setLikes((prev) => prev.filter((like) => like.userId !== data?.data.id));
                },
            }
        );
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMyInfo();
                setData(response);
            } catch (error) {
                console.warn("사용자 정보를 불러올 수 없습니다.");
            }
        };
        getData();
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
