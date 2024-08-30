import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import DbInterface from './DbInterface.js';

export default class myDynamoDB implements DbInterface 
{
    private dynamoDB: AWS.DynamoDB.DocumentClient;
    constructor() {
        dotenv.config();

        AWS.config.update({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

        this.dynamoDB = new AWS.DynamoDB.DocumentClient();
    }
    getClient() {
        return this.dynamoDB;        
    }   
}