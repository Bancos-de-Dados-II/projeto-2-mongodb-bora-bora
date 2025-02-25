import React, {useState, useRef} from "react";
import ReactModal from "react-modal";
import './CriarEvento.css';
import api from "../../services/api";
import MyMap from "../Map/Map";
import {  ToastContainer ,  toast  }  from  'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface CriarEventoProps {
    isOpen: boolean;
    onClose: () => void;
}

const CriarEvento: React.FC<CriarEventoProps> = ({isOpen, onClose}) => {
   
    //Gambiarra null!
    const inputNome = useRef<HTMLInputElement>(null!);
    const inputHorario = useRef<HTMLInputElement>(null!);
    const inputParticipantes = useRef<HTMLInputElement>(null!);
    const inputLocal = useRef<HTMLInputElement>(null!);
    const inputDescricao = useRef<HTMLInputElement>(null!);
    const inputData = useRef<HTMLInputElement>(null!);
    const inputEndereco = useRef<HTMLInputElement>(null!)
    const [imagemEvento, setImagemEvento] = useState<File | null>(null);
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

    async function search(pesquisa: string) {
            try {
    
                if(pesquisa.length === 0){
                    throw Error("O campo precisa ser preenchido com alguma localização!");
                }
    
                const url = await fetch(`https://nominatim.openstreetmap.org/search?q=${pesquisa}&format=json`);
                const data = await url.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setCoordinates([parseFloat(lat), parseFloat(lon)]);
                } 
                else {
                    throw Error("Nenhum resultado encontrado para o endereço.");
                }
                } catch (error:any) {
                toast.error(error.message);    
            }
        }

    const submit = (e: React.FormEvent) => {

        const nomeEvento = inputNome.current?.value.trim();
        const horarioEvento = inputHorario.current?.value.trim();
        const participantesEvento = inputParticipantes.current?.value.trim();
        const localEvento = inputLocal.current?.value.trim();
        const descricaoEvento = inputDescricao.current?.value.trim();
        const dataEvento = inputData.current?.value.trim();
        const enderecoEvento = inputEndereco.current?.value.trim();

        if (nomeEvento && horarioEvento && participantesEvento && localEvento && descricaoEvento && dataEvento && enderecoEvento) {
      
            if (inputNome.current) inputNome.current.value = "";
            if (inputHorario.current) inputHorario.current.value = "";
            if (inputParticipantes.current) inputParticipantes.current.value = "";
            if (inputLocal.current) inputLocal.current.value = "";
            
      
            onClose();
          }
    };

    async function createEventos (){
        
        try {
            if(!coordinates){
                throw Error("O endereço deve ser informado!");
            }

            if(!inputNome.current.value){
                throw Error("O titulo deve ser informado!");
            }
            if(!inputDescricao.current.value){
                throw Error("O evento deve ter uma descrição!");
            }
            
            if(!inputHorario.current.value){
                throw Error("O horario deve ser informado!");
            }

            
            if(!inputData.current.value){
                throw Error("A data do evento deve ser informada!");
            }
            
            if(!inputParticipantes.current.value ){
                throw Error("A quantidade de participantes deve ser informada!");
            }
            if(inputParticipantes.current.value === "0" ){
                throw Error("A quantidade de participantes deve maior que 0!");
            }

            if(inputParticipantes.current.value < "0" ){
                throw Error("A quantidade de participantes deve um número inteiro positivo!");
            }
            
            
            console.log({

                titulo:inputNome.current.value,
                descricao:inputDescricao.current.value,
                horario:inputHorario.current.value,
               data: inputData.current.value,
               coordenadas:coordinates,
               participantes:inputParticipantes.current.value
            
            });
            
            


            await api.post('/event', {
                imagem: "",
                title: inputNome.current.value,
                description: inputDescricao.current.value,
                horario: inputHorario.current.value,
                data: inputData.current.value,
                quantPart: parseInt(inputParticipantes.current.value),
                endereco: inputEndereco.current.value,
                geolocalization: {
                    "type":"Point",
                    "coordinates":[coordinates[1], coordinates[0]]
                }
            })

            toast.success("Evento criado com sucesso!");
            
        } catch (error:any) {
            console.log(error);
            
            toast.error(error.message);
        }

        
    }

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onClose} className="popup-criar-evento" overlayClassName="popup-overlay">
            <h2>Criar Evento</h2>
            <form onSubmit={submit}>
                <div>
                    <MyMap coordinates={coordinates}/>
                </div>

                <label>
                    Onde será seu evento?
                    <input type="text" ref={inputEndereco} required/>
                    <button className="pesquisar" onClick={() => search(inputEndereco.current.value)}>Pesquisar</button>
                </label>
                <br />
                <label>
                    Como vai se chamar seu evento?
                    <input type="text" ref={inputNome} required />
                </label>

                <label>
                    Descreva seu evento
                    <input  type="text" ref={inputDescricao} required />
                </label>

                <label>
                    Que horas seu evento começa?
                    <input type="time" ref={inputHorario} required />
                </label>

                <label>
                    Quando será seu evento?
                    <input type="date" ref={inputData} required />
                </label>

                <label>
                    Quantas pessoas serão convidadas ?
                    <input type="text" ref={inputParticipantes} required />
                </label>

                <div className="buttons-create">
                    <button type="submit" onClick={createEventos}>Criar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
            <ToastContainer />
        </ReactModal>
    );


};

export default CriarEvento;