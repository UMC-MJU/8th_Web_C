import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import MovieCredit from "./MovieCredit";
// 수정할 부분 
// 1. 영화 상세 페이지에는 페이지네이션이 안 보이게 해야한다. -> O

export default function MovieDetail(): JSX.Element {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(false);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]);

  if (loading) return <Loading />;
  if (error || !movie) return <p className="text-red-500 text-center">영화 정보를 불러오지 못했습니다.</p>;

  return (
      <div className="max-w-4xl mx-auto p-6 space-y-10">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 rounded-lg shadow-md"
          />
          <div className="flex-1 space-y-6 text-left">
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <p className="text-gray-600">개봉일: {movie.release_date}</p>
            <div>
              <h2 className="font-semibold mb-1">줄거리</h2>
              {movie.overview ? (
                <p>{movie.overview}</p>
              ) : (
                <p className="text-gray-400">TMDB에서 제공하는 줄거리 정보가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
        <MovieCredit />
      </div>
    );
  
}
