import { Router } from "express";
import { findByIdEventController } from "../useCase/findByIdEvent";
import { findAllEventsController } from "../useCase/findAllEvents";
import { deleteEventController } from "../useCase/deleteEvent";
import { createEventController } from "../useCase/createEvent";
import { updateEventController } from "../useCase/updateEvent";
import { saveImageEventController } from "../useCase/saveImageEvent";
import upload from "../utils/multer";

const router = Router();

//Post
router.post('/event',(request,response)=>createEventController.handle(request,response));

//Get
router.get('/event',(request,response)=>findAllEventsController.handle(request,response));
router.get('/event/:id',(request,response)=>findByIdEventController.handle(request,response));
//router.get('/event/:name',(request,response)=>findByTitleEventController.handle(request,response));

//PUT
router.put('/event/:id',(request,response)=>updateEventController.handle(request,response));

//patch
router.patch('/event/upload-image/:id',upload.single("image"),(request,response)=>saveImageEventController.handle(request,response))

//Delete
router.delete('/event/:id',(request,response)=>deleteEventController.handle(request,response));


export default router;