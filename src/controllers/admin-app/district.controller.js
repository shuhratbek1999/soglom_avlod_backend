
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const DistrictModel = require('../../models/district.model')
const RegionModel = require('../../models/region.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class DistrictController {
    getAll = async (req, res, next) => {
        const model = await DistrictModel.findAll({
            include:[
                {model: RegionModel, as: 'region', attributes: ['id', 'name']}
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
        const model = await DistrictModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: RegionModel, as: 'region', attributes: ['id', 'name']}
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
       const model = await DistrictModel.create(req.body);
       res.send({
        error: true,
        message: 'User info',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await DistrictModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.region_id = req.body.region_id;
    model.save();
    res.send({
        error: true,
        message: 'User info',
        data: model
    });
}
delete = async (req, res, next) => {
    await DistrictModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: true,
        message: 'district delete',
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
module.exports = new DistrictController;