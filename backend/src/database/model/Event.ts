import mongoose from "../connection";
import { v4 } from "uuid";

const {Schema} = mongoose;

const eventoSchema = new Schema({
    id:{
        type:'UUID',
        default: v4()
    },

    title:String,
    description:String,
    quantPart:Number,
    data:String,
    imagem:String,
    horario:String,
    geolocalization:{
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    endereco:String,  
    },{
    timestamps:true
});

eventoSchema.index({descricao: "text"},
{default_language: "pt"});


const Evento = mongoose.model('Evento', eventoSchema);
export default Evento;

