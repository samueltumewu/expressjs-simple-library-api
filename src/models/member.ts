import { v4 as uuidv4 } from 'uuid';
import { Book } from './book';

export class Member {
    id: string;
    name: string;
    booksBorrowed: Book[]; 

    constructor(name: string, books: Book[] = []) {
        this.id = uuidv4();
        this.name = name;
        this.booksBorrowed = books;
    }

    borrowBookByTitle(bookTitle: string): boolean {
        const currBook = this.booksBorrowed.filter((currBook) => currBook.title === bookTitle)[0];
        const isAvailable = currBook.quantity > 0 ? true:false;
        if (!isAvailable) {
            return false;
        } else {
            currBook.addBorrowerId(this.id);
            this.booksBorrowed.push(currBook);
            return true;
        }
    }

    returnBookByTitle(bookTitle: string): boolean {
        const currBook = this.booksBorrowed.filter((currBook) => currBook.title === bookTitle)[0];
        const isExistInBookBorrowerList = currBook.borrowedByIdMembers.includes(bookTitle);
        if (isExistInBookBorrowerList) {
            currBook.removeBorrowerId(this.id);
            this.booksBorrowed = this.booksBorrowed.filter(book => book !== currBook);
            return true;
        }    
        return false;
    }

    printInfo(): string {
        return `member name: ${this.name} has ${this.booksBorrowed.length} book(s): ${JSON.stringify(this.booksBorrowed)}`;
    }
}