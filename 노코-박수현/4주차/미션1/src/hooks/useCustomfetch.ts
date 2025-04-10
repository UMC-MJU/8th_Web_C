import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
    data: T | null;
    isPending: boolean;
    isError: boolean;
}
type Language = "ko-KR" | "en-US" | "ja-JP" | "zh-CN" | "fr-FR" | "es-ES" | "de-DE" | "it-IT" | "pt-BR" | "ru-RU";
function useCustomFetch<T>(url:string, language : Language = "en-US"): ApiResponse<T> {
    const [data, setDatas] = useState<T | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const { data } = await axios.get<T>(url,{
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                    },
                    params: {
                        language
                    }
                });
                setDatas(data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };
        fetchData();
    }, [url, language]);
    return { data, isPending, isError };
}

export default useCustomFetch;