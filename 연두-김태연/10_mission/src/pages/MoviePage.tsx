import { useEffect, useState, useRef, useCallback } from "react"; 
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import MovieDetail from "./MovieDetail.tsx";
import type { Movie } from '../types/movie.ts';

export default function MoviePage(): JSX.Element {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  console.log("현재 selectedMovieId 상태:", selectedMovieId);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const includeAdult = searchParams.get("include_adult") === "true";
  const language = searchParams.get("language") || "ko";
  const page = Number(searchParams.get("page")) || 1;

  const movieCache = useRef<Map<string, Movie[]>>(new Map());

  useEffect(() => {
    const cacheKey = `${query}-${includeAdult}-${language}-${page}`;
    if (movieCache.current.has(cacheKey)) {
      setMovies(movieCache.current.get(cacheKey)!);
      return;
    }

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("https://api.themoviedb.org/3/search/movie", {
          params: { query, include_adult: includeAdult, language, page },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });
        movieCache.current.set(cacheKey, data.results);
        setMovies(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    if (query.trim()) {
      fetchMovies();
    }
  }, [query, includeAdult, language, page]);

  const handleCardClick = useCallback((id: number) => {
    setSelectedMovieId(id);
  }, []); 

  const handleCloseDetail = useCallback(() => {
    setSelectedMovieId(null);
  }, []); 

  return (
    <div className="max-w-6xl mx-auto p-5 relative">
      {error && <p className="text-red-500 text-center">에러가 발생했습니다.</p>}
      { !error && movies.length === 0 && (
        <p className="text-center text-gray-400">검색 결과가 없습니다.</p>
      )}
      {!error && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}

     {selectedMovieId !== null && (
      <>
        {console.log("모달에 전달되는 movieId:", selectedMovieId)}
        <div className="fixed inset-0  z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative scrollbar-none">
            <MovieDetail
              movieId={selectedMovieId}
              onClose={handleCloseDetail}
            />
          </div>
        </div>
      </>
    )}
    </div>
  );
}
