import React from 'react';
import './style.css';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ purple }) => {
  return (
    <header className={purple ? 'purple' : ''}>
        <div className='header--logo'>
            <a href="/">World of Tokusatsu</a>
        </div>
        <div className="header--search">
          <input type="text" className='search--input' placeholder='O que está procurando?' />
          <button className="search--button">
            <FaSearch />
          </button>
        </div>
        <a href="/edit">
          <div className='header--user'>
            FD
          </div>
        </a>
    </header>
  );
}

export default Navbar;