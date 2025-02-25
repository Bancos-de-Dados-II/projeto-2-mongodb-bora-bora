import { IEventRepository } from "../IEventRepository";
import { Event } from "../../types/Event";
import Evento from "../../database/model/Event";

export class EventRepository implements IEventRepository{

    async findById(id: string): Promise<any> {
        let result = await Evento.findById(id);
        let event= {
            id:result!._id,
            title: result!.title,
            description: result!.description,
            quantPart:result!.quantPart,
            data:result!.data,
            horario: result!.horario,
            endereco: result!.endereco,
            geolocalization:result!.geolocalization,
            imagem:result!.imagem
    }
        return event;
    }


    async findAll(): Promise<Event[]> {
        let result = await Evento.find();
         let events: Event[] = [];
        
        result.forEach((user:any )=>{
            events.push(user);
        })
        
              
        return events;
    }

    async deleteEvent(id: string): Promise<void> {
       await Evento.deleteOne({_id:id});
       return;
    }

    async createEvent(event: Event): Promise<unknown> {
        
        let newEvent = new Evento(event);
        newEvent.save();
        return newEvent;
    }



    async updateEvent(id: string, event: Event): Promise<unknown> {


        await Evento.updateOne({_id:id},event);
        
        return event;
    }
}