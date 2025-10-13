import { PageResponse } from '../types/page';
import { SerieResponse } from '../types/serie';
import api from './api';

// ==============================
// SÉRIES POPULARES
// ==============================
export const getAllSeries = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get('/api/v1/series');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar todas as séries:', error);
    return [];
  }
};

export async function getSeriesPerPage(
  page = 0,
  size = 4,
  signal?: AbortSignal,
): Promise<PageResponse<SerieResponse>> {
  try {
    const res = await api.get<PageResponse<SerieResponse>>(`/api/v1/series/pageable`, {
      params: { page, size },
      signal,
    });
    return res.data;
  } catch (error: any) {
    if (error?.name !== 'CanceledError' || error?.message === 'canceled') {
      throw error;
    }
    console.log('Erro REAL ao buscar as séries: ', error);
    throw error;
  }
}

// ==============================
// MAIS BEM AVALIADAS (≥ 10 ESTRELAS)
// ==============================
export async function getTopRatedSeries(
  page = 0,
  size = 4,
  signal?: AbortSignal,
): Promise<PageResponse<SerieResponse>> {
  try {
    const res = await api.get<PageResponse<SerieResponse>>(`/api/v1/series/top-rated/pageable`, {
      params: { page, size },
      signal,
    });
    return res.data;
  } catch (error) {
    if ((error as any)?.name !== 'CanceledError') {
      console.error('Erro ao buscar séries mais votadas:', error);
    }
    throw error;
  }
}

// ==============================
// SÉRIES ORDENADAS POR ANO
// ==============================
export const getSeriesOrderedByYear = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get('/api/v1/series');
    const series = response.data as SerieResponse[];
    return series.sort((a, b) => b.year - a.year);
  } catch (error) {
    console.error('Erro ao ordenar séries por ano:', error);
    return [];
  }
};

// ==============================
// DETALHE DE UMA SÉRIE
// ==============================
export const getSerieById = async (id: number): Promise<SerieResponse> => {
  try {
    const response = await api.get<SerieResponse>(`/api/v1/series/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar série de ID ${id}:`, error);
    throw error;
  }
};

// ==============================
// FAVORITOS
// ==============================
export const addSerieToFavorites = async (serie_id: number, user_id: number) => {
  try {
    await api.post(`/api/v1/series/addToFavorites`, { serie_id, user_id });
  } catch (error) {
    console.error('Erro ao adicionar série aos favoritos:', error);
  }
};

export const removeSerieFromFavorites = async (serie_id: number, user_id: number) => {
  try {
    await api.post(`/api/v1/series/removeFromFavorites`, { serie_id, user_id });
  } catch (error) {
    console.error('Erro ao remover série dos favoritos:', error);
  }
};

export const countFavoritesBySerieId = async (
  serie_id: number,
  user_id: number,
): Promise<number> => {
  try {
    const response = await api.post(`/api/v1/series/favorites/count`, { serie_id, user_id });
    return response.data;
  } catch (error) {
    console.error('Erro ao contar favoritos:', error);
    return 0;
  }
};

export const getFavoriteSeries = async (): Promise<SerieResponse[]> => {
  try {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await api.get(`/api/v1/users/${userData.id}/favorites`);

    if (response.status === 204) return [];
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar séries favoritas:', error);
    return [];
  }
};

// ==============================
// BUSCA POR NOME
// ==============================
export const getSeriesByName = async (name: string): Promise<SerieResponse[]> => {
  try {
    const response = await api.get(`/api/v1/series/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar séries por nome:', error);
    return [];
  }
};
