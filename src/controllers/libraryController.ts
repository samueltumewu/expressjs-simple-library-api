import { Request, Response } from "express";
import { baseDtoLibraryResponse } from "../dto/baseDtoLibraryResponse";
import { BaseDtoResponse } from "../dto/baseDtoResponse";
import { addMember } from "../service/memberService";
import myDynamoDB from "../db/DynamoDb";
import { Member } from "../models/member";

const addMemberController = (req: Request, res: Response) => {
    const { name, address, books } = req.body;
    if (name.length <= 0)  {
        // bad request
        return res.status(500).json(new BaseDtoResponse(false, 'check the request body!'))
    }
    const member = addMember(name, address, books);
    res.json(new baseDtoLibraryResponse(member));
};

const mapToMemberObject = (jsonItem: any): Member[] => {
    let members: Member[] = [];
    for (let member of jsonItem) {
        const buildMember = new Member(member.MemberId, member.name, member.address, member.booksBorrowed);
        members.push(buildMember);
        members[members.length-1].printInfo();
    }
    return members;
}
const getAllMemberController = async (req: Request, res: Response) => {
    //TODO: map the books!
    try {
        const dbClient = myDynamoDB.getClient();
        const params = {
            TableName: 'library_member',
        }
        const result = await dbClient.scan(params).promise();
        console.log(`data getall: ${result.$response.data}`);
        console.log(`error getall: ${result.$response.error}`);
        console.log(`resultItem getall: ${JSON.stringify(result.Items, null, 2)}`);
        const member: Member[] = mapToMemberObject(result.Items);
        res.status(200).json(new baseDtoLibraryResponse(member, '0000', 'success', true))
    } catch (err) {
        console.error(err);
        res.status(500).json(new BaseDtoResponse(false, 'internal server error', '9999'));
    }
}

export {
    addMemberController
    ,getAllMemberController
}