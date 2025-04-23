import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
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

const SerieDetail: React.FC = () => {
  const [serie, setSerie] = useState<SerieResponse>();
  const [episodes, setEpisodes] = useState<EpisodeResponse[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeResponse | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();

  // Fecha o modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowTrailer(false);
        setSelectedEpisode(null);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowTrailer(false);
        setSelectedEpisode(null);
      }
    };

    if (showTrailer || selectedEpisode) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTrailer, selectedEpisode]);

  useEffect(() => {
    const fetchSerie = async () => {
      const response = await getSerieById(Number(id));
      setSerie(response);
    };

    const fetchEpisodes = async () => {
      const response = await getEpisodesBySerieId(Number(id));
      setEpisodes(response);
    };

    const fetchCount = async () => {
      const user = JSON.parse((await localStorage.getItem('user')) || '{}');

      const count = await countFavoritesBySerieId(Number(id), user.id);

      setIsFavorite(count > 0);
    };

    fetchSerie();
    fetchEpisodes();
    fetchCount();
  }, [id]);

  const toggle = async () => {
    const user = JSON.parse((await localStorage.getItem('user')) || '{}');
    if (isFavorite) {
      await removeSerieFromFavorites(Number(id), user.id);

      setIsFavorite(false);
    } else {
      console.log(id, user.id);
      await addSerieToFavorites(Number(id), user.id);
      setIsFavorite(true);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="w-full bg-black text-white">
        {/* Banner com sombra e título */}
        <div className="relative h-[300px] md:h-[450px] lg:h-[600px] overflow-hidden">
          <img
            src={serie?.bigImage}
            alt={serie?.name}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end px-6 py-10">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
                {serie?.name}
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold drop-shadow">{serie?.year}</h2>
              <div className="flex mt-4 sm:justify-between justify-center">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-6 w-full mt-4">
                  <button
                    onClick={toggle}
                    className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                  </button>
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                  >
                    Assistir vídeo de abertura
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center"></div>

        {/* Modal com animação + clique fora */}
        <AnimatePresence>
          {showTrailer && (
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
                  onClick={() => setShowTrailer(false)}
                >
                  ✕
                </button>
                <ReactPlayer
                  url={serie?.opening_video}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plot / Sinopse */}
        <div className="px-4 md:px-10 py-6 max-w-5xl mx-auto">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed">{serie?.plot}</p>
        </div>

        {/* Informações adicionais */}
        <div className="px-4 md:px-10 py-8 flex flex-col md:flex-row items-center md:items-start gap-6 max-w-5xl mx-auto">
          <img
            src={serie?.image}
            alt="Serie"
            className="w-48 md:w-64 rounded-xl shadow-2xl object-cover"
          />
          <div className="flex flex-col gap-3 text-gray-100 text-base md:text-lg">
            <strong className="text-white">Nome Completo: {serie?.name}</strong>
            <strong className="text-white">Categoria: {serie?.categoryName}</strong>
            <strong className="text-white">Ano: {serie?.year}</strong>
          </div>
        </div>

        {/* Slider de episódios */}
        <div className="px-4 md:px-10 py-10 bg-gradient-to-t from-black via-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6">Lista de Episódios</h3>
            <Slider {...settings}>
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className="px-2 rounde-lg overflow-hidden shadow-lg"
                  onClick={() => setSelectedEpisode(episode)}
                >
                  <ReactPlayer
                    url={episode.link}
                    width="100%"
                    height="190px"
                    light
                    controls={false}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Modal do Episódio */}
      <AnimatePresence>
        {selectedEpisode && (
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
                onClick={() => setSelectedEpisode(null)}
              >
                ✕
              </button>
              <ReactPlayer url={selectedEpisode.link} width="100%" height="100%" controls playing />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default SerieDetail;
