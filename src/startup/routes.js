const express = require("express");
const cors = require("cors");
const path = require("path");
const errorMiddleware = require('../middleware/error.middleware');
const userRouter = require('../routes/admin-app/user.route');
const roomRouter = require('../routes/admin-app/room.route');
const districtRouter = require('../routes/admin-app/district.route')
const doctorRouter = require('../routes/admin-app/doctor.route');
const patientRouter = require('../routes/admin-app/patient.route');
const pillRouter = require('../routes/admin-app/pill.route');
const queueRouter = require('../routes/admin-app/queue.route');
const regionRouter = require('../routes/admin-app/region.route');
const inspectionRouter = require('../routes/admin-app/inspection.route');
const Doctor_templateRouter = require('../routes/admin-app/doctor_template.route');
const doctor_categoryRouter = require('../routes/admin-app/doctor_category.route');
const inspector_categoryRouter = require('../routes/admin-app/inspector_category.route');
const registerRouter = require('../routes/admin-app/registration.route')
const kassa_orderRouter = require('../routes/admin-app/kassa_order.route')
const expenseRouter = require('../routes/admin-app/expense.route')
const palataRouter = require('../routes/admin-app/palata.route')
const RegDoctor = require('../routes/admin-app/registerDoctor.route')
const UploadRouter = require('../routes/admin-app/upload.route')
const imgRouter = require('../routes/admin-app/upload_img.route')
const arxiv = require('../routes/admin-app/registration_arxiv.route')
const uplata = require('../routes/admin-app/uplate')
const shablon_Doctor = require('../routes/admin-app/shablon_doctor.route')
const register_mkb = require('../routes/admin-app/register_mkb.route')
const inspection_info = require('../routes/admin-app/inspection_info.route')
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
        app.use(`/api/v1/admin-app/district`, districtRouter);
        app.use(`/api/v1/admin-app/patient`, patientRouter);
        app.use(`/api/v1/admin-app/pill`, pillRouter);
        app.use(`/api/v1/admin-app/queue`, queueRouter);
        app.use(`/api/v1/admin-app/region`, regionRouter);
        app.use(`/api/v1/admin-app/registration`, registerRouter);
        app.use(`/api/v1/admin-app/doctor_template`, Doctor_templateRouter);
        app.use(`/api/v1/admin-app/doctor_category`, doctor_categoryRouter);
        app.use(`/api/v1/admin-app/inspector_category`, inspector_categoryRouter);
        app.use(`/api/v1/admin-app/kassa_order`, kassa_orderRouter);
        app.use(`/api/v1/admin-app/expense`, expenseRouter);
        app.use(`/api/v1/admin-app/palata`, palataRouter);
        app.use(`/api/v1/admin-app/register_doctor`, RegDoctor);
        app.use(`/api/v1/admin-app/upload`, UploadRouter);
        app.use(`/api/v1/admin-app/uploads`, imgRouter);
        app.use(`/api/v1/admin-app/arxiv`, arxiv);
        app.use(`/api/v1/admin-app/uplata`, uplata);
        app.use(`/api/v1/admin-app/shablon_doctor`, shablon_Doctor);
        app.use(`/api/v1/admin-app/register_mkb`, register_mkb);
        app.use(`/api/v1/admin-app/info`, inspection_info);

        app.use(`/href`, express.static('upload'));

        // 404 error
        app.all('*', (req, res, next) => {
            const err = new HttpException(404, 'Endpoint Not Found');
            next(err);
        });
        
        app.use(errorMiddleware);
}