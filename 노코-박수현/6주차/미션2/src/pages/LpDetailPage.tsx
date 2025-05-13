import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/axios";
import { useEffect, useState } from "react";
import { LpData } from "../types/lp";
import { LpComment } from "../components/LpComment/LpComment";
import { PAGENATION_ORDER } from "../enums/common";
import useGetInfiniteCommentList from "../hooks/queries/useGetInfiniteLpCommentList";
import { useInView } from "react-intersection-observer";
import LpCommentSkeletonList from "../components/LpComment/LpCommentSkeletonList";

const LpDetailPage = () => {
    const { lpid } = useParams();
    const [data, setData] = useState<LpData>();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);
    const { data: comments, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetInfiniteCommentList(lpid || "", 10, order);
    const { ref, inView } = useInView({
        threshold: 0,
    });
    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);
    useEffect(() => {
        const fetchLp = async () => {
            try {
                const res = await axiosInstance.get(`/v1/lps/${lpid}`);
                setData(res.data.data);
            } catch (error) {
                console.error("LP 디테일 요청 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLp();
    }, [lpid]);
    console.log(data);
    if (loading) return <div>Loading...</div>;
    if (!data) return <div>LP 정보를 불러올 수 없습니다.</div>;
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center w-200 border p-5 bg-gray-200 rounded">
                <div className="flex flex-col items-center justify-center w-150 h-80 shadow-inner">
                    <div className="relative">
                        <img
                            src={data?.thumbnail}
                            alt={data.title}
                            className="w-64 h-64 object-cover rounded-full shadow-lg animate-spin"
                        />
                        <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-inner" />
                    </div>
                </div>
                <h1 className="font-bold mt-6">{data.content}</h1>
                {/* 태그 */}
                {/* 좋아요 */}
            </div>
            <div className="flex m-1 w-200 border rounded bg-gray-200 flex-col">
                <div className="flex justify-between items-center px-4 py-2">
                    <h2 className="font-bold">댓글</h2>
                    <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value as PAGENATION_ORDER)}
                        className="px-2 py-1 border rounded text-sm inline-block"
                    >
                        <option value={PAGENATION_ORDER.desc}>최신순</option>
                        <option value={PAGENATION_ORDER.asc}>오래된순</option>
                    </select>
                </div>
                <div className="w-full p-1">
                    {comments?.pages?.map((page) => page.data.data)
                        ?.flat()
                        ?.map((comment) => <LpComment key={comment.id} comment={comment} />)}
                    {isFetching && <LpCommentSkeletonList count={10} />}
                </div>
                <div ref={ref} />
            </div>

        </div>
    );

};

export default LpDetailPage
