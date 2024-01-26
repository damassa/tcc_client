import React, { useState } from 'react';
import './style.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SerieCard from '../SerieCard';

const Carousel = () => {
    const [scrollX, setScrollX] = useState(-400);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listWidth = 16 * 150;
        if ((window.innerWidth - listWidth) > x) {
            x = (window.innerWidth - listWidth) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className='serieCarousel'>
            <h2>Lançamentos</h2>
            <div className='serieCarousel--arrowLeft' onClick={handleLeftArrow}>
                <FaAngleLeft style={{fontSize: 50, color: '#f6f6f6'}} />
            </div>
            <div className='serieCarousel--arrowRight' onClick={handleRightArrow}>
                <FaAngleRight style={{fontSize: 50, color: '#f6f6f6'}} />
            </div>
            <div className='serieCarousel--listarea'>
                <div className='serieCarousel--list' style={{
                    marginLeft: scrollX
                }}>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                    <Link to="/detail">
                        <SerieCard />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Carousel;