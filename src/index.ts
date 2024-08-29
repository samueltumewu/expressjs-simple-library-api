import express from 'express';
import dotenv from 'dotenv';
import { Book } from "./models/book";
import { Member } from "./models/member";
import { BaseDtoResponse } from './dto/baseDtoResponse';
import { BaseDtoMemberResponse } from './dto/baseDtoMemberResponse';

// App properties
dotenv.config({path: ['.env']});

// Api
const app = express();
app.use(express.json());

let members: Member[] = [];
let books: Book[] = [];

//controller
const BASE_ENDPOINT = '/api/library';
const apiMainRouter = express.Router();

apiMainRouter.get('/', (req, res) => {
    return res.json(new BaseDtoResponse());
})
apiMainRouter.post('/member', (req, res) => {
    const { name } = req.body;
    if (name.length <= 0)  {
        // bad request
        return res.status(500).json(new BaseDtoResponse(false, 'check the request body!'))
    }
    const newMember = new Member(name, books);
    console.log(`[post] new member: ${newMember.name}`);
    members.push(newMember);
    return res.json(new BaseDtoMemberResponse(newMember));
})


const APP_PORT = process.env.port || 3001;
app.use(BASE_ENDPOINT, apiMainRouter);
app.listen(APP_PORT, () => {
    console.log(`Server is running on port: ${APP_PORT} `);
})