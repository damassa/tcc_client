// src/pages/Home.tsx
import './style.css';
import imageBanner from '../../assets/images/imageBanner.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Carousel from '../../components/Carousel';
import LoadMoreButton from '../../components/LoadMoreButton';
import Loading from '../../components/Loading';

import React, { useEffect, useRef, useState } from 'react';
import { SerieResponse } from '../../types/serie';
import { getSeriesPerPage, getTopRatedSeries } from '../../api/SerieApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SerieContext } from '../../context/SerieProvider';

const PAGE_SIZE = 4;

const Home: React.FC = () => {
  const [series, setSeries] = useState<SerieResponse[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const fetchedPagesRef = useRef<Set<number>>(new Set());
  const [topRated, setTopRated] = useState<SerieResponse[]>([]);
  const [topRatedPage, setTopRatedPage] = useState(0);
  const [topRatedIsLast, setTopRatedIsLast] = useState(false);
  const [loadingMoreTopRated, setLoadingMoreTopRated] = useState(false);
  const fetchedTopRatedPagesRef = useRef<Set<number>>(new Set());

  const { seriesSearch } = React.useContext<any>(SerieContext);

  // Função para carregar uma página (interno)
  const fetchPage = async (p: number, signal?: AbortSignal) => {
    // evita re-fetch se já trouxe essa página
    if (fetchedPagesRef.current.has(p)) return;
    if (isLast) return;

    if (p === 0) setLoadingInitial(true);
    else setLoadingMore(true);

    try {
      const data = await getSeriesPerPage(p, PAGE_SIZE, signal);
      // append, evitando duplicatas por id
      setSeries((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));
        const toAppend = data.content.filter((s) => !existingIds.has(s.id));
        return [...prev, ...toAppend];
      });

      fetchedPagesRef.current.add(p);
      setIsLast(Boolean(data.last));
    } catch (err: any) {
      if (err?.name === 'CanceledError' || err?.message === 'canceled') {
        // request cancelado — ignora
      } else {
        console.error('Erro ao buscar séries (page):', err);
      }
    } finally {
      setLoadingInitial(false);
      setLoadingMore(false);
    }
  };

  const fetchTopRatedSeries = async (p: number, signal?: AbortSignal) => {
    if (fetchedTopRatedPagesRef.current.has(p)) return;
    if (topRatedIsLast) return;

    if (p === 0) setLoadingMoreTopRated(true);
    else setLoadingMoreTopRated(true);

    try {
      const data = await getTopRatedSeries(p, PAGE_SIZE, signal);

      setTopRated((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));
        const toAppend = data.content.filter((s) => !existingIds.has(s.id));
        return [...prev, ...toAppend];
      });

      fetchedTopRatedPagesRef.current.add(p);
      setTopRatedIsLast(Boolean(data.last));
    } catch (err: any) {
      if (err?.name !== 'CanceledError' && err?.message !== 'canceled') {
        console.error('Erro ao buscar séries mais bem avaliadas:', err);
      }
    } finally {
      setLoadingMoreTopRated(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchTopRatedSeries(topRatedPage, controller.signal);
    return () => controller.abort();
  }, [topRatedPage]);

  // Efeito: quando page mudar (não em modo busca) faz fetch
  useEffect(() => {
    if (seriesSearch.length > 0) return; // busca tem prioridade — nenhuma paginação
    const controller = new AbortController();
    fetchPage(page, controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, seriesSearch]);

  // Se o usuário começar a buscar (seriesSearch) -> não ficar carregando mais
  // Se a busca for limpa (length === 0) queremos resetar para paginação desde 0
  useEffect(() => {
    if (seriesSearch.length > 0) {
      // modo busca: não mexe no array paginado
      return;
    }
    // se vem do modo busca para modo normal — resetar paginação para evitar duplicatas estranhas
    if (fetchedPagesRef.current.size === 0 && series.length === 0) {
      // primeira carga já será acionada pelo effect de page (page começa em 0)
      return;
    }
    if (seriesSearch.length === 0 && series.length === 0) {
      // força recarregar página 0
      setPage(0);
      fetchedPagesRef.current.clear();
      setIsLast(false);
    }
    // Nota: se você quiser que limpar a busca volte a lista anterior sem recarregar,
    // remova o reset acima.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesSearch]);

  const handleLoadMore = () => {
    if (loadingMore || loadingInitial || isLast) return;
    setPage((prev) => prev + 1);
  };

  // O que mostrar: se há busca, mostra seriesSearch; senão, as paginadas
  const seriesToShow = seriesSearch.length > 0 ? seriesSearch : series;

  if (loadingInitial && series.length === 0 && seriesSearch.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 text-white min-h-screen">
        {/* Banner */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 px-4 md:px-12 py-12 bg-black">
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              Assista todas as suas séries favoritas de{' '}
              <span className="text-purple-500">Tokusatsu</span> no conforto de sua casa.
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Ação, nostalgia e heróis lendários direto da sua tela.
            </p>
          </div>
          <div className="flex-1 w-full max-w-md md:max-w-xl">
            <img
              src={imageBanner}
              alt="imagem da homepage"
              className="w-full h-auto object-contain rounded-xl ring-1 ring-purple-700/40 shadow-purple-500/20 shadow-2xl"
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-10 mb-4">Lançamentos</h3>
        <Carousel />

        {/* Séries mais bem avaliadas */}
        <h3 className="text-2xl font-bold mt-10 mb-4">Mais Votadas</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {topRated.map((serie, index) => (
            <motion.div
              key={serie.id}
              className="w-36 sm:w-40 md:w-44 lg:w-48 gap-6 rounded-lg border border-zinc-700 shadow-md"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link to={`/detail/${serie.id}`}>
                <img
                  className="w-full h-48 object-cover rounded-lg shadow-md transition-shadow"
                  src={serie.image}
                  alt={serie.name}
                  title={serie.name}
                />
              </Link>
              <div className="mt-2 text-center px-2 pb-3">
                <h2 className="text-sm font-semibold truncate">{serie.name}</h2>
                <p className="text-xs text-gray-400">{serie.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {!topRatedIsLast && (
          <div className="flex justify-center my-6">
            <LoadMoreButton
              onClick={() => setTopRatedPage((prev) => prev + 1)}
              disabled={loadingMoreTopRated}
            />
          </div>
        )}

        <h3 className="text-2xl font-bold mt-10 mb-4">Séries Populares</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {seriesToShow.map((serie, index) => (
            <motion.div
              key={serie.id}
              className="w-36 sm:w-40 md:w-44 lg:w-48 gap-6 rounded-lg border border-zinc-700 shadow-md"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Link to={`/detail/${serie.id}`}>
                <img
                  className="w-full h-48 object-cover rounded-t-lg shadow-md transition-shadow"
                  src={serie.image}
                  alt={serie.name}
                  title={serie.name}
                />
              </Link>
              <div className="mt-2 text-center px-2 pb-3">
                <h2 className="text-sm font-semibold truncate">{serie.name}</h2>
                <p className="text-xs text-gray-400">{serie.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more somente se não houver busca e ainda tiver mais */}
        {seriesSearch.length === 0 && !isLast && (
          <div className="flex justify-center my-6">
            <LoadMoreButton onClick={handleLoadMore} disabled={loadingMore || loadingInitial} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
