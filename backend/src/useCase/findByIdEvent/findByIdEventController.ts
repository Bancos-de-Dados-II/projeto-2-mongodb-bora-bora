import { FindByIdEventUseCase } from "./findByIdEventUseCase";
import { Request,Response } from "express";


export class FindByIdEventController{
    constructor(private findByIdEventUseCase:FindByIdEventUseCase){}

    async handle(request:Request,response:Response){
        try {
            let {id} = request.params;
            let event = await this.findByIdEventUseCase.execute(id);
            response.status(200).json(event);
            return;
        } catch (error:any) {
            response.status(400).json({message:error.message});
            return;
        }
    }
}