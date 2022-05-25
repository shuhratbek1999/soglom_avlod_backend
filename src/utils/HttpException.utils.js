class HttpException extends Error {
    constructor(error, message, data) {
        super(message);
        this.error = error;
        this.message = message;
        this.data = data;
    }
}

module.exports = HttpException;