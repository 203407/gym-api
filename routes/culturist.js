import {Router} from 'express'
import { upload } from '../middlewares/multer.js';
import { authenticate}  from "../middlewares/auth.js";
export const culturistRouter = Router()
import { culturisController } from '../dependencies/dependencies.js';

culturistRouter.get('/',authenticate(), culturisController.getAllCulturist)
culturistRouter.post('/',authenticate(),upload.single("filename"), culturisController.createCulturist)
culturistRouter.get('/byuser',authenticate(), culturisController.getCulturisByUserId)

