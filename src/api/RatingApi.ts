import { RatingPayload, RatingResponse } from '../types/rating';
import api from './api';
import { RatingStats } from './RatingStatsApi';

/* Criar lógica de avaliação */
export async function createRating(dto: RatingPayload): Promise<RatingResponse> {
  const token = localStorage.getItem('jwt');

  const res = await api.post('/api/v1/ratings', dto, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function getRatingsBySerie(serieId: number): Promise<RatingResponse[]> {
  const res = await api.get(`/api/v1/ratings/serie/${serieId}`);
  return res.data ?? [];
}

export async function getAverageRating(serieId: number): Promise<number> {
  const res = await api.get(`/api/v1/ratings/serie/${serieId}/average`);
  return res.data ?? 0;
}

export async function getRatingStats(serieId: number): Promise<RatingStats> {
  const response = await api.get(`/api/v1/ratings/serie/${serieId}/stats`);
  return response.data;
}
