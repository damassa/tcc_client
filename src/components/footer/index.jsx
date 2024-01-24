import React from 'react';
import { FaInstagram, FaGithubSquare, FaLinkedin } from 'react-icons/fa';
import MyAccountButton from '../MyAccountButton';

import './style.css';

const Footer = () => {
  return (
    <footer>
        <div className='footer--left'>
            Assista suas séries favoritas. <br />
            <span>World of Tokusatsu. All rights reserved.</span>
        </div>
        <div className='footer--right'>
            <MyAccountButton />
            <div className='footer--social'>
                <a href="http://instagram.com/damassaa" target='_blank' rel="noreferrer">
                    <FaInstagram />
                </a>
                <a href="http://github.com/damassa" target='_blank' rel="noreferrer">
                    <FaGithubSquare />
                </a>
                <a href="http://linkedin.com/damassa" target='_blank' rel="noreferrer">
                    <FaLinkedin />
                </a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;