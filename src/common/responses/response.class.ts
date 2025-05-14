export class SuccessResponse<T> {
    success: boolean;
    message: string;
    data: T;

    constructor(message: string, data: T) {
        this.success = true;
        this.message = message;
        this.data = data;
    }
}

export class ErrorResponse {
    success: boolean;
    message: string;
    error: any;

    constructor(message: string, error: any) {
        this.success = false;
        this.message = message;
        this.error = error;
    }
}
