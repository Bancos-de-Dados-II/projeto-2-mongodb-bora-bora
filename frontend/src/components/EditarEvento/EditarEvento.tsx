import React, {useState, useRef, useEffect} from "react";
import ReactModal from "react-modal";
import {  ToastContainer ,  toast  }  from  'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './EditarEvento.css';
import api from "../../services/api";
import MyMap from "../Map/Map";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"


interface EditarEventoProps {
    isOpen: boolean;
    onClose: () => void;
    id:string;
}

const updateEventoFormSchema = z.object({
    titulo:z.string({
        required_error:"Title é obrigatório",
        invalid_type_error:"Title deve ser uma string"
    }
).min(4,"Para atualizar o nome do evento, deve informar um nome de no mínimo 4 caracteres").max(255,"O endereco deve conter no máximo 255 caracteres"),

    descricao:z.string({invalid_type_error:"A descrição deve ser uma string"}).optional(),

    quantParticipantes:z.coerce.number({
        required_error:"Quantidade de participantes é obrigatória",
        invalid_type_error:"Quantidade de participantes deve ser um numero"
    }).int("A quantidade de participantes deve ser um numero inteiro").min(1,"O evento deve ter pelo menos um participante"),

    data:z.coerce.date().refine((data)=>{
        console.log("refine");
        
        console.log(data.getTime());
        console.log(new Date().getTime());
        
        return data > new Date()},{message:`Data inválida`}),

    horario:z.string({
        required_error:"O horário é obrigatório",
        invalid_type_error:"Horario deve ser uma string"
    }).refine(data =>!!data, {message:"O horario é um dado obrigatório"}),
    
    endereco:z.string({
        required_error:"Endereco é obrigatório",
        invalid_type_error:"Endereco deve ser uma string"
    }).min(4,"O endereco deve conter no mínimo 4 caracteres").max(255,"O endereco deve conter no máximo 255 caracteres")
    })

type UpdateEventFormData = z.infer<typeof updateEventoFormSchema>;





const EditarEvento: React.FC<EditarEventoProps> = ({isOpen, onClose, id}) => {

     const {register , handleSubmit,formState:{errors}} = useForm<UpdateEventFormData>({
            resolver:zodResolver(updateEventoFormSchema)
        });


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
                const dataStr = new Date(resultado.data.data).toLocaleDateString("pt-BR", { timeZone: "UTC" }); // Formato dd/MM/yyyy
                const [dia, mes, ano] = dataStr.split("/");
                const data = new Date(ano, mes - 1, dia); // Mês começa do zero
                const dataFormatada = data.toISOString().split("T")[0];
                setData(dataFormatada);
                setQuantParticipantes(resultado.data.quantPart);
                setCoordinates([resultado.data.geolocalization.coordinates[1],resultado.data.geolocalization.coordinates[0]]);
            } catch (error) {
                console.log(error);
            }
        }

        getEvento();
        
    },[])
   
    
    //Gambiarra null!
    // const inputNome = useRef<HTMLInputElement>(null!);
    // const inputHorario = useRef<HTMLInputElement>(null!);
    // const inputParticipantes = useRef<HTMLInputElement>(null!);
    // const inputLocal = useRef<HTMLInputElement>(null!);
    // const inputDescricao = useRef<HTMLInputElement>(null!);
    // const inputData = useRef<HTMLInputElement>(null!);
    // const inputEndereco = useRef<HTMLInputElement>(null!)
    // const [imagemEvento, setImagemEvento] = useState<File | null>(null!);

    async function search() {
               try {
                   console.log(endereco);
                   
   
                   if(endereco.length === 0){
                       throw Error("O campo precisa ser preenchido com alguma localização!");
                   }
                   
                   
                   const url = await fetch(`https://nominatim.openstreetmap.org/search?q=${endereco}&format=json`);
                   const data = await url.json();
                   if (data.length > 0) {
                       const { lat, lon } = data[0];
                       setCoordinates([parseFloat(lat), parseFloat(lon)]);
                       setEndereco("");
                   } 
                   else {
                       throw Error("Nenhum resultado encontrado para o endereço.");
                   }
                   } catch (error:any) {
                   toast.error(error.message);    
               }
    }

    // const submit = (e: React.FormEvent) => {

    //     const nomeEvento = inputNome.current?.value.trim();
    //     const horarioEvento = inputHorario.current?.value.trim();
    //     const participantesEvento = inputParticipantes.current?.value.trim();
    //     const localEvento = inputLocal.current?.value.trim();
    //     const descricaoEvento = inputDescricao.current?.value.trim();
    //     const dataEvento = inputData.current?.value.trim();
    //     const enderecoEvento = inputEndereco.current?.value.trim();

    //     if (nomeEvento && horarioEvento && participantesEvento && localEvento && descricaoEvento && dataEvento && enderecoEvento) {
      
    //         if (inputNome.current) inputNome.current.value = "";
    //         if (inputHorario.current) inputHorario.current.value = "";
    //         if (inputParticipantes.current) inputParticipantes.current.value = "";
    //         if (inputLocal.current) inputLocal.current.value = "";

    //         onClose();
    //       }
    // };


    async function onSubmit(data:any){
        try {    


           if(!coordinates){
            throw Error("Você deve pesquisar a localização para marcar o local do evento!");
           }

           

            const createEvento =  await api.put(`/event/${id}`, {
                imagem: "",
                title: data.titulo,
                description: data.descricao,
                horario: data.horario,
                data: data.data,
                quantPart: parseInt(data.quantParticipantes),
                endereco: data.endereco,
                geolocalization: {
                    "type":"Point",
                    "coordinates":[coordinates[1], coordinates[0]]
                }
            })
            

            onClose();
            window.location.reload();            
            toast.success("Evento atualizado com sucesso!");
            //setTimeout(()=>window.location.reload(),5000);
              
        } catch (error:any) {
            console.log(error);
            
            toast.error(error.message);
        }
    }

