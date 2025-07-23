// src/components/MovieModal.tsx
import MoviePage from './movie';

interface MovieModalProps {
  movieId: string;
  onClose: () => void;
}

export default function MovieModal({ movieId, onClose }: MovieModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-2xl z-10"
        >
          &times;
        </button>

        {/* 영화 정보 */}
        <MoviePage id={movieId} />
      </div>
    </div>
  );
}
