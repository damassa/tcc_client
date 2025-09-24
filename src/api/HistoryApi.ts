import { HistoryResponse } from '../types/history';
import api from './api';

export async function getHistory(
  userId: number,
  episodeId: number,
): Promise<HistoryResponse | null> {
  try {
    const response = await api.get('/api/v1/histories/search', {
      params: { userId, episodeId },
    });

    const history = response.data;

    if (!history || !history.id) return null;

    return {
      id: history.id,
      idUser: history.idUser,
      idEpisode: history.idEpisode,
      pausedAt: history.pausedAt,
    };
  } catch (error: any) {
    console.error('Erro ao buscar histórico', error);
    throw error;
  }
}

export async function saveHistory(dto: Omit<HistoryResponse, 'id'>): Promise<HistoryResponse> {
  try {
    const response = await api.post('/api/v1/histories', dto);
    const history = response.data;

    return {
      id: history.id,
      idUser: history.idUser,
      idEpisode: history.idEpisode,
      pausedAt: history.pausedAt,
    };
  } catch (error: any) {
    console.error('Erro ao salvar histórico', error);
    throw error;
  }
}
