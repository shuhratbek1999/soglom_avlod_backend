
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const RoomModel = require('../../models/room.model')
const { validationResult } = require('express-validator');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class RoomController {
    getAll = async (req, res, next) => {
        const model = await RoomModel.findAll();
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        const model = await RoomModel.findOne({
            where:{
                id: req.params.id
            }
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
       const model = await RoomModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   filial = async(req, res, next) => {
    const model = await RoomModel.findAll({
        where:{
            fill_id: req.params.id
        }
    })
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar chiqdi',
        data: model
    });
   }

   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await RoomModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.filial_id = req.body.filial_id;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model =  await RoomModel.destroy({
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
module.exports = new RoomController;