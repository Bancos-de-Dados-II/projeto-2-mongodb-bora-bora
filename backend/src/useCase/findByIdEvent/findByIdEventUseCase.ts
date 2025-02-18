import { IEventRepository } from "../../repositories/IEventRepository"; 


export class FindByIdEventUseCase{
    constructor(private eventRepository:IEventRepository){}

    async execute(id:string){
        let event =  await this.eventRepository.findById(id);
        if(!event){
            throw Error("Evento não encontrado!");
        }
        return event;
    }
}