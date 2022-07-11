
const HttpException = require('../../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const inspectionModel = require('../../models/inspection.model');
const inspectionChildModel = require('../../models/inspectionChild.model');
const UserModel = require('../../models/user.model');
const inspector_categoryModel = require('../../models/inspector_category.model')
const DoctorCategory = require('../../models/doctor_category.model')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class InspectionController {
    getAll = async (req, res, next) => {
        const model = await inspectionModel.findAll({
            include:[
                {model: UserModel, as: 'User', attributes: ['id', "user_name"]},
                    {model: inspectionChildModel, as: 'InspectionChild'},
                    {model: DoctorCategory, as: 'doctor_category'}
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
                {model: inspectionChildModel, as: 'InspectionChild'},
                {model: DoctorCategory, as: 'doctor_category'}
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
        // for(var element of req.body){
        //     var {inspection, inspectionChild, ...data} = element;
        //     console.log(data);
        // }
       const {inspectionChild, ...inspection} = req.body;
       const model = await inspectionModel.create(inspection);
       for(let i = 0; i < inspectionChild.length; i++){
           inspectionChild[i].parent_id = model.id;
           await inspectionChildModel.create(inspectionChild[i])
       }
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