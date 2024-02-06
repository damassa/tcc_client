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
                <div className="detail--info--name">
                    <h1>Dengeki Sentai Changeman</h1>
                    <h2>1985</h2>
                    <div className="detail--favorite">
                        <AddFavoriteButton />
                    </div>
                </div>
                <div className="detail--plot">
                    <p>
                        Mussum Ipsum, cacilds vidis litro abertis. Sapien in monti palavris qui num significa nadis i pareci latim. Negão é teu passadis, eu sou faxa pretis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Detraxit consequat et quo num tendi nada.
                        Si num tem leite então bota uma pinga aí cumpadi! Sapien in monti palavris qui num significa nadis i pareci latim. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Pra lá, depois divoltis porris, paradis.
                    </p>
                </div>
                <div className="detail--info">
                    lalala
                </div>
            </div>
        </section>
    )
}

export default SerieDetail;