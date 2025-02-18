import {z} from "zod"


export const updateEventDTO = z.object({
    title:z.string({
        invalid_type_error:"Title must be a string"
    }
).min(2).max(255).optional(),

description:z.string({invalid_type_error:"Description must be a string"}).optional(),

quantPart:z.number({
    invalid_type_error:"Quantidade de participantes must be a number"
}).int().optional(),

data:z.string({
    invalid_type_error:"Data must be a string"
}).optional(),

imagem:z.string({
    invalid_type_error:"Imagem must be a string"
}).optional(),

horario:z.string({
    invalid_type_error:"Horario must be a string"
}).optional(),

geolocalization:z.object({type: z.string(), coordinates: z.array(z.number())}).optional(),

endereco:z.string({
    invalid_type_error:"Endereco must be a string"
}).min(2).max(255).optional()
})