import React, { useState } from "react";
import './style.css';
// import SerieCard from "../SerieCard";

const cardsPerRow = 4;

const SerieList = () => {
    const [next, setNext] = useState(cardsPerRow);

    const cardGallery = [
        {url: '/src/assets/Gorenger.jpg'},
        {url: '/src/assets/JAQK.jpg'},
        {url: '/src/assets/BattleFeverJ.jpg'},
        {url: '/src/assets/Denjiman.jpg'},
        {url: '/src/assets/SunVulcan.jpg'},
        {url: '/src/assets/GoggleV.jpg'},
        {url: '/src/assets/Dynaman.jpg'},
        {url: '/src/assets/Bioman.jpg'},
        {url: '/src/assets/Changeman.png'},
        {url: '/src/assets/Flashman.jpg'},
        {url: '/src/assets/Maskman.jpg'},
        {url: '/src/assets/Liveman.jpg'},
        {url: '/src/assets/Turboranger.jpg'},
        {url: '/src/assets/Fiveman.jpg'},
        {url: '/src/assets/Jetman.jpg'},
        {url: '/src/assets/Zyuranger.jpg'},
        {url: '/src/assets/Dairanger.jpg'},
        {url: '/src/assets/Kakuranger.jpg'},
        {url: '/src/assets/Ohranger.jpg'},
    ]

    const handleLoadMore = () => {
        setNext(next + cardsPerRow);
    };

    return (
        <>
            <div className="serie--list">
                {cardGallery?.slice(0, next)?.map((image, index) => {
                    return (
                        <div className="serie--list--cards" key={index}>
                            <img src={image?.url} alt="serie" />
                        </div>
                    );
                })}
                {next < cardGallery?.length && (
                    <button onClick={handleLoadMore}>
                        Carregar mais
                    </button>
                )}
            </div>
        </>
    );
    // const [items, setItems] = useState([1,2,3,4,5,6,7,8,9,10]);
    // const [visible, setVisible] = useState(4);

    // const handleLoadMore = () => {
    //     setVisible(visible + 4);
    // }

    // return (            
    //     <div className="serie--list">
    //         <h2>Séries Populares</h2>
    //         <div className="serie--list--cards">
    //             {items.slice(0, visible).map((item) => (
    //                 <div key={item}>{item}</div>
    //             ))}
    //             {visible < items.length && (
    //                 <button onClick={handleLoadMore}>Carregar mais</button>
    //             )}
    //         </div>
    //     </div>
    // );
}

export default SerieList;