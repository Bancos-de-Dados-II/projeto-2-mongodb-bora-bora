import { IEventRepository } from "../../repositories/IEventRepository"; 
import { Event } from "../../types/Event";

export class UpdateEventUseCase{
    constructor(private eventRepository:IEventRepository){}

    async execute(id:string,event:any){
               
        let oldEvent = await this.eventRepository.findById(id) as Event;
         
        if(!oldEvent){
            throw Error("Evento não encontrado nesse id!");
        }

        let newEvent={
            title:event.title || oldEvent.title,
            data:event.data || oldEvent.data,
            endereco:event.endereco || oldEvent.endereco,
            geolocalization:event.geolocalization || oldEvent.geolocalization,
            quantPart:event.quantPart || oldEvent.quantPart,
            description:event.description || oldEvent.description,
            horario:event.horario || oldEvent.horario,
            imagem:event.imagem || oldEvent.imagem,
        }

        console.log(newEvent);
        
        let updatedEvent = await this.eventRepository.updateEvent(id,newEvent);
        
        return updatedEvent;

    }
}