import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [credits, setCredits] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsPending(true);
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const creditRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovie(movieRes.data);
        setCredits(creditRes.data);
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
      <p className="text-gray-700">{movie.overview}</p>

      {credits && (
        <div className="w-full mt-8">
          <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* 감독 */}
            {credits.crew
              .filter((member: any) => member.job === "Director")
              .map((director: any) => (
                <div key={director.id} className="text-center">
                  <img
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                    src={
                      director.profile_path
                        ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                        : "/default-profile.png"
                    }
                    alt={director.name}
                  />
                  <p className="font-semibold">{director.name}</p>
                  <p className="text-sm text-gray-500">{director.job}</p>
                </div>
              ))}

            {/* 배우 */}
            {credits.cast.slice(0, 8).map((actor: any) => (
              <div key={actor.cast_id} className="text-center">
                <img
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "/default-profile.png"
                  }
                  alt={actor.name}
                />
                <p className="font-semibold">{actor.name}</p>
                <p className="text-sm text-gray-500">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
