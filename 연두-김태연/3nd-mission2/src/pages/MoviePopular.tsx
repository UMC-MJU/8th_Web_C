import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Movie from "../types/movie";
import Loading from "../components/Loading";
import { useSearchParams } from "react-router-dom";

export default function MovieUpComig(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1; // 페이지 전환

    useEffect(() => {
        const fetchMovies = async (): Promise<void> => {
            setLoading(true);
            setError(false);

            await new Promise(resolve => setTimeout(resolve, 100)); 
            try {
                const { data } = await axios.get(
                    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                if (data && data.results) {
                    setMovies(data.results);
                    setLoading(false);

                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setError(true);
                setLoading(false);
            }
        };
        fetchMovies();
    }, [page]);

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