//     async function putEvento (){

//         try {
            
//             await api.put(`/event/${id}`, {
//                 imagem: "",
//                 title: inputNome.current.value,
//                 description: inputDescricao.current.value,
//                 horario: inputHorario.current.value,
//                 data: inputData.current.value,
//                 quantPart:parseInt(inputParticipantes.current.value),
//                 endereco: inputEndereco.current.value,
//                 geolocalization: {
//                     "type":"Point",
//                     "coordinates":[coordinates[1], coordinates[0]]
//                 }
                
//         })
//         } catch (error) {
//             console.log("entrou no catch");
            
//             toast.error(error.message);
//         }

// }

    console.log("valor de data");
    
    console.log(data);

    

        return (
            <ReactModal isOpen={isOpen} onRequestClose={onClose} className="popup-criar-evento" overlayClassName="popup-overlay">
                <h2>Editar Evento</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
    
                    <br />
                    <label>
                        Como vai se chamar seu evento?
                        <input type="text" {...register('titulo')} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        {errors.titulo && <span style={{color:"red"}}>{errors.titulo.message}</span>}
                    </label>
    
                    <label>
                        Descreva seu evento
                        <input type="text" {...register('descricao')} value={description} onChange={(e)=>setDescription(e.target.value)} />
                        {errors.descricao && <span style={{color:"red"}}>{errors.descricao.message}</span>}
                    </label>
    
                    <label>
                        Que horas seu evento começa?
                        <input type="time" {...register('horario')} value={horario} onChange={(e)=>setHorario(e.target.value)}/>
                        {errors.horario && <span style={{color:"red"}}>{errors.horario.message}</span>}
                    </label>
    
                    <label>
                        Quando será seu evento?
                        <input type="date" {...register('data')}  value={data} onChange={(e)=>setData(e.target.value)}/>
                        {errors.data && <span style={{color:"red"}}>{errors.data.message}</span>}
                    </label>
    
                    <label>
                        Quantas pessoas serão convidadas ?
                        <input type="text" {...register('quantParticipantes')}    value={quantParticipantes} onChange={(e)=>setQuantParticipantes(e.target.value)}/>
                        {errors.quantParticipantes && <span style={{color:"red"}}>{errors.quantParticipantes.message}</span>}
                    </label>

                    <div>
                    <MyMap coordinates={coordinates}/>
                    </div>

                    <label style={{display:"flex", flexDirection:"column"}}>
                        Onde será seu evento?
                        <input type="text" {...register('endereco')} value={endereco} onChange={(e)=>setEndereco(e.target.value)}/>
                        {errors.endereco && <span style={{color:"red"}}>{errors.endereco.message}</span>}
                        <button type="button" className="pesquisar"   onClick={search}>Pesquisar</button>
                    </label>
    
                    <div className="buttons-create">
                        <button type="submit" >Atualizar</button>
                        <button type="button" onClick={()=>{
                            onClose();
                            window.location.reload();
                            }}>Cancelar</button>
                    </div>
                </form>
                <ToastContainer />
            </ReactModal>
        );
};

export default EditarEvento;