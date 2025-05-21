export default function CommentSkeleton():JSX.Element {
  return (
    <div className="flex items-start gap-3 bg-[#2a2d31] p-3 rounded animate-pulse">
      <div className="w-6 h-6 rounded-full bg-gray-700" />
      <div className="flex-1 space-y-2">
        <div className="w-1/4 h-4 bg-gray-700 rounded" />
        <div className="w-full h-3 bg-gray-700 rounded" />
        <div className="w-3/4 h-3 bg-gray-700 rounded" />
      </div>
    </div>
  );
}
