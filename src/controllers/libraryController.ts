import { Request, Response } from "express";
import { BaseDtoMemberResponse } from "../dto/baseDtoMemberResponse";
import { BaseDtoResponse } from "../dto/baseDtoResponse";
import { addMember } from "../service/memberService";

export const addMemberController = (req: Request, res: Response) => {
    const { name, books } = req.body;
    if (name.length <= 0)  {
        // bad request
        return res.status(500).json(new BaseDtoResponse(false, 'check the request body!'))
    }
    const member = addMember(name, books);
    res.json(new BaseDtoMemberResponse(member));
};