import { useEffect, useState } from "react"
import { getMyInfo } from "../apis/auth"
import { ResponseMyInfoDto } from "../types/auth";

export default function MyPage() {
    const [data, setData] = useState<ResponseMyInfoDto | null>(null);

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            setData(response);
        };

        getData();
    }, []);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-4xl font-bold">
                마이페이지
            </h1>
            <img
                src={data?.data?.avatar}
                alt="logo"
                className="w-50 h-50 rounded-full border-black" />
            <div className="flex flex-col">
                <h2 className="text-2xl">이름: {data?.data?.name}</h2>
                <h2 className="text-2xl">이메일: {data?.data?.email}</h2>
            </div>

        </div>
    )
}