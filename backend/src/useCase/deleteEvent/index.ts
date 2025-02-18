import { EventRepository } from "../../repositories/implementations/EventRepository";
import { DeleteEventUseCase } from "./deleteEventUseCase";
import { DeleteEventController } from "./deleteEventController";

const eventRepository = new EventRepository();
const deleteEventUseCase = new DeleteEventUseCase(eventRepository);
const deleteEventController = new DeleteEventController(deleteEventUseCase);

export {deleteEventUseCase,deleteEventController};