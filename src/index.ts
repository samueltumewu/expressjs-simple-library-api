import express from 'express';
import dotenv from 'dotenv';
import { Book } from "./models/book";
import { Member } from "./models/member";
import { BaseDtoResponse } from './dto/baseDtoResponse';

// App properties
dotenv.config({path: ['.env']});
console.log(process.env)

// Api
const app = express();
app.use(express.json());

let members: Member[] = [];
let books: Book[] = [];

//controller

const apiMainRouter = express.Router();

apiMainRouter.get('/', (req, res) => {
    return res.json(new BaseDtoResponse());
})


const APP_PORT = process.env.port || 3001;
app.use('/api/library', apiMainRouter);
app.listen(APP_PORT, () => {
    console.log(`Server is running on port: ${APP_PORT} `);
})