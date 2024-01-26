import React, { useState } from "react";
import './style.css';
// import SerieCard from "../SerieCard";

const SerieList = ({}) => {
    const [items, setItems] = useState([1,2,3,4,5]);
    const [visible, setVisible] = useState(3);

    const handleLoadMore = () => {
        setVisible(visible + 3);
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