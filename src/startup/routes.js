const express = require("express");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/admin-app/user.route');
const roomRouter = require('../routes/admin-app/room.route');
const doctorRouter = require('../routes/admin-app/doctor.route');
const inspectionRouter = require('../routes/admin-app/inspection.route');
const doctor_categoryRouter = require('../routes/admin-app/doctor_category.route');
const inspector_categoryRouter = require('../routes/admin-app/inspector_category.route');
const HttpException = require('../utils/HttpException.utils');

module.exports = function(app){
        // parse requests of content-type: application/json
        // parses incoming requests with JSON payloads
        app.use(express.json());
        // enabling cors for all requests by using cors middleware
        app.use(cors());
        // Enable pre-flight
        app.options("*", cors());
        app.use(`/api/v1/admin-app/user`, userRouter);
        app.use(`/api/v1/admin-app/room`, roomRouter);
        app.use(`/api/v1/admin-app/doctor`, doctorRouter);
        app.use(`/api/v1/admin-app/inspection`, inspectionRouter);
        app.use(`/api/v1/admin-app/doctor_category`, doctor_categoryRouter);
        app.use(`/api/v1/admin-app/inspector_category`, inspector_categoryRouter);

        app.use(`/api/v1/uploads`, express.static('uploads'));

        // 404 error
        app.all('*', (req, res, next) => {
            const err = new HttpException(404, 'Endpoint Not Found');
            next(err);
        });
        
        app.use(errorMiddleware);
}