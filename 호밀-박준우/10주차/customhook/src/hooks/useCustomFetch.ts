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
    const token = import.meta.env.VITE_TMDB_KEY

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
            } catch(error) {
                console.log(token);
                setIsError(true);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url, token])

    return{data, isLoading, isError}

}

export default useCustomFetch;
