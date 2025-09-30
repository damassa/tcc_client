import React, { useEffect, useRef, useState } from 'react';
import useRatings from '../../hooks/useRatings';
import ReactPlayer from 'react-player/lazy';
import { getHistory, saveHistory } from '../../api/HistoryApi';
import { motion, AnimatePresence } from 'framer-motion';
import './style.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Slider from 'react-slick';
import { SerieResponse } from '../../types/serie';
import { useParams } from 'react-router-dom';
import {
  addSerieToFavorites,
  countFavoritesBySerieId,
  getSerieById,
  removeSerieFromFavorites,
} from '../../api/SerieApi';
import { getEpisodesBySerieId } from '../../api/EpisodesApi';
import { EpisodeResponse } from '../../types/episode';
import { AlertTriangle } from 'lucide-react';
import RatingStars from '../../components/RatingStars';
import CommentBox from '../../components/CommentBox';
import CommentsList from '../../components/CommentsList';

const SerieDetail: React.FC = () => {
  const [serie, setSerie] = useState<SerieResponse>();
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeResponse | null>(null);
  const [startAt, setStartAt] = useState<number>(0);
  const [episodeHistories, setEpisodeHistories] = useState<Map<number, number>>(new Map());
  const modalRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const lastSavedRef = useRef<number>(0);
  const SAVE_INTERVAL = 15;
  const { id } = useParams();
  const { ratings, avgStars, addRating, loading: loadingRatings } = useRatings(Number(id));

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Fecha modal ao clicar fora ou esc
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseEpisodeModal();
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleCloseEpisodeModal();
    };
    if (selectedEpisode || showTrailer) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [selectedEpisode, showTrailer]);

  // Carrega série, episódios e favoritos
  useEffect(() => {
    const fetchSerie = async () => setSerie(await getSerieById(Number(id)));
    const fetchEpisodes = async () => setEpisodes(await getEpisodesBySerieId(Number(id)));
    const fetchFavorites = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) return;
      const count = await countFavoritesBySerieId(Number(id), user.id);
      setIsFavorite(count > 0);
    };
    fetchSerie();
    fetchEpisodes();
    fetchFavorites();
  }, [id]);

  // Carrega históricos da série inteira
  useEffect(() => {
    const fetchHistories = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.id) return;
      const map = new Map<number, number>();

      await Promise.all(
        episodes.map(async (ep) => {
          try {
            const history = await getHistory(user.id, ep.id);
            if (history && history.pausedAt > 0) {
              map.set(ep.id, history.pausedAt);
            }
          } catch (err) {
            console.error('Erro ao buscar histórico do episódio', ep.id, err);
          }
        }),
      );

      setEpisodeHistories(map);
    };

    if (episodes.length > 0) fetchHistories();
  }, [episodes]);

  // Atualiza startAt ao selecionar episódio
  useEffect(() => {
    if (!selectedEpisode) return;
    const pausedAt = episodeHistories.get(selectedEpisode.id) || 0;
    setStartAt(pausedAt);
    lastSavedRef.current = pausedAt;
  }, [selectedEpisode, episodeHistories]);

  // Salva progresso ao sair da página
  useEffect(() => {
    const handler = async () => {
      try {
        if (playerRef.current?.getCurrentTime && selectedEpisode) {
          const t = Math.floor(playerRef.current.getCurrentTime() || 0);
          await saveProgress(t);
        }
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [selectedEpisode]);

  const toggleFavorite = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) return;
    if (isFavorite) {
      await removeSerieFromFavorites(Number(id), user.id);
      setIsFavorite(false);
    } else {
      await addSerieToFavorites(Number(id), user.id);
      setIsFavorite(true);
    }
  };

  const saveProgress = async (seconds: number) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id || !selectedEpisode) return;
    try {
      await saveHistory({
        idUser: user.id,
        idEpisode: selectedEpisode.id,
        pausedAt: seconds,
      });
      lastSavedRef.current = seconds;
      setEpisodeHistories((prev) => new Map(prev).set(selectedEpisode.id, seconds));
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    if (!selectedEpisode) return;
    const curr = Math.floor(state.playedSeconds);
    if (curr - lastSavedRef.current >= SAVE_INTERVAL) saveProgress(curr);
  };

  const handleCloseEpisodeModal = async () => {
    if (!selectedEpisode) {
      setShowTrailer(false);
      return;
    }
    try {
      let curr = lastSavedRef.current;
      if (playerRef.current?.getCurrentTime) {
        curr = Math.floor(playerRef.current.getCurrentTime() || 0);
      }
      await saveProgress(curr);
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    } finally {
      setSelectedEpisode(null);
      setShowTrailer(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-black text-white">
        {/* Banner */}
        <div className="relative h-[300px] md:h-[450px] lg:h-[600px] overflow-hidden">
          <img
            src={serie?.bigImage}
            alt={serie?.name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end px-6 py-10">
            <div className="max-w-5xl mx-auto space-y-4">
              {/* Nome, ano e categoria */}
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
                  {serie?.name}
                </h1>
                <div className="flex items-center gap-3 text-gray-300 drop-shadow">
                  <span className="text-lg md:text-xl font-medium">{serie?.year}</span>
                  {serie?.categoryName && (
                    <span className="px-3 py-1 text-xs md:text-sm bg-white/10 border border-white/20 rounded-full text-gray-200">
                      {serie.categoryName}
                    </span>
                  )}
                </div>
                {/* Média de estrelas */}
                <div className="mt-4 fle items-center gap-2">
                  <span className="text-yellow-400 font-bold text-lg">
                    ⭐ {avgStars.toFixed(1)} / 5
                  </span>
                  <span className="tetx-gray-400 text-sm ml-1">({ratings.length} avaliações)</span>
                </div>
              </div>

              {/* Sinopse */}
              {serie?.plot && (
                <p className="text-sm md:text-base text-gray-200 leading-relaxed line-clamp-3 md:line-clamp-5">
                  {serie.plot}
                </p>
              )}

              {/* Botões */}
              <div className="flex mt-4 sm:justify-start justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full">
                  <button
                    onClick={toggleFavorite}
                    className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition duration-300"
                  >
                    {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                  </button>
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="w-full cursor-pointer sm:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition duration-300"
                  >
                    Assistir vídeo de abertura
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Episódios */}
        <div className="px-4 md:px-10 py-10 bg-gradient-to-t from-black via-gray-900 to-black max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6">Lista de Episódios</h3>
          {episodes.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-2xl shadow-md"
              >
                <AlertTriangle className="w-5 h-5 text-yellow-400 animate-pulse" />
                Essa série não possui episódios ainda
              </motion.span>
            </div>
          ) : (
            <Slider {...sliderSettings}>
              {episodes.map((episode) => {
                const pausedAt = episodeHistories.get(episode.id) || 0;
                const hasProgress = pausedAt > 0;

                return (
                  <div
                    key={episode.id}
                    className="px-2 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
                    onClick={() => setSelectedEpisode(episode)}
                  >
                    <div className="w-full h-[190px] bg-black flex flex-col items-center justify-center relative">
                      <p className="text-white font-bold">
                        {hasProgress ? '▶ Continuar Episódio' : '▶ Assistir Episódio'}
                      </p>
                      {hasProgress && (
                        <span className="mt-2 text-xs text-gray-300">
                          Última vez em {formatTime(pausedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </Slider>
          )}
        </div>

        {/* Avaliações */}
        <div className="px-4 md:px-10 py-10 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Avaliações</h2>

          <RatingStars
            onChange={(stars) =>
              addRating({ stars, idSerie: Number(serie?.id), idUser: user?.id, comment: '' })
            }
          />
        </div>
        <div className="px-4 md:px-10 py-10  max-w-6xl mx-auto">
          <div className="mt-6">
            <h2 className="text-xl font-bold">Comentários</h2>
            <CommentBox serieId={Number(serie?.id)} userId={user?.id} onSubmit={addRating} />
            {loadingRatings ? (
              <p className="text-gray-400 text-sm">Carregando comentários...</p> // Exibir um indicador de carregamento enquanto os comentários estiverem sendo carregados</p>
            ) : (
              <CommentsList comments={ratings} />
            )}
          </div>
        </div>
      </div>

      {/* Modal de vídeo */}
      <AnimatePresence>
        {(selectedEpisode || showTrailer) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="relative w-full max-w-4xl aspect-video"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-2 text-white bg-black/60 hover:bg-black/80 p-2 rounded-full z-10"
                onClick={handleCloseEpisodeModal}
              >
                ✕
              </button>
              <ReactPlayer
                ref={playerRef}
                url={showTrailer ? serie?.opening_video : selectedEpisode?.link}
                width="100%"
                height="100%"
                controls
                playing
                onProgress={handleProgress}
                progressInterval={1000}
                config={{
                  youtube: {
                    playerVars: { modestbranding: 1, rel: 0 },
                  },
                  file: {
                    attributes: {
                      controlsList: 'nodownload',
                      style: { borderRadius: '12px', backgroundColor: 'black' },
                    },
                  },
                }}
                onReady={() => {
                  if (!showTrailer && startAt > 0 && playerRef.current?.seekTo) {
                    playerRef.current.seekTo(startAt, 'seconds');
                  }
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default SerieDetail;
