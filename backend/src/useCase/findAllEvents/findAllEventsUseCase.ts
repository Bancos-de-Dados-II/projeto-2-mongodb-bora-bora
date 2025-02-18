import { IEventRepository } from "../../repositories/IEventRepository"; 

export class FindAllEventsUseCase{
    constructor(private eventRepository:IEventRepository){}

    async execute(){
        let events = await this.eventRepository.findAll();
        return events;
    }
}