import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const NoFavorites = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <style>
          {`
            @keyframes sadWiggle {
              0%, 100% { transform: rotate(0deg); }
              25% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
              75% { transform: rotate(-2deg); }
            }

            .tear {
              animation: tearDrop 2s infinite ease-in-out;
            }

            .tear:nth-of-type(2) {
              animation-delay: 1s;
            }

            @keyframes tearDrop {
              0% { opacity: 0; transform: translateY(0); }
              10% { opacity: 1; }
              100% { opacity: 0; transform: translateY(12px); }
            }
          `}
        </style>

        {/* SVG da pipoca triste com plaquinha */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 70"
          className="w-28 h-28 mb-4 text-yellow-400 animate-[sadWiggle_1.8s_ease-in-out_infinite]"
          fill="none"
        >
          {/* Plaquinha */}
          <rect
            x="12"
            y="0"
            width="40"
            height="14"
            rx="2"
            fill="#FDE68A"
            stroke="#92400E"
            strokeWidth="1.5"
          />
          <text
            x="32"
            y="10"
            fontSize="6"
            textAnchor="middle"
            fill="#78350F"
            fontFamily="sans-serif"
          >
            sem séries 😢
          </text>

          {/* Haste da placa */}
          <rect x="31" y="14" width="2" height="10" fill="#92400E" />

          {/* Corpo da pipoca */}
          <rect
            x="20"
            y="26"
            width="24"
            height="30"
            rx="3"
            fill="#FACC15"
            stroke="#D97706"
            strokeWidth="2"
          />
          <path
            d="M22 26L24 14L28 26H36L40 14L42 26"
            fill="#FCD34D"
            stroke="#D97706"
            strokeWidth="2"
          />

          {/* Olhos */}
          <circle cx="26" cy="37" r="2" fill="#000" />
          <circle cx="38" cy="37" r="2" fill="#000" />

          {/* Boca triste */}
          <path d="M26 45c2 2 6 2 8 0" stroke="#000" strokeWidth="2" strokeLinecap="round" />

          {/* Lágrimas */}
          <circle cx="24.5" cy="40" r="1" fill="#60A5FA" className="tear" />
          <circle cx="40.5" cy="40" r="1" fill="#60A5FA" className="tear" />
        </svg>

        {/* Texto e botão */}
        <h2 className="text-2xl font-bold text-gray-400">Nenhuma série favorita</h2>
        <p className="text-lg text-gray-400 mt-2">
          Você ainda não adicionou nenhuma série aos seus favoritos.
        </p>

        <Link to="/">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer">
            Ir para o feed de séries
          </button>
        </Link>

        <Link to="/categories">
          <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 cursor-pointer">
            Ir para categorias
          </button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default NoFavorites;
