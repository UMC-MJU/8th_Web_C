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
    }, [data]);
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <h1 className="text-4xl font-bold">
                마이페이지
            </h1>
            <img
                src="https://i.namu.wiki/i/Rp_83lMxjLl5A8e3-lLKTzDHoxNYY3JHEmyMd2eJEaGjVKOMkPVvJ4sAIZrVoZhN1GQLIeBBgVtKJtrW-U0tCeSRgXE-McBWIS46lz1y8hSCFj-lpaCK-jP4xejVcOQAbSYLTs5YovMX6weJncgoLg.webp"
                alt="logo"
                className="w-50 h-50 rounded-full border-black" />
            <div className="flex flex-col">
                <h2 className="text-2xl">이름: {data?.data?.name}</h2>
                <h2 className="text-2xl">이메일: {data?.data?.email}</h2>
            </div>

        </div>
    )
}