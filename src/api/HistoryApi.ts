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

    // Se não houver histórico, o backend retorna 200 OK com corpo vazio
    if (!response.data || Object.keys(response.data).length === 0) return null;

    const history = response.data;
    return new HistoryResponse(history.idUser, history.idEpisode, history.pausedAt);
  } catch (error: any) {
    console.error('Erro ao buscar histórico', error);
    throw error;
  }
}

export async function saveHistory(dto: HistoryResponse): Promise<HistoryResponse> {
  try {
    const response = await api.post('/api/v1/histories', dto);
    const history = response.data;
    return new HistoryResponse(history.idUser, history.idEpisode, history.pausedAt);
  } catch (error: any) {
    console.error('Erro ao salvar histórico', error);
    throw error;
  }
}
