const LpCommentSkeleton = () => {
    return (
        <div className="flex flex-row bg-gray-300 rounded my-1 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-400 transition-shadow m-1 animate-pulse" />
            <div className="flex flex-col">
                <div className="w-20 h-full bg-gray-400 animate-pulse rounded my-1" />
                <div className="w-150 h-full bg-gray-400 animate-pulse rounded" />
            </div>
        </div>
    )
}

export default LpCommentSkeleton
