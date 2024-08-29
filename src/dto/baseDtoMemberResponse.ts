import { Member } from "../models/member";
import { BaseDtoResponse } from "./baseDtoResponse";

export class BaseDtoMemberResponse extends BaseDtoResponse {
    data: Member | Member[] | null;
    constructor(data: Member | Member[] | null, responseCode: string = '0000', message: string = '', status: boolean = true) {
        super(status, message, responseCode);
        this.data = data;
    }
}