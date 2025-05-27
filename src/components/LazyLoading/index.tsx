import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import { SerieResponse } from '../../types/serie';
import { SerieContext } from '../../context/SerieProvider';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Props = {
  allSeries: SerieResponse[];
  perPage?: number;
};

const LazySerieList: React.FC<Props> = ({ allSeries, perPage = 12 }) => {
  const [visibleSeries, setVisibleSeries] = useState<SerieResponse[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { seriesSearch } = useContext<any>(SerieContext);

  const seriesToRender = seriesSearch.length > 0 ? seriesSearch : visibleSeries;

  // Paginar os dados
  useEffect(() => {
    const start = 0;
    const end = perPage * page;
    setVisibleSeries(allSeries.slice(start, end));
  }, [page, allSeries, perPage]);

  // Detectar quando o usuário chega no final da lista
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && visibleSeries.length < allSeries.length) {
        setPage((prev) => prev + 1);
      }
    },
    [visibleSeries.length, allSeries.length],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
    });

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [handleObserver]);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6">
        {seriesToRender.map((serie, index) => (
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

      {/* Sentinel para lazy loading */}
      <div ref={observerRef} className="h-10 mt-10" />
    </>
  );
};

export default LazySerieList;
