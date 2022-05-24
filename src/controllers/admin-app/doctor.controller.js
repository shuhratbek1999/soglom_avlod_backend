
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const DoctorModel = require('../../models/doctor.model')
const { validationResult } = require('express-validator');
const InspectionModel = require('../../models/inspector_category.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class DoctorController {
    getAll = async (req, res, next) => {
        const model = await DoctorModel.findAll({ 
            // include:[
            //     {model: InspectionModel, as: 'inspection', attributes: ['name']}
            // ]
        });
        res.send({
            error: true,
            message: 'User info',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await DoctorModel.findOne({
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
       const model = await DoctorModel.create(req.body);
       res.send({
        error: true,
        message: 'User info',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await DoctorModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.category_id = req.body.category_id
    model.save();
    res.send({
        error: true,
        message: 'User info',
        data: model
    });
}
delete = async (req, res, next) => {
    await DoctorModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: true,
        message: 'doctor delete',
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
module.exports = new DoctorController;