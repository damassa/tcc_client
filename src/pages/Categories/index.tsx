import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CategoryResponse } from '../../types/category';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';
import { getCategories, getSeriesByCategory } from '../../api/CategoryApi';
import { motion } from 'framer-motion';
import { SerieResponse } from '../../types/serie';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoryWithSeries, setCategoryWithSeries] = useState<{ [key: number]: SerieResponse[] }>(
    {},
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const arr = await getCategories();
        if (arr.length) {
          setCategories(arr);
        }
      } catch (error) {
        console.error('Failed to fetch categories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categories.length) return;

    const fetchSeriesFromCategory = async () => {
      const data: { [key: number]: SerieResponse[] } = {};
      await Promise.all(
        categories.map(async (category) => {
          const series = await getSeriesByCategory(category.id);
          data[category.id] = series;
        }),
      );
      setCategoryWithSeries(data);
    };
    fetchSeriesFromCategory();
  }, [categories]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full px-10 py-10 text-white">
        <div className="flex items-center justify-center px-4 py-8">
          <div className="flex-grow h-px bg-purple opacity-50" />
          <h1 className="text-2xl font-bold text-white">Categorias</h1>
          <div className="flex-grow h-px bg-purple opacity-50" />
        </div>
        <div className="justify-center">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-wrap align-content-center justify-center gap-6"
            >
              <h1 className="mt-10 text-2xl w-full font-bold text-white">{category.name}</h1>
              {categoryWithSeries[category.id] &&
                categoryWithSeries[category.id].map((serie: SerieResponse, index: number) => (
                  <motion.div
                    key={serie.id}
                    className="w-36 sm:w-40 md:w-44 lg:w-48 gap-6 rounded-lg border border-zinc-700 shadow-md"
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileInView={{ opacity: 1, y: 0 }}
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Categories;
