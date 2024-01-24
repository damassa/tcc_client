import React, { useState } from 'react';
import './style.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SerieCard = () => {
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
        <div className='serieCard'>
            <h2>Lançamentos</h2>
            <div className='serieCard--arrowLeft' onClick={handleLeftArrow}>
                <FaAngleLeft style={{fontSize: 50, color: '#f6f6f6'}} />
            </div>
            <div className='serieCard--arrowRight' onClick={handleRightArrow}>
                <FaAngleRight style={{fontSize: 50, color: '#f6f6f6'}} />
            </div>
            <div className='serieCard--listarea'>
                <div className='serieCard--list' style={{
                    marginLeft: scrollX
                }}>
                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>

                    <Link to="/detail">
                        <div className='serieCard--item'>
                            <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SerieCard;