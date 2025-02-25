import { IEventRepository } from "../../repositories/IEventRepository"; 
import { Event } from "../../types/Event";

export class CreateEventUseCase{    
    constructor(private eventRepository:IEventRepository){}

    async execute(data:any){

        // if(data.title.lenght < 0){
        //     throw Error("Titulo muito curto")
        // }

        // if(data.quantPart > 0 && typeof(data.quantPart) === 'number'){
        //     throw Error("Quantidade de participantes deve ser maior que 0 e um número inteiro positivo!");
        // }

        // if(!data.horario){
        //     throw Error("Informe o horário do evento!");
        // }

        // if(!data.data){
        //     throw Error("Informe a data do evento!");
        // }


        let newEvent = new Event({
            ...data,
            description:data.description ? data.description : null,
            imagem:data.imagem ? data.imagem : null,
            horario:data.horario ? data.horario : null
        })

        await this.eventRepository.createEvent(newEvent);

        return newEvent;
    }
}