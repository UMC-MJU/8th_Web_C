import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T>{
    data: T|null;
    isLoading: boolean;
    isError: boolean;
}

function useCustomFetch<T>(url:string) : ApiResponse<T>{
    const [data, setData] = useState<T|null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const token = import.meta.env.VITE_TMDB_API_TOKEN

    useEffect(()=> {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const {data} = await axios.get<T>(
                    url,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setData(data);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url])

    return{data, isLoading, isError}

}

export default useCustomFetch;
