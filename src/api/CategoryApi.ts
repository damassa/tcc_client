import api from './api';
import { CategoryResponse } from '../types/category';
import { SerieResponse } from '../types/serie';
// import { getSeriesByCategory } from './SerieApi';

export const getCategories = async (): Promise<CategoryResponse[]> => {
  try {
    const response = await api.get('/api/v1/categories', {
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

// Busca todas as séries em sua categoria especificada
export const getSeriesByCategory = async (categoryId: number): Promise<SerieResponse[]> => {
  try {
    const response = await api.get(`/api/v1/series/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    const series = response.data;
    return series;
  } catch (error) {
    console.error(error);
  }
  return [];
};
