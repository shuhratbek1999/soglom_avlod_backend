
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
        res.send(model);
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await RoomModel.findOne({
            where:{
                id: req.params.id
            }
        });
        res.send(model);
    }
   create = async (req, res, next) => {
       this.checkValidation(req);
       const model = await RoomModel.create(req.body);
       res.send(model)
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await RoomModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.save();
    res.send(model);
}
delete = async (req, res, next) => {
    await RoomModel.destroy({
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
module.exports = new RoomController;