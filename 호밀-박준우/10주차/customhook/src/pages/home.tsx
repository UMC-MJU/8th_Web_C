import { useState, useEffect, useCallback, useMemo} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieSearchForm from '../components/MovieSearchForm';
import MovieCard from '../components/MovieCard';
import useCustomFetch from '../hooks/useCustomFetch';
import type { MovieResponse, MovieSearchParams, Movie } from '../types/movie';
import MovieModal from './movieModal';

export default function Home() {
  const [searchParams, setSearchParams] = useState<MovieSearchParams | null>(null);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);

  const location = useLocation();
  const navigate = useNavigate();


  const query = new URLSearchParams(location.search);
  const selectedMovieId = query.get('movie');

  const url = searchParams
    ? `https://api.themoviedb.org/3/search/movie?${new URLSearchParams({
        query: searchParams.query,
        include_adult: String(searchParams.include_adult),
        language: searchParams.language,
        page: String(page),
      }).toString()}`
    : '';

  const { data, isLoading, isError } = useCustomFetch<MovieResponse>(url);

 
  useEffect(() => {
    if (data?.results) {
      setMovies((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
    }
  }, [data]);

   const handleSearch = useCallback((params: MovieSearchParams) => {
    setSearchParams(params);
    setPage(1);
    setMovies([]);
  }, []);

  const handleCardClick = useCallback((id: number) => {
    navigate(`?movie=${id}`, { replace: false });
  }, [navigate]);

  const closeModal = useCallback(() => {
    navigate(location.pathname);
  }, [navigate, location.pathname]);

   const renderedMovieList = useMemo(
    () =>
      movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
      )),
    [movies, handleCardClick]
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">🎬 영화 검색</h1>
      <MovieSearchForm onSearch={handleSearch} />

      {isLoading && <p className="mt-4">로딩 중...</p>}
      {isError && <p className="mt-4 text-red-600">에러가 발생했습니다.</p>}
      {movies.length === 0 && !isLoading && <p className="mt-4">검색 결과가 없습니다.</p>}

       <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {renderedMovieList}
      </ul>

      {data && page < data.total_pages && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            다음 페이지 →
          </button>
        </div>
      )}

      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={closeModal} />
      )}
    </div>
  );
}
