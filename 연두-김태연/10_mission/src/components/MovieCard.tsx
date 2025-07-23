import type { Movie } from "../types/movie";
import { memo } from "react";

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number) => void; 
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  console.log("렌더링 중:", movie.title);
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="cursor-pointer rounded overflow-hidden shadow-lg hover:shadow-xl transition"
    >
      <div className="relative shadow-md rounded-lg overflow-hidden transition-transform transform group cursor-pointer">
        <img
          className="w-full h-64 object-cover transition-all duration-500 group-hover:blur-sm"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-opacity-70 text-white hidden group-hover:flex flex-col justify-center items-center transition-opacity duration-500 ease-in-out p-5 text-center">
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(MovieCard);
