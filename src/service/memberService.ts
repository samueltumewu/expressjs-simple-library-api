import { Book } from "../models/book";
import { Member } from "../models/member";

let members: Member[] = [];

export const addMember = (memberName: string, books: Book[] = []): Member|null => {
    if (typeof books !== 'object') {
        // TODO: add to global configuration
        console.error("error format books!");
        return null;
    }
    let initBooks: Book[] = [];
    const member = new Member(memberName, initBooks);
    for (const book of books) {
        if (book.title && book.author && book.year) {
            const toBeAddedBook = new Book(book.title, book.author, book.year, 1);
            toBeAddedBook.addBorrowerId(member.id);
            initBooks.push(toBeAddedBook);
            } else {
            console.error("some books don't have title or author or year")
        }
    }
    members.push(member);
    console.log(`addMember >> ${member.printInfo()}`);
    return member;
}