import React from "react";
import './Banner.css';

const Banner: React.FC = () => {
    return (
        <section className="Banner">
            <div className="banner-transparente">
                <img id="logo-banner" src="./Images/LOGO.png" alt="Logo" />
                <p id="texto-banner">Crie seu evento agora mesmo!</p>
                <button className="criar-evento">Clique Aqui!</button>
            </div>
        </section>
    );
};

export default Banner;