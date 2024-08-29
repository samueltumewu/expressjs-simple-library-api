import { Router } from "express";
import { addMemberController } from "../controllers/libraryController";

const libraryRoute = Router();
libraryRoute.post('/member', addMemberController)

export default libraryRoute