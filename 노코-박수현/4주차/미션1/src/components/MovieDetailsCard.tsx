import React from "react";
import { MovieDetailsResponse } from "../types/movieDetails"
interface MovieDetailProps {
    detail: MovieDetailsResponse;
}
export default function MovieDetailCard({ detail }: MovieDetailProps): React.JSX.Element {

    return (
        <>
            <div className="relative w-full h-[880px]">
                <img
                    src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
                    alt={`${detail.title}의 이미지`}
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                {/* 배경 이미지 위에 그라데이션 오버레이 추가 */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/100 to-transparent" />
                <div className="absolute left-10 bottom-10 z-10 text-white">
                    <h1 className="text-4xl font-bold drop-shadow-lg">{detail.title}</h1>
                    <p className="text-lg mt-2 drop-shadow">평균 {detail.vote_average.toFixed(1)}</p>
                    <p className="text-lg drop-shadow">{detail.release_date.slice(0, -6)}</p>
                    <p className="text-lg drop-shadow">{detail.runtime}분</p>
                    <p className="text-2xl italic drop-shadow mt-2">{detail.genres.map((genre) => genre.name).join(", ")}</p>
                    <div className="w-full max-w-xl mt-5">
                        <p className="text-lg drop-shadow">{detail.overview}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
