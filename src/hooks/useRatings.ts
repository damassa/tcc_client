// src/hooks/useRatings.ts
import { useEffect, useState } from 'react';
import { RatingPayload, RatingResponse } from '../types/rating';
import { createRating, getRatingsBySerie } from '../api/RatingApi';

export default function useRatings(serieId: number) {
  const [ratings, setRatings] = useState<RatingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch inicial
  useEffect(() => {
    if (!serieId) return;

    setLoading(true);
    getRatingsBySerie(serieId)
      .then((data) => setRatings(data))
      .catch(() => setError('Erro ao carregar avaliações'))
      .finally(() => setLoading(false));
  }, [serieId]);

  // Criar nova avaliação
  const addRating = async (dto: RatingPayload) => {
    try {
      const newRating = await createRating(dto);
      setRatings((prev) => [newRating, ...prev]); // insere no início
    } catch (err) {
      setError('Erro ao enviar avaliação');
    }
  };

  // Média de estrelas
  const avgStars =
    ratings.length > 0 ? ratings.reduce((acc, r) => acc + (r.stars || 0), 0) / ratings.length : 0;

  return {
    ratings,
    avgStars,
    loading,
    error,
    addRating,
  };
}
