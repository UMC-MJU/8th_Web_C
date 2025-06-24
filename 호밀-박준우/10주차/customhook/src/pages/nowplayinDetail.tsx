import { NowPlay } from "../types/nowplay";
import { useParams } from "react-router-dom";
import { CreditResponse } from "../types/credit";
import useCustomFetch from "../hooks/useCustomFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const MoviePage = () => {
    const { id } = useParams();
    const movieUrl: string = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`
    const creditUrl: string = `https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`

    const {
        data: movieData,
        isLoading,
        isError } = useCustomFetch<NowPlay>(movieUrl);
    const credit = useCustomFetch<CreditResponse>(creditUrl).data;


    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {!isLoading && !isError && (
                <>
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                {movieData?.title || '영화 제목 없음'}
            </h1>

            <div className="flex flex-col md:flex-row items-start gap-6">
                <img
                    className="w-64 rounded-xl shadow-lg"
                    src={`https://image.tmdb.org/t/p/w300${movieData?.poster_path}`}
                    alt={movieData?.title}
                />
                <div className="flex-1 space-y-4">
                    <p className="text-gray-700">{movieData?.overview}</p>
                    <p><span className="font-semibold text-gray-800">개봉일:</span> {movieData?.release_date}</p>
                    <p><span className="font-semibold text-gray-800">평점:</span> {movieData?.vote_average}</p>

                    <div>
                        <h2 className="text-xl font-semibold mt-6">감독</h2>
                        <p className="text-gray-600">
                            {credit?.crew.find((member) => member.job === "Director")?.name || "감독 정보 없음"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">출연진</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {credit?.cast.slice(0, 10).map((actor) => (
                        <li key={actor.id} className="text-center">
                            <img
                                className="w-24 h-32 object-cover rounded-md mx-auto shadow-md"
                                src={
                                    `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                }
                                alt={actor.name}
                            />
                            <p className="mt-2 font-medium text-gray-800">{actor.name}</p>
                            <p className="text-sm text-gray-500">{actor.character}</p>
                        </li>
                    ))}
                </ul>
            </div>
            </>
            )}
        </div>
    );
};

export default MoviePage;
