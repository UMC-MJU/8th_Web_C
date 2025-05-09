import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/axios";
import { useEffect, useState } from "react";
import { LpData } from "../types/lp";

const LpDetailPage = () => {
    const { lpid } = useParams();
    const [data, setData] = useState<LpData>();
    const [loading, setLoading] = useState(true);
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
            <div className="flex flex-col items-center justify-center w-100 border p-5 bg-gray-200">
                <div className="relative w-64 h-64">
                    <img
                        src={data?.thumbnail}
                        alt={data.title}
                        className="w-full h-full object-cover rounded-full shadow-lg animate-spin"
                    />
                    <div className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 shadow-inner" />
                </div>
                <h1 className="font-bold mt-6">{data.content}</h1>
            </div>
        </div>
    );

};

export default LpDetailPage
