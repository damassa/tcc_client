import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingStarsProps {
  onChange: (stars: number) => void;
}

export default function RatingStars({ onChange }: RatingStarsProps) {
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState(0);

  return (
    <div className="flex gap-1 mb-2">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        return (
          <FaStar
            key={i}
            size={20}
            className={
              starValue <= (hover ?? rating)
                ? 'text-yellow-400 cursor-pointer'
                : 'text-gray-600 cursor-pointer'
            }
            onClick={() => {
              setRating(starValue);
              onChange(starValue);
            }}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
    </div>
  );
}
