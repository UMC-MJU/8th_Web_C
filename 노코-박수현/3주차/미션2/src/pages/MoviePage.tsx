import axios from "axios";
import { useEffect, useState } from "react"
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    // 1. 로딩상태
    const [isPending, setIsPending] = useState<boolean>(false);
    // 2. 에러상태
    const [isError, setIsError] = useState<boolean>(false);
    // 3. 페이지
    const [page, setPage] = useState<number>(1);

    const { category } = useParams<{
        category: string;
    }>();

    useEffect((): void => {
        const fetchMovies = async () => {
            setIsPending(true);

            try {
                const { data } = await axios.get<MovieResponse>(
                    `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                );
                // const response = await fetch(`https://api.themoviedb.org/3/movie/changes?page=1`);
                // const result = await response.json();

                setMovies(data.results)
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovies();
    }, [page, category])
    if (isError) {
        return <div className="text-center text-2xl text-red-500">에러가 발생했습니다.</div>;

    }
    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
                <button
                    disabled={page === 1}
                    onClick={(): void => setPage((prev) => prev - 1)}
                    className="bg-[#dda5e3] text-white px-6 py-3 cursor-pointer rounded-lg shadow-md hover:bg-[#d6a0e2] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:hover:text-white disabled:shadow-none disabled:transition-none"
                >
                    {`<`}
                </button>
                <span>{page} 페이지</span>
                <button
                    onClick={(): void => setPage((prev) => prev + 1)}
                    className="bg-[#dda5e3] text-white px-6 py-3 cursor-pointer rounded-lg shadow-md hover:bg-[#d6a0e2] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:hover:text-white disabled:shadow-none disabled:transition-none"
                >
                    {`>`}
                </button>
            </div>
            {isPending && (
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            )}
            {!isPending && (
                < div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {
                        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    }
                </div >
            )}

        </>
    )
}
