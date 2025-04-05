import { Link } from "react-router-dom";
// 과제 1,2 에서는 movie name을 사용했지만 이번에는 id값을 사용함
export default function MovieCard({ movie }) {
    if (!movie || !movie.poster_path) {
        return <div className="text-center text-gray-500">포스터 이미지 없음</div>;
    }

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className="relative shadow-md rounded-lg overflow-hidden transition-transform transform group cursor-pointer">
                <img
                    className="w-full h-64 object-cover transition-all duration-500 group-hover:blur-sm"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-opacity-70 text-white hidden group-hover:flex flex-col justify-center items-center transition-opacity duration-500 ease-in-out p-5 text-center">
                    <h2 className="text-xl font-bold">{movie.title}</h2>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-3">{movie.overview}</p>
                </div>
            </div>
        </Link>
    );
}
