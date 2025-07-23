import React, { useCallback, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import type { MovieFilters, MovieResponse } from '../types/movie';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';

const HomePage = (): React.ReactElement => {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스",
        include_adult: false,
        language: "ko-KR"
    })

    const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);
    const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie",
        axiosRequestConfig
    );

    const handleChangeFilters = useCallback((filters: MovieFilters) => {
        setFilters(filters);
    }, [setFilters]);

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className='flex flex-col items-center'>
            <MovieFilter onChange={handleChangeFilters} />
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