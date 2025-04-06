import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

export default function MovieCredit(): JSX.Element {
  const { movieId } = useParams<{ movieId: string }>();
  const [credits, setCredits] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCredits = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setCredits(data);
      } catch (err) {
        console.error("Error fetching credits:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchCredits();
  }, [movieId]);

  if (loading) return <Loading />;
  if (error || !credits) return <p className="text-red-500 text-center">출연진 정보를 불러오지 못했습니다.</p>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">출연진</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {credits.cast.slice(0, 8).map((member: any) => (
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
    </div>
  );
}
