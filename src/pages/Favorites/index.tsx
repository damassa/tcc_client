import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/LoadMoreButton';
import Footer from '../../components/Footer';
import { SerieResponse } from '../../types/serie';
import { getFavoriteSeries } from '../../api/SerieApi';
import { motion } from 'framer-motion';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import NoFavorites from '../NoFavorites';

const Favorites: React.FC = () => {
  const [series, setSeries] = useState<SerieResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavoriteSeries();
        setSeries(favorites);
      } catch (error) {
        console.error('Erro ao trazer séries', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!series.length) {
    return <NoFavorites />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-10 py-10 text-white">
        <div className="flex items-center justify-center px-4 py-8">
          <div className="flex-grow h-px bg-purple opacity-50" />
          <h1 className="text-2xl font-bold text-white">Minha Lista de Favoritos</h1>
          <div className="flex-grow h-px bg-purple opacity-50" />
        </div>
        <div className="flex flex-wrap align-content-center justify-center gap-6">
          {series.map((serie, index) => (
            <motion.div
              key={serie.id}
              className="w-36 sm:w-40 md:w-44 lg:w-48 gap-6 rounded-lg border border-zinc-700 shadow-md"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
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
        <div className="flex justify-center my-6">
          <Button />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favorites;
