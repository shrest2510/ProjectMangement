class ApiError extends Error { //using already built in class error in node js
    constructor(message='An error occurred', statusCode) {
        super(message); // Call the parent constructor with the error message, parent class only takes message as parameter
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
    }
}