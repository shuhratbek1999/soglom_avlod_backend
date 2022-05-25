
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const QueueModel = require('../../models/queue.model')
const { validationResult } = require('express-validator');
const RoomModel = require('../../models/room.model');
const PatientModel = require('../../models/patient.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class QueueController {
    getAll = async (req, res, next) => {
        const model = await QueueModel.findAll({
            include:[
                {model: RoomModel, as: 'room', attributes: ['id', 'name']},
                {model: PatientModel, as: 'patient', attributes: ['id', 'name']}
            ]
        });
        res.send({
            error: true,
            message: 'User info',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await QueueModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: RoomModel, as: 'room', attributes: ['id', 'name']},
                {model: PatientModel, as: 'patient', attributes: ['id', 'name']}
            ]
        });
        res.send({
            error: true,
            message: 'User info',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await QueueModel.create(req.body);
       res.send({
        error: true,
        message: 'User info',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await QueueModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.room_id = req.body.room_id;
    model.patient_id = req.body.patient_id;
    model.number = req.body.number;
    model.date_time = req.body.date_time;
    model.status = req.body.status;
    model.save();
    res.send({
        error: true,
        message: 'User info',
        data: model
    });
}
delete = async (req, res, next) => {
    await QueueModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: true,
        message: 'queue delete',
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
module.exports = new QueueController;