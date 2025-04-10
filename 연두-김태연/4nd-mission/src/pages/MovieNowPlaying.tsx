import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Movie from "../types/movie";
import Loading from "../components/Loading";
import { useSearchParams } from "react-router-dom";
import useFetch from "../use/useFetch";

export default function MovieNowPlaying(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1; 

    const {
        data,
        loading,
        error,
    } = useFetch<{ results: Movie[] }>(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        [page]
    );

    useEffect(() => {
        if (data && data.results) {
            setMovies(data.results);
        }
    }, [data]);
    

    return (
        <div className="max-w-6xl mx-auto p-5">
        {loading && <Loading />}
        {error && <p className="text-red-500 text-center">에러가 발생했습니다.</p>}

        {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        )}
        </div>
    );
}
