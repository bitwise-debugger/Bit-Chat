class CustomError extends Error {
    constructor(name, code, message = 'An unknown Error Occured') {
        super(message);
        this.name = name || 'Unknown Error';
        this.statusCode = code || 500;
        this.trace = this.stack;
    }
}

module.exports = CustomError;