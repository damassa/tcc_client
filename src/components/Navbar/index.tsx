import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { FaBars, FaSearch } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import AccountModal from '../AccountModal';
import { SerieContext } from '../../context/SerieProvider';
import { getSeriesByName } from '../../api/SerieApi';
import { getHistory } from '../../api/HistoryApi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [filteredSerie, setFilteredSerie] = useState('');
  const [userHistory, setUserHistory] = useState<number | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { setSeriesSearch } = useContext<any>(SerieContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY >= 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (filteredSerie.trim() === '') {
      setSeriesSearch([]);
      return;
    }
    handleSearch();
  }, [filteredSerie]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;
      try {
        const history = await getHistory(user.id, 1);
        if (history) setUserHistory(history.pausedAt);
      } catch (err) {
        console.error('Erro ao buscar histórico:', err);
      }
    };
    fetchHistory();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSearch = async () => {
    try {
      const arr = await getSeriesByName(filteredSerie);
      setSeriesSearch(arr.length ? arr : []);
    } catch (error) {
      console.error('Falha ao buscar séries:', error);
    }
  };

  const handleInitials = () => {
    if (!user?.name) return '';
    const parts = user.name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <nav
      className={`sticky top-0 z-10 w-full backdrop-blur-md transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-purple shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-6">
        {/* Logo + menu desktop */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center justify-center">
            <img src={Logo} alt="Logo" className="h-10 md:h-12" />
          </Link>
          <ul className="hidden md:flex items-center space-x-6">
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

        {/* Pesquisa centralizada com expansão */}
        <div className="hidden md:flex flex-1 justify-center">
          <div
            className={`relative transition-all duration-500 ease-in-out ${
              isSearchFocused ? 'w-full max-w-2xl' : 'w-full max-w-md'
            }`}
          >
            <input
              type="search"
              placeholder="O que você está buscando?"
              className="bg-transparent border border-gray-500 text-white rounded-sm w-full h-9 py-1 px-3 pl-10 text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-purple-800 transition-all duration-300"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onChange={(e) => setFilteredSerie(e.target.value)}
            />
            <button
              onClick={handleSearch}
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-800 transition"
            >
              <FiSend className="w-3 h-3" />
            </button>
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm pointer-events-none" />
          </div>
        </div>

        {/* Usuário / mobile */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-green-400 hover:bg-green-800 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {handleInitials()}
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 rounded-md shadow-md bg-purple-950 animate-fade-in">
                  <div className="px-4 pb-2 border-b border-gray-700">
                    <strong className="text-white text-sm">{user.name}</strong>
                    <h5 className="text-white text-xs truncate max-w-[180px]" title={user.email}>
                      {user.email}
                    </h5>
                    {userHistory !== null && (
                      <p className="text-gray-300 text-xs">Último pause: {userHistory}s</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setIsAccountModalOpen(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:text-purple-400 cursor-pointer"
                  >
                    Minha conta
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-white hover:text-purple-400 cursor-pointer"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menu mobile"
            >
              <FaBars className="text-white text-xl" />
            </button>
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
            type="search"
            placeholder="O que você está buscando?"
            className="bg-transparent border border-white text-white rounded-sm w-full h-9 py-1 px-3 pl-10 text-sm placeholder:text-white focus:outline-none focus:ring-2 focus:ring-purple-800"
            onChange={(e) => setFilteredSerie(e.target.value)}
          />
          <button
            onClick={handleSearch}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
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

        {user && (
          <div className="border-t border-gray-700 mt-3 pt-3">
            <div className="mb-2">
              <strong className="text-white block">{user.name}</strong>
              <h5 className="text-sm text-white">{user.email}</h5>
            </div>
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="block w-full text-left px-0 py-2 text-white hover:text-purple-400"
            >
              Minha conta
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-0 py-2 text-white hover:text-red-400"
            >
              Sair
            </button>
          </div>
        )}
      </div>

      <AccountModal isOpen={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
