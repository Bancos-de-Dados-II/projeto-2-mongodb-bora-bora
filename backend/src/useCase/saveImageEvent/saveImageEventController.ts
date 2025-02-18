import { SaveImageEventUseCase } from "./saveImageEventUseCase";
import { Request,Response } from "express";


export class SaveImageEventController{
    constructor(private saveImageEventUseCase:SaveImageEventUseCase){}

    async handle(request:Request,response:Response){
       try {
            let {id} = request.params;

            let file =  request.file;
            const fileName = file?.filename.toString() || ""; 
            
            let eventoUpdated = await this.saveImageEventUseCase.execute(id, fileName);
            
            response.status(200).json(eventoUpdated);
            return;
       } catch (error:any) {
            response.status(400).json({Error:error.message});
            return;
       }
    }
}