import { Book } from "../models/book";
import { Member } from "../models/member";
import myDynamoDB from "../db/DynamoDb";
import Config from "../config/Config";
import { v4 as uuidv4 } from 'uuid';


const mapToMemberObject = (jsonItem: any): Member[] => {
    let members: Member[] = [];
    for (let member of jsonItem) {
        const buildMember = new Member(member.MemberId, member.name, member.address, member.booksBorrowed);
        members.push(buildMember);
        members[members.length - 1].printInfo();
    }
    return members;
}
const getAllMember = async (): Promise<Member[]> => {
    const dbClient = myDynamoDB.getClient();
    const params = {
        TableName: Config.DYNAMO_DB_TABLENAME_LIBRARY,
    }
    const result = await dbClient.scan(params).promise();
    console.debug(`resultItem getall: ${JSON.stringify(result.Items, null, 2)}`);
    const member: Member[] = mapToMemberObject(result.Items);
    return member;
}
const addMember = async (memberName: string, address: string, books: Book[] = []): Promise<Member|null> => {
    if (typeof books !== 'object') {
        // TODO: add to global configuration
        console.error("error format books!");
        return null;
    }
    let initBooks: Book[] = [];
    const member = new Member(uuidv4(), memberName, address, initBooks);
    for (const book of books) {
        if (book.title && book.author && book.year) {
            const toBeAddedBook = new Book(book.title, book.author, book.year, 1);
            toBeAddedBook.addBorrowerId(member.MemberId);
            initBooks.push(toBeAddedBook);
        } else {
            console.error("some books don't have title or author or year")
        }
    }
    console.log(`addMember >> ${member.printInfo()}`);

    const params = {
        TableName: Config.DYNAMO_DB_TABLENAME_LIBRARY,
        Item: {
            MemberId: member.MemberId,
            name: member.name,
            address: member.address,
            booksBorrowed: member.booksBorrowed
        },
    };
    const result = await myDynamoDB.getClient().put(params).promise();
    console.log(result.$response.httpResponse, result.$response.data);
    return member;
}

export {
    addMember
    ,getAllMember
}