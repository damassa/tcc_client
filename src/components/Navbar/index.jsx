import React from 'react';

import './style.css';

const Navbar = ({ purple }) => {
  return (
    <header className={purple ? 'purple' : ''}>
        <div className='header--logo'>
            <a href="/">World of Tokusatsu</a>
        </div>
        <div>
          <input type="text" className='standardInput' placeholder='Pesquise aqui...' />
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