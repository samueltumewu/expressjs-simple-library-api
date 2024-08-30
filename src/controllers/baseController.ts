import { Response, Request } from "express";
import { BaseDtoResponse } from "../dto/baseDtoResponse";
import myDynamoDB from "../db/DynamoDb";

export const healthcheckController = async (req: Request, res: Response) => {
    try {
        const dynamoDBClient = new myDynamoDB().getClient();
        const params = {
            TableName: 'library_ember',
            Key: {
                MemberId: 'test123'
            }
        };
        const result = await dynamoDBClient.get(params).promise();
        console.log(`result: ${result}`);
        console.log(`resultitem: ${JSON.stringify(result.Item)}`);
        res.status(200).json(new BaseDtoResponse());
    } catch (err) {
        console.error(err);
        res.status(500).json(new BaseDtoResponse(false, 'internal server error', '9999'));
    }
};