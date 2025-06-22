import { useEffect, useState, memo } from "react";
import axios from "axios";

interface Props {
  movieId: number;
  onClose: () => void;
}

export default memo(function MovieDetail({ movieId, onClose }: Props): JSX.Element {
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState(false);
  
  console.log("불러올 movieId:", movieId);

  useEffect(() => {
    const fetchMovie = async () => {
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
      }
    };

    if (movieId) fetchMovie();
  }, [movieId]); // movieId가 변경될 때만 다시 실행함

  if (error || !movie) return <p className="text-red-500 text-center">영화 정보를 불러오지 못했습니다.</p>;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-4xl">
      <div
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}
      >
        <div className="absolute bottom-0 bg-gradient-to-t from-black/80 to-transparent w-full p-4">
          <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
          <p className="text-white text-sm">{movie.original_title}</p>
        </div>
      </div>

      <div className="p-6 flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow"
        />

        <div className="flex-1 space-y-4">
          <div className="text-blue-600 text-xl font-semibold">
            {movie.vote_average.toFixed(1)} <span className="text-gray-500 text-sm">({movie.vote_count} 평가)</span>
          </div>

          <div className="text-sm">
            <p><span className="font-semibold">개봉일</span><br />{movie.release_date}</p>
          </div>

          <div className="text-sm">
            <p><span className="font-semibold">인기도</span></p>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.min(movie.popularity, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1">줄거리</p>
            <p className="text-sm text-gray-700">{movie.overview || "TMDB에서 줄거리 정보를 제공하지 않습니다."}</p>
          </div>

          <div className="flex gap-3 mt-4">
            <a
              href={`https://www.imdb.com/title/${movie.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              IMDb에서 검색
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
