
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const Doctor_categoryModel = require('../../models/doctor_category.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class DoctorController {
    getAll = async (req, res, next) => {
        const model = await Doctor_categoryModel.findAll();
        res.send(model);
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await Doctor_categoryModel.findOne({
            where:{
                id: req.params.id
            }
        });
        res.send(model);
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await Doctor_categoryModel.create(req.body);
       res.send(model)
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await Doctor_categoryModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.price = req.body.price
    model.save();
    res.send(model);
}
delete = async (req, res, next) => {
    await Doctor_categoryModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send('ochirildii')
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