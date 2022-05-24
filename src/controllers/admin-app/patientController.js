
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const PatientModel = require('../../models/patient.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class PatientController {
    getAll = async (req, res, next) => {
        const model = await PatientModel.findAll();
        res.send({
            error: true,
            message: 'User info',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await PatientModel.findOne({
            where:{
                id: req.params.id
            }
        });
        res.send({
            error: true,
            message: 'User info',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await PatientModel.create(req.body);
       res.send({
        error: true,
        message: 'User info',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await PatientModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.fullname = req.body.fullname;
    model.lastname = req.body.lastname;
    model.patronymic = req.body.patronymic;
    model.region_id = req.body.region_id;
    model.district_id = req.body.district_id;
    model.phone = req.body.phone;
    model.password = req.body.password;
    model.gender = req.body.gender;
    model.address = req.body.address;
    model.birthday = req.body.birthday;
    model.save();
    res.send({
        error: true,
        message: 'User info',
        data: model
    });
}
delete = async (req, res, next) => {
    await PatientModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: true,
        message: 'patient delete',
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