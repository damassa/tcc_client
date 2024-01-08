import React, {useEffect, useState} from 'react';
import {FaSearch, FaBell, FaGift, FaCaretDown} from 'react-icons/fa';

import {Container, RoutesMenu, Profile} from './styles';


const Navbar = () => {
    const [isBlack, setIsBlack] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => setIsBlack(window.scrollY > 10));

        return () => {
            window.removeEventListener('scroll', () => setIsBlack(window.scrollY > 10),);
        };
    }, []);

  return (
    <Container isBlack={isBlack}>
        <RoutesMenu>
            <p>LOGO</p>
            <ul>
                <li style={{fontWeight: 'bold'}}>Início</li>
                <li>Blablabla</li>
                <li>ADADADA</li>
                <li>HAHA</li>
                <li>Cocozão</li>
            </ul>
        </RoutesMenu>
        <Profile>
            <FaSearch />
            <FaGift />
            <FaBell />
            <button type="button">
                <FaCaretDown />
            </button>
        </Profile>
    </Container>
  );
}

export default Navbar;