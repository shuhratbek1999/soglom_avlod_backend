
const HttpException = require('../../utils/HttpException.utils');
const BemorModel = require('../../models/patient.model')
// const status = require('../../utils/status.utils')
const RegisterPatientModel = require('../../models/register_patient.model')
const { validationResult } = require('express-validator');
const sequelize = require("../../db/db-sequelize");


/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class PatientController {
    getAll = async (req, res, next) => {
        let query = {};
        query.type = 1;
        const model = await RegisterPatientModel.findAll({
            include:[
                {
                    model:BemorModel,
                    attributes:['id','fullname'],
                    as:'patient',
                    required:false
                }
            ],
            where: query,
            limit: 100
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    getAllPatient = async (req, res, next) => {
        const model = await BemorModel.findAll({
            attributes:['id','fullname'],
            where: {
                balance:true
            },
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await RegisterPatientModel.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!model) {
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'malumot chiqdi',
            data: model
        });
    }

    getPatientBalance = async (req, res, next) => {
        let { patient_id } = req.body;
        let query = {};
        if(patient_id){
            query.patient_id = patient_id
        }

        const model = await RegisterPatientModel.findAll({
            attributes:[
                'id','patient_id',
				[sequelize.literal('SUM(summa * power(-1, type + 1) )'), 'total_balance'],
            ],
            where: query
        });
        
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'malumot chiqdi',
            data: model
        });
    }
    create = async (req, res, next) => {
        let body = req.body;
        console.log(body)
        this.checkValidation(req);
        const model = await RegisterPatientModel.create({
            'patient_id': body.patient_id,
            'doc_id': body.doc_id,
            'summa': body.summa,
            'registration_id': body.registration_id,
            'datetime': parseInt(body.datetime),
            'type': body.type,
            'place': body.place,
            'doc_type': body.doc_type
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar qo\'shildi',
            data: model
        });
    }
    update = async (req, res, next) => {
        this.checkValidation(req);
        let body = req.body
        const model = await RegisterPatientModel.findOne({
            where: {
                id: req.params.id
            }
        });
        model.patient_id = body.patient_id;
        model.doc_id = body.doc_id;
        model.summa = body.summa;
        model.registration_id = body.registration_id;
        model.datetime = body.datetime;
        model.type = body.type;
        model.place = body.place;
        model.doc_type = body.doc_type;

        model.save();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }
    search = async (req, res, next) => {
        let data = await RegisterPatientModel.find(
            {
                "$or": [
                    { "patient_id": { $regex: req.params.key } }
                ]
            }
        )
        
        res.send(data)
    }

    delete = async (req, res, next) => {
        const model = await RegisterPatientModel.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!model) {
            throw new HttpException(404, "bunday id yoq")
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar o\'chirildi',
            data: model
        });
    }
    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }


}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new PatientController;