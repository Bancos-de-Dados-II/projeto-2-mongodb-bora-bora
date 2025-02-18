import React from "react";
import './BannerCentral.css';

const BannerCentral: React.FC = () => {
    return (
        <section className="central-banner">
            <div className="icons">
                <div className="background-icon" id="calendario"><img src="./Icons/Calendario.png" alt="Calendario" /></div>
                <h3>CRIE EVENTOS</h3>
                <p>Crie seus eventos de forma rápida e prática</p>
            </div>
            <div className="icons">
                <div className="background-icon" id="convite"><img src="./Icons/Convite.png" alt="Convite" /></div>
                <h3>CONVIDE SEUS AMIGOS</h3>
                <p>Encontre e convide seus amigos, envie a localização</p>
            </div>
            <div className="icons">
                <div className="background-icon" id="festim"><img src="./Icons/Festim.png" alt="Festim" /></div>
                <h3>COMEMORE!</h3>
                <p>E divirta-se!</p>
            </div>
        </section>
    );
};

export default BannerCentral;