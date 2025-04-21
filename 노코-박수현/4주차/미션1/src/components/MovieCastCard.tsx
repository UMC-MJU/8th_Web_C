import React from "react";
import { MovieCast } from "../types/movieCredits"
interface MovieCastProps {
    cast: MovieCast
}
export default function MovieCastCard({ cast }: MovieCastProps): React.JSX.Element {

    return (
        <>
            <div>
                <div
                    className="relative border-4 border-white rounded-full overflow-hidden shadow-lg cursor-pointer w-32 h-32 transition-transform duration-500 hover:scale-105"
                >
                    <img
                        src={cast.profile_path ? `https://image.tmdb.org/t/p/w200/${cast.profile_path}` : `//i.namu.wiki/i/f7r_Ll_sWcp8_Z8MoxkQrCVjvXtwdBsDutoxUzn7gRMRBLY6qhITv5xhgzD_VfnhjJ3LjFMZgN3i1vbpI3pIRBkFR9CIbVAYMHdtTmmn8L0pgxEbsCuQ0YCftg9dgtV2PPqfjmSE2BJMYs-6TJjyag.webp`}
                        alt={`${cast.original_name}의 이미지`}
                        className="w-full h-full object-cover text-white bg-gray-900 text-center"
                    />
                </div>
                <div>
                    <p className="text-lg font-bold leading-snug text-white hover:text-red-500 duration-300 cursor-pointer">{cast.original_name}</p>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-5">{cast.character}</p>
                </div>
            </div>
        </>
    )
}
