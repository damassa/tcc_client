import { EpisodeResponse } from './../types/episode';
import api from './api';

export const getEpisodesBySerieId = async (id: number): Promise<EpisodeResponse[]> => {
  try {
    const response = await api.get(`/api/v1/episodes/serie/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return [];
};
