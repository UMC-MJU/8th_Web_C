//LP 리스트 불러오기
import { useEffect, useState } from 'react';

const useFetchLpList = () => {
  const [lpList, setLpList] = useState([]);

  useEffect(() => {
    const fetchAllLps = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/v1/lps?page=1&limit=1000`);
        const json = await response.json();
        setLpList(json.data?.data || []);
      } catch (error) {
        console.error('LP 불러오기 실패:', error);
      }
    };
    fetchAllLps();
  }, []);

  return lpList;
};

export default useFetchLpList;
