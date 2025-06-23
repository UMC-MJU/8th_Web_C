import React from 'react'
import type { Movie } from '../types/movie'
import MovieCard from './MovieCard';

interface MovieListProps {
    movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps): React.ReactElement => {
    if (movies.length === 0) {
        return (
            <div className='flex h-60 items-center justify-center'>
                <p className='font-bold text-gray-500'>검색 결과가 없습니다.</p>
            </div>
        )
    }
    return (
        <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
            {movies.map((movie): React.ReactElement => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    )
}

export default MovieList
