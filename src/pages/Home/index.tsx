import './style.css';
import imageBanner from '../../assets/images/imageBanner.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Carousel from '../../components/Carousel';
import LoadMoreButton from '../../components/LoadMoreButton';
import Loading from '../../components/Loading';

import React, { useEffect, useState } from 'react';
import { SerieResponse } from '../../types/serie';
import { getAllSeries } from '../../api/SerieApi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // 👉 Importação aqui
import { SerieContext } from '../../context/SerieProvider';

const Home: React.FC = () => {
  const [series, setSeries] = useState<SerieResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const { seriesSearch } = React.useContext<any>(SerieContext);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const arr = await getAllSeries();
        if (arr.length) {
          setSeries(arr);
        }
      } catch (error) {
        console.error('Failed to fetch series', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 text-white min-h-screen">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 px-4 md:px-12 py-12 bg-black">
          {/* Texto */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              Assista todas as suas séries favoritas de{' '}
              <span className="text-purple-500">Tokusatsu</span> no conforto de sua casa.
            </h1>
            <p className="text-lg md:text-xl text-gray-300">
              Ação, nostalgia e heróis lendários direto da sua tela.
            </p>
          </div>

          {/* Imagem */}
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

        <h3 className="text-2xl font-bold mt-10 mb-4">Séries Populares</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {seriesSearch.length <= 0
            ? series.map((serie, index) => (
                <motion.div
                  key={serie.id}
                  className="w-36 sm:w-40 md:w-44 lg:w-48 gap-6 rounded-lg border border-zinc-700 shadow-md"
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true, amount: 0.2 }} // Revele o card ao rolar para ele (em 20% da altura)
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
              ))
            : seriesSearch.map((serieSearch, index) => (
                <motion.div
                  key={serieSearch.id}
                  className="w-36 sm:w-40 md:w-44 lg:w-48 gap-6 rounded-lg border border-zinc-700 shadow-md"
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  viewport={{ once: true, amount: 0.2 }} // Revele o card ao rolar para ele (em 20% da altura)
                >
                  <Link to={`/detail/${serieSearch.id}`}>
                    <img
                      className="w-full h-48 object-cover rounded-t-lg shadow-md transition-shadow"
                      src={serieSearch.image}
                      alt={serieSearch.name}
                      title={serieSearch.name}
                    />
                  </Link>
                  <div className="mt-2 text-center px-2 pb-3">
                    <h2 className="text-sm font-semibold truncate">{serieSearch.name}</h2>
                    <p className="text-xs text-gray-400">{serieSearch.year}</p>
                  </div>
                </motion.div>
              ))}
        </div>

        <div className="flex justify-center my-6">
          <LoadMoreButton />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
