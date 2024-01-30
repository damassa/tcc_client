import React from 'react';
import './style.css';
import PosterImage from '../../assets/Changeman.png';
import AddFavoriteButton from '../../components/AddFavoriteButton';

const SerieDetail = () => {
    return (
        <section className='detail--container'>
            <div className="detail--banner">
                <div className="detail--image--container">
                    <img src={PosterImage} alt="" />
                </div>
                <div className="detail--info">
                    <h1>Dengeki Sentai Changeman</h1>
                    <AddFavoriteButton />
                </div>
            </div>
            <p className="detail--plot">
            Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim. Negão é teu passadis, eu sou faxa pretis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Detraxit consequat et quo num tendi nada.

Si num tem leite então bota uma pinga aí cumpadi! Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Pra lá, depois divoltis porris, paradis.
            </p>
        </section>
    )
}

export default SerieDetail;