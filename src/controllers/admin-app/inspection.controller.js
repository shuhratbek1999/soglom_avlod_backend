
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const inspectionModel = require('../../models/inspection.model');
const inspectionChildModel = require('../../models/inspectionChild.model');
const UserModel = require('../../models/user.model');
const inspector_categoryModel = require('../../models/inspector_category.model')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class InspectionController {
    getAll = async (req, res, next) => {
        const model = await inspectionModel.findAll({
            include:[
                {model: UserModel, as: 'User', attributes: ['id', "user_name"]},
                    {model: inspectionChildModel, as: 'inspectionChild', attributes:['norm', 'parent_id','price', 'name', 'file']},
                    {model: inspector_categoryModel, as: 'inspector_category'}
            ]
        });
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await inspectionModel.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: inspectionChildModel, as: 'inspectionChild'}
            ]
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'malumot chiqdi',
            data: model
        });
    }
  
    create = async (req, res, next) => {
        this.checkValidation(req);
       const {inspectionChild, ...inspection} = req.body;
       const model = await inspectionModel.create(inspection);
       inspectionChild.forEach(value => {
        value.id = model.id;
        inspectionChildModel.create({
            "norm": value.norm,
            "parent_id": value.id,
            "price": value.price,
            "name": value.name,
            "file": value.file
        })
       })
    //    for(let i = 0; i < inspectionChild.length; i++){
    //        inspectionChild[i].parent_id = model.id;
    //        await inspectionChildModel.create(inspectionChild[i])
    //    }
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
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
                id: model.id
            }
        })
        for(let key of inspectionChild){
           await inspectionChildModel.create({
            "norm": key.norm,
            "parent_id": key.id,
            "price": key.price,
            "name": key.name,
            "file": key.file 
           })   
        }
    //    await inspectionChild.forEach(value => {
    //         value.id = model.id;
    //         inspectionChildModel.create({
    //             "norm": value.norm,
    //             "parent_id": model.id,
    //             "price": value.price,
    //             "name": value.name,
    //             "file": value.file 
    //         })
    //        })
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
       
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar tahrirlandi',
            data: model
        });
    }

delete = async (req, res, next) => {
  const model = await inspectionModel.destroy({
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
        message: 'Malumotlar o\'chirildi',
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