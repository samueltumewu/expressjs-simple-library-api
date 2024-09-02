import {v4 as uuidv4 } from 'uuid';

export class Book {
    id: string;
    title!: string;
    author!: string;
    year!: string;
    quantityAvailable: number;
    borrowedByIdMembers: string[];

    constructor(title: string, author: string, year: string, quantity: number = 1) {
        this.id = uuidv4();
        this.title = title;
        this.author = author;
        this.year = year;
        this.borrowedByIdMembers = [];
        this.quantityAvailable = quantity;
    }

    addBorrowerId(uuidMember: string): void {
        this.quantityAvailable -= 1;
        this.borrowedByIdMembers.push(uuidMember);
    }

    removeBorrowerId(uuidMember: string): void {
        this.borrowedByIdMembers = this.borrowedByIdMembers.filter(memberId => memberId !== uuidMember);
        this.quantityAvailable += 1;
    }
}