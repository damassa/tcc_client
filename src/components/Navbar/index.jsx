import React from 'react';

import './style.css';

const Navbar = ({ purple }) => {
  return (
    <header className={purple ? 'purple' : ''}>
        <div className='header--logo'>
            <a href="/">World of Tokusatsu</a>
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