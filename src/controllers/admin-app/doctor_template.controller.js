
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const Doctor_templateModel = require('../../models/doctor_template.model')
const { validationResult } = require('express-validator');
const DoctorModel = require('../../models/doctor.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class Doctor_templateController {
    getAll = async (req, res, next) => {
        const model = await Doctor_templateModel.findAll({
            include:[
                {model: DoctorModel, as: 'doctor', attributes: ['name']}
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
        const model = await Doctor_templateModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: DoctorModel, as: 'doctor', attributes: ['name']}
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
       const model = await Doctor_templateModel.create(req.body);
       res.send({
        error: true,
        message: 'User info',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await Doctor_templateModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.complaint = req.body.complaint;
    model.doctor_id = req.body.doctor_id;
    model.name = req.body.name;
    model.medical_history = req.body.medical_history;
    model.objective_vision = req.body.objective_vision;
    model.instrumental = req.body.instrumental;
    model.diagnos = req.body.diagnos;
    model.procedure = req.body.procedure;
    model.recommended = req.body.recommended;
    model.concomitant = req.body.concomitant;
    model.save();
    res.send({
        error: true,
        message: 'User info',
        data: model
    });
}
delete = async (req, res, next) => {
    await Doctor_templateModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: true,
        message: 'doctor_template delete',
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
module.exports = new Doctor_templateController;