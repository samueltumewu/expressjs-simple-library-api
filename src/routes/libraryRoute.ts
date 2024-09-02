import { Router } from "express";
import { addMemberController, getAllMemberController } from "../controllers/libraryController";

const libraryRoute = Router();
libraryRoute.get('/member', getAllMemberController)
libraryRoute.post('/member', addMemberController)

export default libraryRoute