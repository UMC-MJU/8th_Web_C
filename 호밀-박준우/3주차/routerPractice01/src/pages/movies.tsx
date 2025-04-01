import { Movie, MovieResponse } from "../types/movie";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
                {
                    headers: {
                        Authorization: ` Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTZhMGRlMDAwYjljZjgzZTExODBjOTE0N2VjMWM0MSIsIm5iZiI6MTc0MzQ4NDY1OS43MTQsInN1YiI6IjY3ZWI3NmYzNDk3MDA4ODFmY2ZiMGJiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sdp9LkTP1w03Jxawg8zS2xuaF-wU7I-hldwz5BqnSjA`,
                    },
                }
            );

            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <div className="p-6">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies?.map((movie) => (
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
        </div>
    );
};

export default MoviesPage;
