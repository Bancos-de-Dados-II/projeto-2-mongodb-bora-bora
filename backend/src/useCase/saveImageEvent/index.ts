import { SaveImageEventUseCase } from "./saveImageEventUseCase";
import { SaveImageEventController } from "./saveImageEventController";
import { EventRepository } from "../../repositories/implementations/EventRepository";

const eventRepository = new EventRepository();
const saveImageEventUseCase = new SaveImageEventUseCase(eventRepository);
const saveImageEventController = new SaveImageEventController(saveImageEventUseCase);

export {saveImageEventUseCase,saveImageEventController};