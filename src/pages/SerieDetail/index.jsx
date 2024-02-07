import React from 'react';
import './style.css';
import PosterImage from '../../assets/Changeman.png';
import AddFavoriteButton from '../../components/AddFavoriteButton';
import { FaShareAlt } from 'react-icons/fa';

const SerieDetail = () => {
    return (
        <section className='detail--container'>
            <div className="detail--banner">
                <div className="detail--image--container">
                    <img src={PosterImage} alt="" />
                </div>
                <div className="detail--shadow--container">
                    <div className="detail--name--year">
                        <h1>Dengeki Sentai Changeman</h1>
                        <h2>1985</h2>
                    </div>
                    <div className="detail--fav--share">
                        <AddFavoriteButton />
                        <FaShareAlt size={20} />
                    </div>
                </div>
                <div className="detail--plot">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed dignissim mi, ac tincidunt risus. Donec nec arcu erat. Vestibulum nec felis rhoncus eros laoreet pretium in a massa. Sed pharetra ligula vitae nisi dictum, vel sodales sapien semper. 
                        Fusce imperdiet, sapien ac posuere consectetur, ante mauris ornare risus, in porttitor mi lacus a nisi. Mauris rhoncus iaculis placerat. 
                        Nullam turpis arcu, malesuada vitae est at, vestibulum faucibus arcu. Ut nec odio ultricies, viverra ligula ut, hendrerit mauris. Ut semper, mi ut efficitur auctor, sem eros tempor lacus, vel facilisis elit velit vulputate arcu.
                    </p>
                </div>
                <div className="detail--info">
                    <div className="detail--info--image">
                        <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="Serie" />
                    </div>
                    <div className="detail--data">
                        <strong>Nome Completo: Dengeki Sentai Changeman</strong>
                        <strong>Categoria: Super Sentai</strong>
                        <strong>Ano: 1985</strong>
                        <strong>Duração: 20 minutos</strong>
                    </div>
                </div>
                <div className="detail--episode--list">
                    LISTA DE EPISÓDIOS
                </div>
            </div>
        </section>
    )
}

export default SerieDetail;