import { IEventRepository } from "../../repositories/IEventRepository";
import { Event } from "../../types/Event";

export class SaveImageEventUseCase{
    constructor(private eventRepository:IEventRepository){}

    async execute(id:string,imagem:string){
        let event = await this.eventRepository.findById(id) as any;

        let newEvent: Event= {
                id:event!._id,
                title: event!.title,
                description: event!.description,
                quantPart:event!.quantPart,
                data:event!.data,
                horario: event!.horario,
                endereco: event!.endereco,
                geolocalization:event!.geolocalization,
                imagem
        }
        

        if(!event){
            throw Error("Evento não encontrado");
        }

        let updatedEvent = await this.eventRepository.updateEvent(id,newEvent);
        
        return updatedEvent;
    }
}