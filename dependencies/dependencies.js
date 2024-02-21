import { UserModel } from "../model/postgresql/userModel.js";
import { UserController } from "../controller/userController.js";
import { RutineController } from "../controller/rutineController.js";
import { RutineModel } from "../model/postgresql/rutineModel.js";
import { SectionRutineModel } from "../model/postgresql/sectionrutineModel.js";
import { CulturistController } from "../controller/culturistController.js";
import { CulturisModel } from "../model/postgresql/culturistModel.js";

export const userController = new UserController(UserModel)
export const rutineController = new RutineController(RutineModel,SectionRutineModel)
export const culturisController = new CulturistController(CulturisModel)

