import React from "react";
import './Cabecalho.css';
import { Link } from "react-router-dom";

const Cabecalho: React.FC = () => {
    return (
        <header className="Cabecalho">
            <img className="Logo" src="./Images/LOGO2.png" alt="Logo" />
            <div className="buttons">
                <button className="cadastrar">Cadastre-se</button>
                <Link to="/Evento">
                    <button className="entrar">Entrar</button>
                </Link>
            </div>
        </header>
    )
}

export default Cabecalho;

