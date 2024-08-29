import { Response, Request } from "express";
import { BaseDtoResponse } from "../dto/baseDtoResponse";

export const healthcheckController = (req: Request, res: Response) => {
    res.status(200).json(new BaseDtoResponse());
};