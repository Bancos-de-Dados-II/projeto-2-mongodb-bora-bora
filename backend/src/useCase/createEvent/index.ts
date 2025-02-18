import { CreateEventUseCase } from "./createEventUseCase";
import { CreateEventController } from "./createEventController";
import { EventRepository } from "../../repositories/implementations/EventRepository";


const eventRepository = new EventRepository();
const createEventUseCase = new CreateEventUseCase(eventRepository);
const createEventController = new CreateEventController(createEventUseCase);

export {createEventUseCase,createEventController};