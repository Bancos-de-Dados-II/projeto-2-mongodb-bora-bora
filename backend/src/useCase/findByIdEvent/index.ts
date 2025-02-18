import { EventRepository } from "../../repositories/implementations/EventRepository";
import { FindByIdEventUseCase } from "./findByIdEventUseCase";
import { FindByIdEventController } from "./findByIdEventController";

const eventRepository = new EventRepository();
const findByIdEventUseCase = new FindByIdEventUseCase(eventRepository);
const findByIdEventController = new FindByIdEventController(findByIdEventUseCase);

export {findByIdEventUseCase,findByIdEventController};
