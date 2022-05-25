
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const RegionModel = require('../../models/region.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RegionController {
    getAll = async (req, res, next) => {
        const model = await RegionModel.findAll();
        res.send({
            error: false,
            error_code: 200,
            message: 'User info',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await RegionModel.findOne({
            where:{
                id: req.params.id
            }
        });
        res.send({
            error: false,
            error_code: 200,
            message: 'User info',
            data: model
        });
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await RegionModel.create(req.body);
       res.send({
        error: false,
        error_code: 200,
        message: 'User info',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await RegionModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.save();
    res.send({
        error: false,
        error_code: 200,
        message: 'User info',
        data: model
    });
}
delete = async (req, res, next) => {
    await RegionModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: false,
        error_code: 200,
        message: 'User info',
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
module.exports = new RegionController;