import { useState } from "react";
import { LpCommentData } from "../../types/lp";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import { PAGENATION_ORDER } from "../../enums/common";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";

interface CommentListProps {
    lpid: string;
    order: PAGENATION_ORDER;
    comment: LpCommentData;
}

export function LpComment({ lpid, order, comment }: CommentListProps) {
    const [toggle, setToggle] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const { mutate: patchCommentMutate } = usePatchComment(lpid, order);
    const { mutate: deleteCommentMutate } = useDeleteComment(lpid, order);
    const handleEditComment = () => {
        patchCommentMutate(
            {
                commentId: comment.id,
                content: editContent,
            },
            {
                onSuccess: () => {
                    setIsEdit(false);
                    setToggle(false);
                },
                onError: (error) => {
                    console.error("댓글 수정 실패:", error);
                },
            }
        );
    };
    const handelDeleteCommment = () => {
        deleteCommentMutate({
            commentId: comment.id,
        },
            {
                onSuccess: () => {
                    setToggle(false);
                },
                onError: (error) => {
                    console.error("댓글 삭제 실패:", error);
                },
            }
        );
    }

    return (
        <div className="relative flex bg-gray-300 rounded my-1 p-2 items-start">
            <img
                src={comment.author?.avatar ?? ""}
                alt="logo"
                className="w-10 h-10 rounded-full border-black hover:shadow-lg transition-shadow duration-300 cursor-pointer mr-2"
            />
            <div className="flex-1">
                <h1 className="font-bold">{comment.author?.name}</h1>
                {!isEdit ? (
                    <p>{comment.content}</p>
                ) : (
                    <input
                        className="bg-gray-100 border border-gray-800 rounded w-full"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                )}
            </div>

            <div
                className="ml-auto text-gray-600 text-xl px-2 cursor-pointer relative"
                onClick={() => {
                    if (isEdit) handleEditComment();
                    else setToggle((prev) => !prev);
                }}
            >
                {isEdit ? "✔" : "⋮"}

                {!isEdit && toggle && (
                    <div className="absolute right-0 mt-2 w-20 bg-white border rounded shadow-md z-10 text-sm">
                        <button
                            className="w-full text-left px-2 py-1 hover:bg-gray-100 font-thin"
                            onClick={() => {
                                setIsEdit(true);
                                setToggle(false);
                            }}
                        >
                            수정
                        </button>
                        <button
                            className="w-full text-left px-2 py-1 hover:bg-gray-100 font-thin"
                            onClick={handelDeleteCommment}
                        >
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
