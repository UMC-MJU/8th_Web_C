import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isError) {
    return (
      <div className="p-10 text-center">
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (isPending || !movie) {
    return (
      <div className="p-10 text-center">
        <span className="text-gray-600 text-xl">로딩 중...</span>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      <img
        className="w-60 rounded-xl shadow-md"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="max-w-2xl text-center text-lg text-gray-700 leading-relaxed">
        {movie.overview}
      </div>
    </div>
  );
}
