import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CircleUserRound, Trash2, Pencil, Heart } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import SpinningCD from "../components/SpinningCD";
import CommentPage from "./CommentPage";
import { addLikeAPI, delLikeAPI } from "../api/likesAPI" 

export default function DetailLP(): JSX.Element {
  const location = useLocation();
  const { id, name, createdAt, title, content, likeCount = 0 } = location.state || {};

  const [likes, setLikes] = useState<number>(likeCount);
  const [hasLiked, setHasLiked] = useState<boolean>(false); 

  dayjs.locale("ko");
  dayjs.extend(relativeTime);
  const relative = dayjs(createdAt).fromNow();

  const handleLike = async () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);

      try {
        await addLikeAPI(id);
      } catch (error) {
        setLikes((prev) => prev - 1);
        setHasLiked(false);
        alert("좋아요에 실패했습니다.");
      }
    } else {
      setLikes((prev) => prev - 1);
      setHasLiked(false);

      try {
        await delLikeAPI(id);
      } catch (error) {
        setLikes((prev) => prev + 1);
        setHasLiked(true);
        alert("좋아요 취소에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <div className="bg-[#212529] w-[50%] h-auto mx-auto mt-12 mb-10 p-6 rounded-lg text-white space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CircleUserRound size={20} color="#F0648C" />
            <span className="text-sm">{name}</span>
          </div>
          <span className="text-sm text-gray-400">{relative}</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">{title}</p>
          <div className="flex gap-2">
            <Pencil size={20} />
            <Trash2 size={20} />
          </div>
        </div>

        <div className="flex justify-center items-center bg-[#292d31] rounded-lg shadow-xl w-full h-[300px] md:h-[400px]">
          <SpinningCD />
        </div>

        <div className="text-center text-sm text-gray-200">
          {content}
        </div>

        <div className="flex justify-center items-center gap-2 mt-2 cursor-pointer"
             onClick={handleLike}>
          <Heart
            size={20}
            className={hasLiked ? "text-[#F0648C]" : "text-gray-400"}
          />
          <span className="text-sm text-gray-300">{likes}</span>
        </div>
      </div>
      
      <div>
        <CommentPage />
      </div>
    </>
  );
}
