import React from "react";
import './Botao.css';

interface BotaoProps {
    onClick: () => void;
}

const Botao: React.FC<BotaoProps> = ({onClick}) => {
    return (
        <div className="novo-evento" onClick={onClick}>
            <h2>Criar Evento</h2>
            <button className="plus-button"><img id="button-add" src="./Icons/add-button.png" alt="" /></button>
        </div>
    );
};

export default Botao;