import { useEffect, useState } from 'react';
import { SerieResponse } from '../types/serie';
import { getTopRatedSeries } from '../api/SerieApi';

export default function useTopRatedSeries() {
  const [series, setSeries] = useState<SerieResponse[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSeries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSeries = async () => {
    if (loading || page >= totalPages) return;

    setLoading(true);
    try {
      const res = await getTopRatedSeries(page, 4);
      setSeries((prev) => [...prev, ...res.content]);
      setTotalPages(res.totalPages);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error('Erro ao carregar séries mais bem avaliadas', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    series,
    loadSeries,
    loading,
    hasMore: page < totalPages,
  };
}
