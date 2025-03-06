import React, { useEffect, useState, useRef } from "react";
import './Menu.css';
import Botao from "../Botao/Botao";
import CardEvento from "../CardEvento/CardEvento";
import api from "../../services/api";
import CriarEvento from "../CriarEvento/CriarEvento";

interface Evento {
    imagem?: string;
    title: string;
    description: string;
    horario: string;
    data: string;
    quantPart: string;
    endereco: string;
    geolocalization: string;
    id?: string;
}

const Menu: React.FC = () => {
    const [selecionada, selecionar] = useState<string>("Meus Eventos");
    const [popupCriarOpen, setPopupCriarOpen] = useState(false);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [update,setUpdate] = useState(0);
    
    const triggerUpdate = () => {
        setUpdate((prev) => prev + 1);
      };

    const fetchEventos = async () => {
        const response = await api.get<Evento[]>("/event"); 
        setEventos(response.data);
    }

    useEffect(() => {
        fetchEventos();
    }, [update]);

    return (
        <div className="container-background">
            <nav className="navbar">
                    <div
                        className={`tab ${selecionada === "Meus Eventos" ? "active" : ""}`}
                        onClick={() => selecionar("Meus Eventos")}
                    >Meus Eventos
                    </div>
                        <div
                        className={`tab ${selecionada === "Meus Convites" ? "active" : ""}`}
                        onClick={() => selecionar("Meus Convites")}
                    >Meus Convites
                    </div>
            </nav>

            {selecionada === "Meus Eventos" && (
                <div>
                    <Botao onClick={() => setPopupCriarOpen(true)}/>
                    <CriarEvento
                    isOpen={popupCriarOpen}
                    onClose={() => {
                        setPopupCriarOpen(false)
                        triggerUpdate();
                    }}
                    />
                </div>
            )}

            <div className={`menu ${selecionada === "Meus Eventos" ? "background-meus-eventos" : "background-meus-convites"}`}>

            {selecionada === "Meus Eventos" && eventos.map((evento, index) => (
                <CardEvento
                    key={index}
                    // imagem="./Images/LOGO.png"
                    // title={`${evento.title}`}
                    // description={`${evento.description}`}
                    // horario={`${evento.horario}`}
                    // data={`${evento.data}`}
                    // quantPart={`${evento.quantPart}`}
                    // endereco={`${evento.endereco}`}
                    // geolocalization={`${[evento.geolocalization[1],evento.geolocalization[0]]}`}
                    id={`${evento._id}`}
                />
                ))}

                {/* <iframe style={{background: "#F1F5F4", border: "none", borderRadius:" 2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)", width: "100vw", height: "100vh"}} src="https://charts.mongodb.com/charts-project-0-glgrtul/embed/dashboards?id=67aa5644-54d0-416a-854c-aa5aa55fbe28&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe> */}
            </div>
        </div>
    );
};

export default Menu;