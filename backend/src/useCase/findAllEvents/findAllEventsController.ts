import { FindAllEventsUseCase } from "./findAllEventsUseCase";
import { Request,Response } from "express";


export class FindAllEventsController{
    constructor(private findAllEventsUsecase:FindAllEventsUseCase){}

    async handle(request:Request,response:Response){
        try {
            let events =  await this.findAllEventsUsecase.execute();
            response.status(200).json(events);
            return;
        } catch (error:any) {
            response.status(400).json({error:error.message});
        }
    }
}
