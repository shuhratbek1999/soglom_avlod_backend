
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const inspectionModel = require('../../models/inspection.model');
const inspectionChildModel = require('../../models/inspectionChild.model');
const UserModel = require('../../models/user.model');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class InspectionController {
    getAll = async (req, res, next) => {
        const model = await inspectionModel.findAll({
            include:[
                {model: UserModel, as: 'User', attributes: ['id', "user_name"]},
                {model: inspectionChildModel, as: 'InspectionChild', attributes: ['id', 'name']}
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
        const model = await inspectionModel.findOne({
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
       const {inspectionChild, ...inspection} = req.body;
       const model = await inspectionModel.create(inspection);
       for(let i = 0; i < inspectionChild.length; i++){
           inspectionChild[i].parent_id = model.id;
           await inspectionChildModel.create(inspectionChild[i])
       }
       res.send({
        error: true,
        message: 'User info',
        data: model
    });
    }
    update = async (req, res, next) => {
        const { inspectionChild, ...inspection } = req.body;
     const model = await inspectionModel.findOne({
            where:{
               id: req.params.id
            }
        })
        if(model === null){ 
            res.status(404).send("model mavjud emas")
        }
        await inspectionChildModel.destroy({
            where:{
                parent_id: model.id
            }
        })
        if(model === null){
            res.status(404).send("not found")
        }
        model.name = inspection.name;
        model.parent_id = inspection.parent_id;
        model.price = inspection.price;
        model.type = inspection.type;
        model.user_id = inspection.user_id;
        model.category_id = inspection.category_id;
        model.percent_bonus = inspection.percent_bonus;
        model.save();
        for(let i = 0; i < inspectionChild.length; i++){
            inspectionChild[i].parent_id = model.id;
            await inspectionChildModel.create(inspectionChild[i])
        }
        res.send({
            error: true,
            message: 'User info',
            data: model
        });
    }

delete = async (req, res, next) => {
    await inspectionModel.destroy({
        where:{
          id: req.params.id
        }
    });
    res.send({
        error: true,
        message: 'inspection delete',
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
module.exports = new InspectionController;