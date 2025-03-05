import React, {useEffect, useState} from 'react';
import './CardEvento.css';
import api from '../../services/api';
import PopMap from '../PopMap/PopMap';
import EditarEvento from '../EditarEvento/EditarEvento';
import {  ToastContainer ,  toast  }  from  'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface CardEventoProps {
    // imagem: string;
    // title: string;
    // description: string;
    // horario: string;
    // data: string;
    // quantPart: string;
    // endereco: string;
    // geolocalization: string;
    id: string;
}

const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    if (isNaN(data.getTime())) {
        console.error("Data inválida:", dataISO);
        return "Data inválida";
    }
    return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

// imagem, title, description, 
//     horario, data, quantPart, endereco, geolocalization,



const CardEvento: React.FC<CardEventoProps> = ({id}) => {  
        
        
    const [popupCriarOpen, setPopupCriarOpen] = useState(false);
    const [popupMap, setPopUpMap] = useState(false);
    const [evento, setEvento] = useState<object>({});
    
    async function getEvento(id:string) {
        const resultado = await api.get(`/event/${id}`);
        setEvento(resultado.data);
    }

    async function deletarEvento (id: string){
        await api.delete<CardEventoProps[]>(`/event/${id}`);
    }

    useEffect(()=>{
        getEvento(id);
    },[])


    function verificaData(){

        const dataAtual = new Date().getTime();
        const dataEventoFormatada=  new Date(evento.data).getTime();
        
        
        if(dataEventoFormatada < dataAtual){     
            return false;
        }
        return true;
    }
    

    

        return (
            <div className='evento'>
                <div className='informacoes'>
                    <img src={evento.imagem} alt={evento.title} />
                    <div className='infos'>
                        <p className='titulo'>{evento.title}</p>
                        <p className='descricao'>{evento.description}</p>

                        <div className='data-time'>
                            <p className='data'>{`${formatarData(evento.data)} às ${evento.horario}`}</p>
                        </div>
                    </div>
                    <i className="bi bi-geo-alt" onClick={() =>{ setPopUpMap(true); getEvento(id)}}><p className='endereco'>{evento.endereco}</p></i>
                    <PopMap isOpen={popupMap} onClose={()=> setPopUpMap(false)} id={id}/>
                    
                    <p id='participantes'>Participantes: /{evento.quantPart}</p>
                </div>
                <div className='acoes'>
                    <i className='bi bi-person-fill-add'></i>
                    <i className='bi bi-pencil-square' onClick={() =>{ 
                        
                        const dataverificada = verificaData();
                        console.log(dataverificada);
                        
                        if(dataverificada){
                            
                            setPopupCriarOpen(true)
                            getEvento(id)
                        }else{
                            toast.error("O evento já ocorreu, portanto não pode mais ser editado!");
                        }
                    }}>

                    </i>    
                    <EditarEvento
                    isOpen={popupCriarOpen}
                    onClose={() => setPopupCriarOpen(false)}
                    id={id}
                    />
                    <i className='bi bi-trash' onClick={() => {
                        deletarEvento(id);
                        window.location.reload()
                    }}></i>
                </div>
                <ToastContainer/>
            </div>
        );  
    };

export default CardEvento;