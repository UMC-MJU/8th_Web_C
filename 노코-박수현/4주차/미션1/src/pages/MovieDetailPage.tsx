import { useParams } from "react-router-dom";
import { movieCreditResponse, MovieDetailsResponse } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieCastCard from "../components/MovieCastCard";
import MovieDetailCard from "../components/MovieDetailsCard";
import useCustomFetch from "../hooks/useCustomfetch";

export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>();
    const datailUrl = `https://api.themoviedb.org/3/movie/${movieId}`
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`
    const { data: detail, isPending:isDetailPending, isError:isDetailError } = useCustomFetch<MovieDetailsResponse>(datailUrl, "ko-KR");
    const { data: casts, isPending:isCastsPending, isError:isCastsError } = useCustomFetch<movieCreditResponse>(castUrl, "ko-KR");
    console.log(casts)
    if (isDetailError || isCastsError) {
        return <div className="text-center text-2xl text-red-500">에러가 발생했습니다.</div>;
    }
    return (
        <>
            {isDetailPending || isCastsPending && (
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            )}
            {!(isDetailPending || isCastsPending) && (
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
                                casts?.cast.map((cast) => <MovieCastCard key={cast.id} cast={cast} />)
                            }
                        </div >
                    </div>
                </>
            )}

        </>
    )
}
