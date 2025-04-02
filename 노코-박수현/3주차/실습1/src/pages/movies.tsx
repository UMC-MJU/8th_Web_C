import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';

import axios from 'axios';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2FkOTZmNzQ5NWRmNTI5MmY1YzBkNjI0M2E2NTM2ZCIsIm5iZiI6MTc0MzU2MzAyOC42NTY5OTk4LCJzdWIiOiI2N2VjYTkxNDhmZWQzZjAyMzZhYWRlOGIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Da2EKAMm53rElHbl66pHQtmxo69pWtMpQ_BwgREAxyg`,
          },
        }
      );

        setMovies(data.results); // 영화 데이터
    };

    fetchMovies();
  }, []);

  return (
    <ul>
      {/* 옵셔널 체인 활용 */}
      {movies?.map((movie) => (
        <li key={movie.id}>
          <h1>{movie.title}</h1>
        </li>
      ))}
    </ul>
  );
};

export default MoviesPage;