import { HistoryResponse, HistoryRequest } from '../types/history';
import api from './api';

/** Busca histórico do usuário para o episódio */
export async function getHistory(
  userId: number,
  episodeId: number,
): Promise<HistoryResponse | null> {
  try {
    const response = await api.get('/api/v1/histories/search', {
      params: { userId, episodeId },
      validateStatus: (status) => (status >= 200 && status < 300) || status === 204,
    });

    // Se não houver histórico → 204 No Content
    if (response.status === 204) {
      return null;
    }

    return response.data as HistoryResponse;
  } catch (error) {
    console.error('Erro ao buscar histórico', error);
    throw error;
  }
}

/** Cria ou atualiza histórico */
export async function saveHistory(dto: HistoryRequest): Promise<HistoryResponse> {
  try {
    const response = await api.post('/api/v1/histories', dto);
    return response.data as HistoryResponse;
  } catch (error) {
    console.error('Erro ao salvar histórico', error);
    throw error;
  }
}
