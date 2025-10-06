// src/hooks/useRatings.ts
import { useEffect, useState } from 'react';
import { RatingPayload, RatingResponse } from '../types/rating';
import { createRating, getRatingsBySerie } from '../api/RatingApi';
import { getRatingStats, RatingStats } from '../api/RatingStatsApi';

export default function useRatings(serieId: number) {
  const [ratings, setRatings] = useState<RatingResponse[]>([]);
  const [stats, setStats] = useState<RatingStats>({ average: 0, totalVotes: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch inicial
  useEffect(() => {
    if (!serieId) return;

    setLoading(true);
    Promise.all([getRatingsBySerie(serieId), getRatingStats(serieId)])
      .then(([ratingsData, statsData]) => {
        setRatings(ratingsData);
        setStats(statsData);
      })
      .catch(() => setError('Erro ao carregar avaliações'))
      .finally(() => setLoading(false));
  }, [serieId]);

  // Criar nova avaliação
  const addRating = async (dto: RatingPayload) => {
    try {
      const newRating = await createRating(dto);
      setRatings((prev) => [newRating, ...prev]);
      const updatedStats = await getRatingStats(serieId);
      setStats(updatedStats);
    } catch {
      setError('Erro ao enviar avaliação');
    }
  };

  return {
    ratings, // lista completa (se precisar exibir quem votou)
    stats, // { average, totalVotes }
    loading,
    error,
    addRating,
  };
}
