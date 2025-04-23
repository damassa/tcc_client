import React from 'react';
import Logo from '../../assets/images/logo.png';

import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-purple shadow-sm">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
            <img className="h-15 me-3" src={Logo} alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              World of Tokusatsu
            </span>
          </Link>
          <ul className="flex flex-wrap items-center sm:items-center mb-6 text-sm font-medium text-white sm:mb-0">
            <li>
              <Link to="/" className="text-center hover:underline me-4 md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-center hover:underline me-4 md:me-6" to="/categories">
                Categorias
              </Link>
            </li>
            <li>
              <Link className="text-center hover:underline me-4 md:me-6" to="/favorites">
                Favoritos
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-white sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-white text-center sm:text-center">
          © 2025{' '}
          <Link to="/" className="hover:underline">
            World of Tokusatsu™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
