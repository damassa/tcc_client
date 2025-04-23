import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { FaBars, FaSearch } from 'react-icons/fa';
import { getSeriesByName } from '../../api/SerieApi';
import { SerieContext } from '../../context/SerieProvider';
import { FiSend } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [filteredSerie, setFilteredSerie] = useState('');

  const { setSeriesSearch } = React.useContext<any>(SerieContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (filteredSerie.trim() === '') {
      setSeriesSearch([]);
    }
    handleSearch();
  }, [filteredSerie]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  const handleSearch = async () => {
    try {
      if (filteredSerie !== '') {
        const arr = await getSeriesByName(filteredSerie);
        if (arr.length) {
          setSeriesSearch(arr);
        }
      } else {
        setSeriesSearch([]);
      }
    } catch (error) {
      console.error('Failed to fetch series', error);
    }
  };

  const toggleUserMenu = () => setIsOpen(!isOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav
      className={`sticky top-0 z-10 w-full backdrop-blur-md transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-purple shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex justify-center">
        <div className="flex-1 px-6 flex flex-wrap items-center justify-between">
          {/* Logo e menu desktop */}
          <div className="flex gap-8 items-center">
            <Link to="/" className="flex items-center justify-center w-full md:w-auto">
              <img src={Logo} alt="Logo" className="h-10 md:h-12" />
            </Link>

            <ul className="hidden md:flex items-center space-x-8">
              <li>
                <Link to="/" className="text-white hover:text-purple-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-white hover:text-purple-400">
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-white hover:text-purple-400">
                  Favoritos
                </Link>
              </li>
            </ul>
          </div>

          {/* Área de busca, usuário e mobile menu */}
          <div className="flex justify-between items-center gap-4">
            {/* Busca Desktop */}
            <div className="relative w-full max-w-xl hidden md:block">
              <input
                onChange={(e) => setFilteredSerie(e.target.value)}
                type="search"
                name="search"
                placeholder="O que você procura?"
                className="bg-transparent border border-white text-white rounded-sm w-100 h-9 py-1 px-3 pl-10 text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-purple-800"
              />

              <button
                onClick={handleSearch}
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 sm:p-2.5 rounded-full hover:bg-blue-600 transition"
              >
                <FiSend className="w-2 h-2 sm:w-2 sm:h-2" />
              </button>

              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm pointer-events-none" />
            </div>

            {/* Menu do usuário desktop */}
            <div className="relative w-full hidden md:block">
              <button
                onClick={toggleUserMenu}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-400 hover:bg-green-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-label="Abrir menu do usuário"
              >
                A
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 rounded-md shadow-md bg-gray-950 animate-fade-in">
                  <div className="px-4 pb-2 border-b border-gray-700">
                    <strong className="text-white">Administrador</strong>
                    <h5 className="text-sm text-white">fdfreekazoid@gmail.com</h5>
                  </div>
                  <button className="block w-full text-left px-4 py-2 text-white hover:text-purple-400">
                    Minha conta
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:text-red-400"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>

            {/* Botão do menu mobile */}
            <div className="md:hidden">
              <button onClick={toggleMobileMenu} aria-label="Abrir menu mobile">
                <FaBars className="text-white text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`md:hidden bg-purple-900 shadow-md transition-all duration-300 ease-in-out origin-top transform ${
          isMobileMenuOpen
            ? 'scale-y-100 opacity-100 max-h-[600px] p-4'
            : 'scale-y-0 opacity-0 max-h-0 p-0'
        } overflow-hidden`}
      >
        <div className="relative w-full max-w-xl sm:block">
          <input
            onChange={(e) => setFilteredSerie(e.target.value)}
            type="search"
            name="search"
            placeholder="O que você procura?"
            className="bg-transparent border border-white text-white rounded-sm w-100 h-9 py-1 px-3 pl-10 text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-purple-800"
          />

          <button
            onClick={handleSearch}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 text-white p-2 sm:p-2.5 rounded-full hover:bg-blue-600 transition"
          >
            <FiSend className="w-2 h-2 sm:w-2 sm:h-2" />
          </button>

          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm pointer-events-none" />
        </div>
        <Link to="/" className="block text-white hover:text-purple-400 py-1">
          Home
        </Link>
        <Link to="/categories" className="block text-white hover:text-purple-400 py-1">
          Categorias
        </Link>
        <Link to="/favorites" className="block text-white hover:text-purple-400 py-1">
          Favoritos
        </Link>

        <div className="border-t border-gray-700 mt-3 pt-3">
          <div className="mb-2">
            <strong className="text-white block">Administrador</strong>
            <h5 className="text-sm text-white">fdfreekazoid@gmail.com</h5>
          </div>
          <button className="block w-full text-left px-0 py-2 text-white hover:text-purple-400">
            Minha conta
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-0 py-2 text-white hover:text-red-400"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
