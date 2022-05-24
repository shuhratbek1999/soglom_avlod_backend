
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const PillModel = require('../../models/pill.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class PillController {
    getAll = async (req, res, next) => {
        const model = await PillModel.findAll();
        res.send({
            error: true,
            message: 'User info',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await PillModel.findOne({
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
       const model = await PillModel.create(req.body);
       res.send({
        error: true,
        message: 'User info',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await PillModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.save();
    res.send({
        error: true,
        message: 'User info',
        data: model
    });
}
delete = async (req, res, next) => {
    await PillModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: true,
        message: 'pill delete',
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
module.exports = new PillController;