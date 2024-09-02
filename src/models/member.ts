import { v4 as uuidv4 } from 'uuid';
import { Book } from './book';

export class Member {
    MemberId: string;
    name: string;
    address: string;
    booksBorrowed: Book[]; 

    constructor(memberId: string = uuidv4(), name: string, address: string, books: Book[] = []) {
        this.MemberId = memberId;
        this.name = name;
        this.address = address;

        this.booksBorrowed = books;
    }

    borrowBookByTitle(bookTitle: string): boolean {
        const currBook = this.booksBorrowed.filter((currBook) => currBook.title === bookTitle)[0];
        const isAvailable = currBook.quantityAvailable > 0 ? true:false;
        if (!isAvailable) {
            return false;
        } else {
            currBook.addBorrowerId(this.MemberId);
            this.booksBorrowed.push(currBook);
            return true;
        }
    }

    returnBookByTitle(bookTitle: string): boolean {
        const currBook = this.booksBorrowed.filter((currBook) => currBook.title === bookTitle)[0];
        const isExistInBookBorrowerList = currBook.borrowedByIdMembers.includes(bookTitle);
        if (isExistInBookBorrowerList) {
            currBook.removeBorrowerId(this.MemberId);
            this.booksBorrowed = this.booksBorrowed.filter(book => book !== currBook);
            return true;
        }    
        return false;
    }

    printInfo(): void {
        console.log(`member name: ${this.name} has ${this.booksBorrowed.length} book(s): ${JSON.stringify(this.booksBorrowed)}`);
    }
}