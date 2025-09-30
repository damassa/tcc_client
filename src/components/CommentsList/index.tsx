import { FaStar } from 'react-icons/fa';
import { RatingResponse } from '../../types/rating';

interface CommentsListProps {
  comments: RatingResponse[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-400 text-sm">Nenhum comentário ainda.</p>;
  }

  const avg = comments.reduce((acc, c) => acc + c.stars, 0) / comments.length;

  return (
    <div className="space-y-4">
      {/* Mostrar média */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-white font-semibold">Média:</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={18}
              className={i < Math.round(avg) ? 'text-yellow-400' : 'text-gray-600'}
            />
          ))}
        </div>
        <span className="text-gray-300 text-sm">({avg.toFixed(1)} de 5)</span>
      </div>

      {/* Lista de comentários */}
      {comments.map((c) => (
        <div key={c.id} className="bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-white">{c.userName}</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  className={i < c.stars ? 'text-yellow-400' : 'text-gray-600'}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-300">{c.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
