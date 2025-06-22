import { NowPlayResponse } from "../types/nowplay";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import useCustomFetch from "../hooks/useCustomFetch";


const NowPlaying = () => {
    const [page, setPage] = useState(1);
    const url :string = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`

    const {data, isLoading, isError} = useCustomFetch<NowPlayResponse>(url);
    

    const handlePrev = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNext = () => {
         setPage(page + 1);
    };

    return (
        <div className="p-6">
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {!isLoading && !isError && (
                <>
                    <div className="flex justify-center items-center gap-4">
                        <button onClick={handlePrev} disabled={page === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                            이전
                        </button>
                        <span className="text-lg font-semibold">페이지 {page}</span>
                        <button onClick={handleNext} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
                            다음
                        </button>
                    </div>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {data?.results.map((movie) => (
                            <li key={movie.id} className="relative group rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
                                <Link to={`/movies/${movie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                        alt={movie.title}
                                        className="rounded-xl w-full object-cover"
                                    />
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white text-sm rounded-md p-2 w-60 opacity-0 group-hover:opacity-100 transition duration-300 z-10 shadow-lg pointer-events-none">
                                        <h3 className="font-bold mb-1">{movie.title}</h3>
                                        <p className="line-clamp-3">{movie.overview}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default NowPlaying;
