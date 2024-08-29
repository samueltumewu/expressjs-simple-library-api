import { Router } from "express";
import { healthcheckController } from "../controllers/baseController";

const baseRoute = Router();
baseRoute.get('/', healthcheckController);

export default baseRoute;