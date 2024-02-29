import { Router } from "express";
import { rutineController } from "../dependencies/dependencies.js";
import { authenticate}  from "../middlewares/auth.js";

export const rutineRouter = Router()

rutineRouter.get('/',authenticate(), rutineController.getAllRutines)
rutineRouter.post('/',authenticate(), rutineController.createRutine)
rutineRouter.get('/byuser',authenticate(),rutineController.getAllRutinesByUserId)
rutineRouter.delete('/:id',authenticate(),rutineController.deleteByRutineId)