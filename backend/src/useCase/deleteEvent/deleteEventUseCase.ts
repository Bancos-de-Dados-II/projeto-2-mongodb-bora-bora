import { IEventRepository } from "../../repositories/IEventRepository"; 

export class DeleteEventUseCase{
    constructor(private eventRepository:IEventRepository){}

    async execute(id:string){
        let eventExist = await this.eventRepository.findById(id);
        if(!eventExist){
            throw Error("Evento com o ID passado não existe!");
        }
        await this.eventRepository.deleteEvent(id);
        
        return "Evento deletado com sucesso!";
    }
}