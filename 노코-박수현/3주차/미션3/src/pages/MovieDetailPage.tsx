import { useParams } from "react-router-dom";
import { MovieCast, movieCreditResponse } from "../types/movieCredits";
import axios from "axios";
//import { MovieDetailsResponse } from "../types/movieDetails";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCastCard from "../components/MovieCastCard";
import { MovieDetailsResponse } from "../types/movieDetails";
import MovieDetailCard from "../components/MovieDetailsCard";

export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>();
    const [casts, setCasts] = useState<MovieCast[]>([]);
    const [detail, setDetail] = useState<MovieDetailsResponse>();
    // 1. 로딩상태
    const [isPending, setIsPending] = useState<boolean>(false);
    // 2. 에러상태
    const [isError, setIsError] = useState<boolean>(false);
    useEffect((): void => {
        const fetchMovieDetail = async () => {
            setIsPending(true);

            try {
                const { data } = await axios.get<MovieDetailsResponse>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                );
                setDetail(data);
                console.log(data)
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovieDetail();
    }, [movieId]);

    useEffect((): void => {
        const fetchMovieCasts = async () => {
            setIsPending(true);

            try {
                const { data } = await axios.get<movieCreditResponse>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
                        },
                    }
                );
                setCasts(data.cast);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovieCasts();
    }, [movieId]);
    if (isError) {
        return <div className="text-center text-2xl text-red-500">에러가 발생했습니다.</div>;
    }
    return (
        <>
            {isPending && (
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            )}
            {!isPending && (
                <>
                    <div className="bg-black">
                        <div className="px-3 pb-3 min-h-full">
                            {detail && <MovieDetailCard detail={detail} />}
                        </div>
                        <div className="p-3 text-4xl font-bold text-white">
                            감독/출연
                        </div>
                        < div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                            {
                                casts.map((cast) => <MovieCastCard key={cast.id} cast={cast} />)
                            }
                        </div >
                    </div>
                </>
            )}

        </>
    )
}
