export class BaseDtoResponse {
    success: boolean;
    message: string;
    constructor(success: boolean = true, message: string = 'api can be accessed!') {
        this.success = success;
        this.message = message;
    }
}