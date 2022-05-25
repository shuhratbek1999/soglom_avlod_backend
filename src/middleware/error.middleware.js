const winston = require('winston');
function errorMiddleware(error, req, res, next) {
    let { status = 401, message, data } = error;

    console.log(`[Error] ${error}`);
    winston.error(error.message, error); 

    // If status code is 500 - change the message to Intrnal server error
    message = status === 401 || !message ? 'Internal server error' : message;
    let error_code = 201;
    error = {
        error_code,
        error: false,
        message,
        data
        // ...(data) && data
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
    data: {...} // optional 
}
*/