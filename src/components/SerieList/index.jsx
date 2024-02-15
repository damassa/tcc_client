import React, { useState } from "react";
import './style.css';
import Button from '../Button';
// import SerieCard from "../SerieCard";

const cardsPerRow = 4;

const SerieList = () => {
    const [next, setNext] = useState(cardsPerRow);

    const cardGallery = [
        {url: '../../assets/Gorenger.jpg'},
        {url: '../../assets/JAQK.jpg'},
        {url: '../../assets/BattleFeverJ.jpg'},
        {url: '../../assets/Denjiman.jpg'},
        {url: '../../assets/SunVulcan.jpg'},
        {url: '../../assets/GoggleV.jpg'},
        {url: '../../assets/Dynaman.jpg'},
        {url: '../../assets/Bioman.jpg'},
        {url: '../../assets/Changeman.png'},
        {url: '../../assets/Flashman.jpg'},
        {url: '../../assets/Maskman.jpg'},
        {url: '../../assets/Liveman.jpg'},
        {url: '../../assets/Turboranger.jpg'},
        {url: '../../assets/Fiveman.jpg'},
        {url: '../../assets/Jetman.jpg'},
        {url: '../../assets/Zyuranger.jpg'},
        {url: '../../assets/Dairanger.jpg'},
        {url: '../../assets/Kakuranger.jpg'},
        {url: '../../assets/Ohranger.jpg'},
    ]

    const handleLoadMore = () => {
        setNext(next + cardsPerRow);
    };

    return (
        <div className="serie--list">
            {cardGallery?.slice(0, next)?.map((image, index) => {
                return (
                    <div className="serie--list--cards" key={index}>
                        <img src={image?.url} alt="serie" />
                    </div>
                );
            })}
            {next < cardGallery?.length && (
                <Button onClick={handleLoadMore} />
            )}
        </div>

    );
}

export default SerieList;