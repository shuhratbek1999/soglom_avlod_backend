
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const shablon_doctorModel = require('../../models/shablon_doctor.model')
const RegionModel = require('../../models/region.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class shablon_doctorController {
    getAll = async (req, res, next) => {
        const model = await shablon_doctorModel.findAll();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        })
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await shablon_doctorModel.findOne({
            where:{
                id: req.params.id
            },
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumot chiqdi',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await shablon_doctorModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
    
   shablonDoctor = async(req, res, next) => {
    const model = await shablon_doctorModel.findAll({
        where:{
            doctor_id: req.body.doctor_id
        }
    })
    if(!model){
        throw new HttpException(404, "malumot topilmadi")
    }
    res.send({
        error: false,
        error_code: 0,
        message: 'Malumotlar chiqdi',
        data: model
    })
   }

   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await shablon_doctorModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.doctor_id = req.body.doctor_id;
    model.text = req.body.text;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await shablon_doctorModel.destroy({
        where:{
          id: req.params.id
        }
    });
    if(!model){
        throw new HttpException(404, "bunday id yoq")
    }
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumot o\'chirildi',
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
module.exports = new shablon_doctorController;