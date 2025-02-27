import { IEventRepository } from "../../repositories/IEventRepository"; 
import { Event } from "../../types/Event";

export class CreateEventUseCase{    
    constructor(private eventRepository:IEventRepository){}

    async execute(data:any){


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