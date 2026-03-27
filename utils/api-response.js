// Standard API response format - Instead of sending random JSON shapes from different endpoints, you enforce a uniform format:

class Apiresponse {
    constructor(statusCode,data,message='Success') {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}

export {Apiresponse};