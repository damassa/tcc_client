import React from 'react';
import './style.css';

import imageBanner from '../../assets/undraw_horror_movie_3988.svg';
// import loadingGIF from '../../assets/loading.gif';

import SerieCard from '../../components/SerieCard';

const Home = () => {
    return (
        <>
            <div className="banner">
                <div className="banner--left">
                    <p>Assista todas as suas séries favoritas de Tokusatsu no conforto de sua casa.</p>
                </div>
                <div className="banner--right">
                    <img src={imageBanner} alt="sdfsdfsd" />
                </div>
            </div>
            <div className="cards">
                <SerieCard />
                <SerieCard />
                <SerieCard />
                <SerieCard />
                <SerieCard />
            </div>
            {/* <div className="loading">
                <img src={loadingGIF} alt="Carregando" />
            </div> */}
        </>
    );
}

export default Home;