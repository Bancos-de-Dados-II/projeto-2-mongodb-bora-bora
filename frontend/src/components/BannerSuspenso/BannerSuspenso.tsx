import React from "react";
import './BannerSuspenso.css';

interface BannerSuspensoProps {
    mensagem: string;
    cor: string;
};

const BannerSuspenso: React.FC<BannerSuspensoProps> = ({mensagem, cor}) => {
    return (
        <div className="banner-suspenso" style={{"--cor-fundo": cor} as React.CSSProperties}>
            <h3>{mensagem}</h3>
        </div>
    );
};

export default BannerSuspenso; 