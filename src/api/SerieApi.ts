import { PageResponse } from '../types/page';
import { SerieResponse } from '../types/serie';
import api from './api';

// Busca todas as séries
export const getAllSeries = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get('/api/v1/series', {});
    const series = response.data;
    return series;
  } catch (error) {
    console.error(error);
  }
  return [];
};

// Busca todas as séries paginadas para ter o botão de carregar mais
export async function getSeriesPerPage(
  page = 0,
  size = 4,
  signal?: AbortSignal,
): Promise<PageResponse<SerieResponse>> {
  const res = await api.get<PageResponse<SerieResponse>>('/api/v1/series/pageable', {
    params: { page, size },
    signal,
  });
  return res.data;
}

// Busca todas as séries ordenadas por ano (da mais recente até a mais antiga)
export const getSeriesOrderedByYear = async (): Promise<SerieResponse[]> => {
  try {
    const response = await api.get('/api/v1/series', {});
    const series = response.data;
    const orderedSeries = series.sort(
      (a: { year: number }, b: { year: number }) => b.year - a.year,
    );
    return orderedSeries;
  } catch (error) {
    console.error(error);
  }
  return [];
};

// Busca uma série pelo identificador (específico para detalhe da série)
export const getSerieById = async (id: number): Promise<SerieResponse> => {
  const response = await api.get<SerieResponse>(`/api/v1/series/${id}`, {}).catch((error) => {
    console.error(error);
    throw error;
  });

  return response.data;
};

//Adiciona uma série na lista de favoritos (PELO ID)
export const addSerieToFavorites = async (serie_id: number, user_id: number) => {
  try {
    await api.post(`/api/v1/series/addToFavorites`, {
      serie_id,
      user_id,
    });
  } catch (error) {
    console.error(error);
  }
};

export const countFavoritesBySerieId = async (
  serie_id: number,
  user_id: number,
): Promise<number> => {
  const response = await api.post(`/api/v1/series/favorites/count`, {
    serie_id,
    user_id,
  });
  return response.data;
};

export const removeSerieFromFavorites = async (serie_id: number, user_id: number) => {
  try {
    await api.post(`/api/v1/series/removeFromFavorites`, {
      serie_id,
      user_id,
    });
  } catch (error) {
    console.error(error);
  }
};

// Busca todas as séries favoritas do usuário logado
export const getFavoriteSeries = async (): Promise<SerieResponse[]> => {
  try {
    const handleMyData = () => {
      const data = JSON.parse(localStorage.getItem('user') || '{}');
      return data;
    };
    const response = await api.get(`/api/v1/users/${handleMyData().id}/favorites`, {});

    if (response.status === 204) {
      return [];
    }
    const favorites = response.data;
    return favorites;
  } catch (error: unknown) {
    console.error('Erro ao buscar séries favoritas:', error);

    throw new Error('Falha ao buscar séries favoritas.');
  }
};

export const getSeriesByName = async (name: string): Promise<SerieResponse[]> => {
  try {
    const response = await api.get(`/api/v1/series/name/${name}`, {});
    const series = response.data;
    return series;
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const getTopRatedSeries = async (
  limit: number = 10,
  signal?: AbortSignal,
): Promise<SerieResponse[]> => {
  try {
    const res = await api.get(`/api/v1/series/top-rated?limit=${limit}`, { signal });
    return res.data;
  } catch (error) {
    console.error('Erro ao buscar séries mais bem avaliadas.', error);
    throw error;
  }
};

// Deleta uma série
// export const deleteSerie = async (link: string): Promise<SerieResponse> => {
//   const res = await axios.delete(link, getAxiosConfig());
//   return res.data;
// };

// // Adiciona uma série
// export const addSerie = async (serie: SerieResponse): Promise<SerieResponse> => {
//   const res = await axios.post(
//     `${import.meta.env.VITE_API_URL}/api/v1/series`,
//     serie,
//     getAxiosConfig(),
//   );
//   return res.data;
// };

// // Altera uma série
// export const editSerie = async (serieEntry: SerieEntry): Promise<SerieResponse> => {
//   const res = await axios.put(serieEntry.url, serieEntry.serie, getAxiosConfig());
//   return res.data;
// };T extends any = any
