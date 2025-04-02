import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
import { useParams } from "react-router-dom";
import axios from "axios";

const MoviePage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie>();
    useEffect(() => {
        const fetchMovie = async () => {
            const { data } = await axios.get<Movie>(
                `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
                {
                    headers: {
                        Authorization: ` Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTZhMGRlMDAwYjljZjgzZTExODBjOTE0N2VjMWM0MSIsIm5iZiI6MTc0MzQ4NDY1OS43MTQsInN1YiI6IjY3ZWI3NmYzNDk3MDA4ODFmY2ZiMGJiMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sdp9LkTP1w03Jxawg8zS2xuaF-wU7I-hldwz5BqnSjA`,
                    },
                }
            );
            setMovie(data);
        };

        if (id) {
            fetchMovie();
        }

    }, [id]);

    return (
        <div>
            <h1>
                {`영화제목 ${movie?.title}`}
            </h1>
            <img 
            src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`}
            alt={movie?.title}
            />
            <p>{movie?.overview}</p>
            <p>개봉일 : {movie?.release_date}</p>
            <p>평점: {movie?.vote_average}</p>
        </div>
    )
}

export default MoviePage;