import React, { useState } from 'react';
import './style.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import EpisodeThumb from '../../assets/episode_thumb.jpg';

const EpisodeCarousel = () => {
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
        <div className='episodeCarousel'>
            <div className='episodeCarousel--arrowLeft' onClick={handleLeftArrow}>
                <FaAngleLeft style={{fontSize: 50, color: '#f6f6f6'}} />
            </div>
            <div className='episodeCarousel--arrowRight' onClick={handleRightArrow}>
                <FaAngleRight style={{fontSize: 50, color: '#f6f6f6'}} />
            </div>
            <div className='episodeCarousel--listarea'>
                <div className='episodeCarousel--list' style={{
                    marginLeft: scrollX
                }}>
                    <div className='episodeCarousel--item'>
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                        <img src={EpisodeThumb} alt="episode" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EpisodeCarousel;