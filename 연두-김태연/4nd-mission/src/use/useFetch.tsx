import { useEffect, useState } from "react";
import axios from "axios";

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

export default function useFetch<T>(url: string, deps: any[] = []): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setLoading(true);
      setError(false);

      await new Promise((resolve) => setTimeout(resolve, 100));

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        setData(response.data);
      } catch (e) {
        console.error("Error fetching data:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, deps); 

  return { data, loading, error };
}
