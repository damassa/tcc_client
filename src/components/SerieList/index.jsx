import React, { useState } from "react";
import './style.css';
// import SerieCard from "../SerieCard";

const SerieList = ({}) => {
    const [items, setItems] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [visible, setVisible] = useState(4);

    const handleLoadMore = () => {
        setVisible(visible + 4);
    }

    return (            
        <div className="serie--list">
            <h2>Séries Populares</h2>
            <div className="serie--list--cards">
                {items.slice(0, visible).map((item) => (
                    <div key={item}>{item}</div>
                ))}
                {visible < items.length && (
                    <button onClick={handleLoadMore}>Carregar mais</button>
                )}
            </div>
        </div>
    );
}

export default SerieList;