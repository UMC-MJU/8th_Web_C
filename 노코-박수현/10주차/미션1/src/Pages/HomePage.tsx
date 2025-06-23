import React from 'react';
import useFetch from '../hooks/useFetch';
import type { MovieResponse } from '../types/movie';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';

const HomePage = (): React.ReactElement => {
    const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie",
        {
            params: {
                query: "어벤져스",
                include_adult: false,
                language: "ko-KR",
            },
        }
    );

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='flex flex-col items-center'>
            <MovieFilter />
            {isLoading ? (
                <div>
                    로딩 중 입니다...
                </div>
            ) :
                <MovieList movies={data?.results || []} />
            }
        </div>
    )
}

export default HomePage;