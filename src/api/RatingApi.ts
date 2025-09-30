import { RatingPayload, RatingResponse } from '../types/rating';
import api from './api';

/* Criar lógica de avaliação */
export async function createRating(dto: RatingPayload): Promise<RatingResponse> {
  const res = await api.post('/api/v1/ratings', dto);
  return res.data;
}

export async function getRatingsBySerie(serieId: number): Promise<RatingResponse[]> {
  const res = await api.get(`/api/v1/ratings/serie/${serieId}`);
  return res.data ?? [];
}
