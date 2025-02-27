import {z} from "zod";

export const createEventDTO = z.object({
    title:z.string({
            required_error:"Title is required",
            invalid_type_error:"Title must be a string"
        }
    ).min(2).max(255).refine(data => !!data, { message: 'The title is mandatory' }),

    description:z.string({invalid_type_error:"Description must be a string"}).optional(),

    quantPart:z.number({
        required_error:"Quantidade de participantes is required",
        invalid_type_error:"Quantidade de participantes must be a number"
    }).int("A quantidade de participantes deve ser um numero inteiro").refine(data => !!data, { message: 'The quantidade de participantes is mandatory' }),

    data:z.string({
        required_error:"Data is required",
        invalid_type_error:"Data must be a string"
    }).refine(data => !!data, { message: 'The data is mandatory' }),

    imagem:z.string({
        invalid_type_error:"Imagem must be a string"
    }).optional(),

    horario:z.string({
        invalid_type_error:"Horario must be a string"
    }).refine(data => !!data, { message: 'The Hour is mandatory' }),

    geolocalization:z.object({type: z.string(), coordinates: z.array(z.number())}),

    endereco:z.string({
         required_error:"Endereco is required",
        invalid_type_error:"Endereco must be a string"
    }).min(2).max(255).refine(data => !!data, { message: 'The endereco is mandatory' })
})



