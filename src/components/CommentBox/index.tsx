import { useState } from 'react';
import { RatingPayload } from '../../types/rating';
import RatingStars from '../../components/RatingStars';

interface CommentBoxProps {
  serieId: number;
  userId: number;
  onSubmit: (rating: RatingPayload) => void;
}

export default function CommentBox({ serieId, userId, onSubmit }: CommentBoxProps) {
  const [comment, setComment] = useState('');
  const [stars, setStars] = useState(0);

  const handleSubmit = () => {
    if (comment.trim() === '' || stars === 0) return;

    onSubmit({
      idUser: userId, // ainda necessário até migrar para token
      idSerie: serieId,
      comment,
      stars,
    });

    setComment('');
    setStars(0);
  };

  return (
    <div className="bg-black-800 p-4 rounded-xl shadow-md border border-gray-700">
      <h3 className="text-white text-lg font-semibold mb-2">Deixe sua avaliação</h3>

      {/* Seleção de estrelas */}
      <RatingStars onChange={setStars} />

      <textarea
        className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 mb-2 resize-none"
        rows={3}
        placeholder="Escreva seu comentário..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-900 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition cursor-pointer"
      >
        Enviar
      </button>
    </div>
  );
}
