import { UpdateEventController } from "./updateEventController";
import { UpdateEventUseCase } from "./updateEventUseCase";
import { EventRepository } from "../../repositories/implementations/EventRepository";

const eventRepository = new EventRepository();
const updateEventUseCase = new UpdateEventUseCase(eventRepository);
const updateEventController = new UpdateEventController(updateEventUseCase);

export {updateEventUseCase,updateEventController};