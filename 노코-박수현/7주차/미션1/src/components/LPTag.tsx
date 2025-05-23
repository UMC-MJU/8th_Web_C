interface TagListProps {
    contents: string[];
    onDelete: (tag: string) => void;
  }
  
  const LPTag = ({ contents, onDelete }: TagListProps) => {
    return (
      <>
        {contents.map((content) => (
          <div
            className="flex items-center w-auto max-w-full border border-gray-300 rounded px-3 py-1 mr-2 whitespace-nowrap"
            key={content}
          >
            <span className="mr-2">{content}</span>
            <button
              className="text-red-500 font-bold"
              onClick={() => onDelete(content)}
            >
              ×
            </button>
          </div>
        ))}
      </>
    );
  };
  
  export default LPTag;
  