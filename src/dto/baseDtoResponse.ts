export class BaseDtoResponse {
    success: boolean;
    message: string;
    responseCode: string;
    constructor(success: boolean = true, message: string = 'api can be accessed!', responseCode: string = '0000') {
        this.success = success;
        this.message = message;
        this.responseCode = responseCode;
    }
}