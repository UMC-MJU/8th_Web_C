import { useState } from "react";
import { LpData } from "../types/lp";
import { Link } from "react-router-dom";

export default function LpList({ lp }: { lp: LpData }) {
    const [isHover, setIsHover] = useState(false);
    console.log(lp)
    return (
        <>
            <div className="group relative overflow-hidden w-100 h-100 transition-transform duration-500 hover:scale-115 hover:z-1"
                onMouseEnter={(): void => setIsHover(true)}
                onMouseLeave={(): void => setIsHover(false)}
            >
                <img
                    src={lp?.thumbnail}
                    alt={`${lp.title}의 이미지`}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                {isHover && (
                    <div className="absolute inset-0 pointer-events-none">
                        <Link
                            to={`/lp/${lp.id}`}
                            className="absolute bottom-10 left-4 text-white text-lg font-bold drop-shadow-lg hover:text-blue-400 cursor-pointer pointer-events-auto"
                        >
                            {lp.title}
                        </Link>
                        <p className="absolute bottom-4 left-4 text-white text-lg drop-shadow-lg">
                            {new Date(lp.createdAt).toLocaleDateString("ko-KR").replace(/\s/g, "")}
                        </p>
                        <p className="absolute bottom-4 right-8 text-white text-lg drop-shadow-lg cursor-pointer hover:text-red-400 pointer-events-auto">
                            ♥
                        </p>
                        <p className="absolute bottom-4 right-4 text-white text-lg drop-shadow-lg">
                            {lp.likes.length}
                        </p>
                    </div>
                )}

            </div>
        </>
    )
}