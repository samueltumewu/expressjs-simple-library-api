import { Request, Response } from "express";
import { baseDtoLibraryResponse } from "../dto/baseDtoLibraryResponse";
import { BaseDtoResponse } from "../dto/baseDtoResponse";
import { addMember, getAllMember } from "../service/memberService";

const addMemberController = async (req: Request, res: Response) => {
    const { name, address, books } = req.body;
    if (name.length <= 0) {
        // bad request
        return res.status(500).json(new BaseDtoResponse(false, 'check the request body!'))
    }

    try {
        const member = await addMember(name, address, books);
        res.json(new baseDtoLibraryResponse(member, '0000', 'success', true));
    } catch (err) {
        if (err instanceof Error) {
            console.error(`error from addMemberController: ${err.name}: ${err.message}`)
            console.error(err)
        } else {
            console.error(`unknown error: `, err)
        }
        res.status(500).json(new BaseDtoResponse(false, 'internal server error', '9999'));
    }
};


const getAllMemberController = async (req: Request, res: Response) => {
    try {
        const currMember = await getAllMember();
        res.status(200).json(new baseDtoLibraryResponse(currMember, '0000', 'success', true))
    } catch (err) {
        if (err instanceof Error) {
            console.error(`error from getAllMemberController: ${err.name}: ${err.message}`)
        } else {
            console.error(`unknown error: `, err)
        }
        res.status(500).json(new BaseDtoResponse(false, 'internal server error', '9999'));
    }
}

export {
    addMemberController
    , getAllMemberController
}