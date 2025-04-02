import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import Movie from "../types/movie";

export default function MovieNowPlaying(): JSX.Element {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async (): Promise<void> => {
            try {
                const { data } = await axios.get(
                    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                    }
                );
                if (data && data.results) {
                    setMovies(data.results);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
                
            </div>
        </div>
    );
}
