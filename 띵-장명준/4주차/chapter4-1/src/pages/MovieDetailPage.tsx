import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const {
    data: movie,
    isPending: isPendingMovie,
    isError: isErrorMovie,
  } = useCustomFetch<any>(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
  );

  const {
    data: credits,
    isPending: isPendingCredits,
    isError: isErrorCredits,
  } = useCustomFetch<any>(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`
  );

  if (isErrorMovie || isErrorCredits) {
    return (
      <div className="p-10 text-center">
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  if (isPendingMovie || isPendingCredits || !movie || !credits) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="text-white bg-black min-h-screen">
      {/* 배경 이미지 + 타이틀 + 정보 */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
        <div className="relative z-10 px-12 text-left max-w-[60%]">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-2">📊 평균 {movie.vote_average}</p>
        </div>
      </div>

      {/* 📌 스토리 소개 섹션 */}
      <div className="px-12 py-10 bg-black border-b border-gray-700">
        <h2 className="text-2xl font-bold mb-4">📝 줄거리 소개</h2>
        <p className="text-gray-300 leading-relaxed text-base">
          {movie.overview}
        </p>
      </div>

      {/* 감독/출연 */}
      <div className="px-12 py-8 bg-black">
        <h2 className="text-3xl font-bold mb-6">감독/출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* 감독 */}
          {credits.crew
            .filter((member: any) => member.job === "Director")
            .map((director: any) => (
              <div key={director.id} className="text-center">
                <img
                  className="w-24 h-24 rounded-full mx-auto object-cover border border-white"
                  src={
                    director.profile_path
                      ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                      : "/default-profile.png"
                  }
                  alt={director.name}
                />
                <p className="font-semibold mt-2">{director.name}</p>
                <p className="text-sm text-gray-400">{director.job}</p>
              </div>
            ))}

          {/* 배우 */}
          {credits.cast.slice(0, 12).map((actor: any) => (
            <div key={actor.cast_id} className="text-center">
              <img
                className="w-24 h-24 rounded-full mx-auto object-cover border border-white"
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                    : "/default-profile.png"
                }
                alt={actor.name}
              />
              <p className="font-semibold mt-2">{actor.name}</p>
              <p className="text-sm text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
