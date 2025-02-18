import { FindAllEventsController } from "./findAllEventsController";
import { FindAllEventsUseCase } from "./findAllEventsUseCase";
import { EventRepository } from "../../repositories/implementations/EventRepository";

const eventRepository =  new EventRepository();
const findAllEventsUseCase = new FindAllEventsUseCase(eventRepository);
const findAllEventsController = new FindAllEventsController(findAllEventsUseCase);

export {findAllEventsUseCase,findAllEventsController};
