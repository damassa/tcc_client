import React from 'react';
import './style.css';

const SerieDetail = () => {
    return (
        <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: 'url(https://2.bp.blogspot.com/-t41qy90LFVI/VdPSGUUlKTI/AAAAAAAAL6g/zzl_GzQcod8/s1600/Changeman.png)'
        }}>
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>Dengeki Sentai Changeman</div>
                    <div className='featured--year'>1985</div>
                </div>
                <div className='featured--plot'>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <div className='featured--details'>
                    <img src="https://media.fstatic.com/y9en3f1_mvlP9mSZ_gAAhl0TSHE=/210x312/smart/filters:format(webp)/media/movies/covers/2010/01/ae29d514be77f161a1cedbcc4bbd3ec0.jpg" alt="" />
                    <h2>Nome Completo: </h2><p>Dengeki Sentai Changeman</p>
                    <h2>Categoria: </h2><p>Super Sentai</p>
                    <h2>Ano: </h2><p>1985</p>
                    <h2>Duração: </h2><p>20 minutos</p>
                </div>
                <div className='featured--episodes'>
                    LISTA DE EPISÓDIOS
                </div>
            </div>
        </section>
    )
}

export default SerieDetail;