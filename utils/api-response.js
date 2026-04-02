// Standard API response format for data output - Instead of sending random JSON shapes from different endpoints, you enforce a uniform format:

class Apiresponse {   // Create a class to standardize API responses when it is called constructor is first invoked
    constructor(statusCode,data,message='Success') {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = statusCode >= 200 && statusCode < 400;
    }
}

export {Apiresponse};