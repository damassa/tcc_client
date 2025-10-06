import api from './api';

export interface RatingStats {
  average: number;
  totalVotes: number;
}

export async function getRatingStats(serieId: number): Promise<RatingStats> {
  const response = await api.get(`/api/v1/ratings/serie/${serieId}/stats`);
  return response.data ?? { average: 0, totalVotes: 0 };
}
