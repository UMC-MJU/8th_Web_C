import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import MovieCredit from "./MovieCredit";
import useFetch from "../use/useFetch";


export default function MovieDetail(): JSX.Element {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<any>(null);
  console.log("movieId:", movieId);

  const {
    data,
    loading,
    error,
  } = useFetch<any>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    [movieId]
  );

  useEffect(() => {
    if (data) {
      setMovie(data);
    }
  }, [data]);
  

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
     {!loading && !error && movie && (
  <>
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
      ) : (
        <div className="w-full md:w-1/3 h-64 bg-gray-200 flex items-center justify-center rounded-lg">
          <p className="text-gray-500">포스터 이미지 없음</p>
        </div>
      )}
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
  </>
)}

    </div>
  );
  
}