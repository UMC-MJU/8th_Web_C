import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import useFetch from "../use/useFetch";

export default function MovieCredit(): JSX.Element {
  const { movieId } = useParams<{ movieId: string }>();
  const [credits, setCredits] = useState<any>(null);
  
  const {
    data,
    loading,
    error,
  } = useFetch<any>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
    [movieId]
  );
  
  useEffect(() => {
    if (data) {
      setCredits(data);  
    }
  }, [data]);
  


  return (
    <div className="mt-10">
    {!loading && !error && data && data.cast && (
    <>
      <h2 className="text-xl font-bold mb-4">출연진</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.cast.slice(0, 8).map((member: any) => (
          <div key={member.cast_id} className="text-center">
            <img
              src={
                member.profile_path
                  ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                  : "https://via.placeholder.com/185x278?text=No+Image"
              }
              alt={member.name}
              className="w-24 h-24 object-cover rounded-xl mx-auto shadow-md"
            />
            <p className="mt-2 font-medium">{member.name}</p>
            <p className="text-sm text-gray-500">({member.character})</p>
          </div>
        ))}
      </div>
    </>
    )}

    </div>
  );
}
