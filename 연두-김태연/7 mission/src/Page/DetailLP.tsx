import SpinningCD from "../components/SpinningCD";
import { CircleUserRound } from "lucide-react";
import { Trash2 } from  "lucide-react";
import { Pencil } from  "lucide-react";
import { Heart } from 'lucide-react';
import { useLocation } from "react-router-dom";
import CommentPage from "./CommentPage";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export default function DetailLP(): JSX.Element {
    const location = useLocation();
    const { id, name, createdAt, title, content } = location.state || {};
    dayjs.locale('ko');   
    dayjs.extend(relativeTime);
    const relative = dayjs(createdAt).fromNow(); 

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

        <div className="flex justify-center mt-2">
          <Heart size={20} />
        </div>
      </div>
      <div>
        <CommentPage/>
      </div>
    </>
    );
}
