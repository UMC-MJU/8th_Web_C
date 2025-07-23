// src/components/MovieCard.tsx
import { memo } from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (id: number) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  return (
    <li
      onClick={() => onClick(movie.id)}
      className="cursor-pointer relative group rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
    >
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        className="rounded-xl w-full object-cover"
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-sm rounded-md p-2 w-60 opacity-0 group-hover:opacity-100 transition duration-300 z-10 shadow-lg pointer-events-none">
        <h3 className="font-bold mb-1">{movie.title}</h3>
        <p className="line-clamp-3">{movie.overview}</p>
      </div>
    </li>
  );
};

export default memo(MovieCard); // ✅ prop이 바뀌지 않으면 리렌더링 X
