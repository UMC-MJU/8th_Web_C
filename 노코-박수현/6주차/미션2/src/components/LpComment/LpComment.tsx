import { LpCommentData } from "../../types/lp";

interface CommentListProps {
    comment: LpCommentData;
}
export function LpComment({ comment }: CommentListProps) {
    return (
        <div className="flex bg-gray-300 rounded my-1">
            <img
                src={comment.author?.avatar ?? ""}
                alt="logo"
                className="w-10 h-10 rounded-full border-black hover:shadow-lg transition-shadow duration-300 cursor-pointer m-1"
            />
            <div>
                <h1 className="font-bold">{comment.author?.name}</h1>
                {comment.content}
            </div>
        </div>
    )
}