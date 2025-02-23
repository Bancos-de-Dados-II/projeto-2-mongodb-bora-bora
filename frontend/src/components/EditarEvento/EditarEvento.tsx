import React, {useState, useRef, useEffect} from "react";
import ReactModal from "react-modal";
import './EditarEvento.css';
import api from "../../services/api";
import MyMap from "../Map/Map";

interface EditarEventoProps {
    isOpen: boolean;
    onClose: () => void;
    id:string;
}

const EditarEvento: React.FC<EditarEventoProps> = ({isOpen, onClose, id}) => {



    const [evento, setEvento] = useState<any>({});

    const [endereco, setEndereco] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [horario, setHorario] = useState("");
    const [data, setData] = useState("");
    const [quantParticipantes, setQuantParticipantes] = useState("");
    const [coordinates, setCoordinates] = useState<[number, number] | null>(null!);




    useEffect(()=>{
        async function getEvento() {
            try {
                const resultado =   await api.get(`/event/${id}`);
                setEvento(resultado.data);
                setEndereco(resultado.data.endereco);
                setDescription(resultado.data.description); 
                setTitle(resultado.data.title);
                setHorario(resultado.data.horario);
                setData(resultado.data.data);
                setQuantParticipantes(resultado.data.quantPart);
                console.log(resultado.data.geolocalization.coordinates);
                setCoordinates([resultado.data.geolocalization.coordinates[1],resultado.data.geolocalization.coordinates[0]]);
            } catch (error) {
                console.log(error);
            }
        }

        getEvento();
        
    },[])
   
    
    console.log("evento",evento.title);
    
    
    //Gambiarra null!
    const inputNome = useRef<HTMLInputElement>(null!);
    const inputHorario = useRef<HTMLInputElement>(null!);
    const inputParticipantes = useRef<HTMLInputElement>(null!);
    const inputLocal = useRef<HTMLInputElement>(null!);
    const inputDescricao = useRef<HTMLInputElement>(null!);
    const inputData = useRef<HTMLInputElement>(null!);
    const inputEndereco = useRef<HTMLInputElement>(null!)
    const [imagemEvento, setImagemEvento] = useState<File | null>(null!);

    async function search(pesquisa: string) {
        try {
            const url = await fetch(`https://nominatim.openstreetmap.org/search?q=${pesquisa}&format=json`);
            const data = await url.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setCoordinates([parseFloat(lat), parseFloat(lon)]);
            } else {
                alert("Nenhum resultado encontrado para o endereço.");
            }
        } catch (error) {
            console.error("Erro ao buscar coordenadas:", error);
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

    async function putEvento (){
        await api.put(`/event/${id}`, {
            imagem: "",
            title: inputNome.current.value,
            description: inputDescricao.current.value,
            horario: inputHorario.current.value,
            data: inputData.current.value,
            quantPart:parseInt(inputParticipantes.current.value),
            endereco: inputEndereco.current.value,
            geolocalization: {
                "type":"Point",
                "coordinates":[coordinates[1], coordinates[0]]
            }
    })
}




        return (
            <ReactModal isOpen={isOpen} onRequestClose={onClose} className="popup-criar-evento" overlayClassName="popup-overlay">
                <h2>Editar Evento</h2>
                <form onSubmit={submit}>
                    <div>
                        <MyMap coordinates={coordinates}/>
                    </div>

                    <label>
                        Onde será seu evento?
                        <input type="text" ref={inputEndereco}    value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>
                        <button type="button" className="pesquisar" onClick={() => search(inputEndereco.current.value)}>Pesquisar</button>
                    </label>
                    <br />
                    <label>
                        Como vai se chamar seu evento?
                        <input type="text" ref={inputNome}   value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </label>
    
                    <label>
                        Descreva seu evento
                        <input type="text" ref={inputDescricao} value={description} onChange={(e)=>setDescription(e.target.value)} />
                    </label>
    
                    <label>
                        Que horas seu evento começa?
                        <input type="time" ref={inputHorario}  value={horario} onChange={(e)=>setHorario(e.target.value)}/>
                    </label>
    
                    <label>
                        Quando será seu evento?
                        <input type="date" ref={inputData}  value={data} onChange={(e)=>setData(e.target.value)}/>
                    </label>
    
                    <label>
                        Quantas pessoas serão convidadas ?
                        <input type="text" ref={inputParticipantes}  value={quantParticipantes} onChange={(e)=>setQuantParticipantes(e.target.value)}/>
                    </label>
    
                    <div className="buttons-create">
                        <button type="submit" onClick={putEvento}>Atualizar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </ReactModal>
        );
};

export default EditarEvento;