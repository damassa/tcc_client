import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { SerieResponse } from '../../types/serie';
import { getSeriesOrderedByYear } from '../../api/SerieApi';
import { motion } from 'framer-motion'; // 👉 Importação aqui

const Carousel: React.FC = () => {
  const [series, setSeries] = React.useState<SerieResponse[]>([]);
  // const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchSeriesByYear = async () => {
      try {
        const arr = await getSeriesOrderedByYear();
        if (arr.length) {
          setSeries(arr);
        }
      } catch (error) {
        console.error('Failed to fetch series', error);
      }
    };

    fetchSeriesByYear();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
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
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {series.map((serie, index) => (
        <motion.div
          key={serie.id}
          className="w-36 sm:w-40 md:w-44 lg:w-48 gap-6 rounded-lg border border-zinc-700 shadow-md"
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileInView={{ opacity: 1, y: 0 }}
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
      ))}
    </Slider>
  );
};

export default Carousel;
