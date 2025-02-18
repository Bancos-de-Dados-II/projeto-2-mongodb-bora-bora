import { DeleteEventUseCase } from "./deleteEventUseCase";
import { Request,Response } from "express";

export class DeleteEventController{
    constructor(private deleteEventUseCase:DeleteEventUseCase){}

    async handle(request:Request,response:Response){
        try {
            let {id} = request.params;
            await this.deleteEventUseCase.execute(id);
            response.status(200).json("Evento deletado com sucesso")
            return;
        } catch (error:any) {
            response.status(400).json({message:error.message});
            return;
        }
    }
}
