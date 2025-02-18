import { CreateEventUseCase } from "./createEventUseCase";
import { Request,Response } from "express";
import { createEventDTO } from "./createEventDTO";
import {z} from "zod";

export class CreateEventController{
    constructor(private createEventUseCase:CreateEventUseCase){}

    async handle(request:Request,response:Response){
        try {
            createEventDTO.parse(request.body);

            const data:z.infer<typeof createEventDTO> = request.body;

            const eventCreated = await this.createEventUseCase.execute({...data});

            response.status(200).json(data);
            return;
            

        } catch (error:any) {
            response.status(400).json({message:error.message});
            return;
        }
    }
}