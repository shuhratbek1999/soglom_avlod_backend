
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const palataModel = require('../../models/palata.model')
const { validationResult } = require('express-validator');
const InspectionModel = require('../../models/inspector_category.model');
const register_palataModel = require('../../models/register_palata.model')
const {Op} = require('sequelize')

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class palataController {
    getAll = async (req, res, next) => {
        const model = await palataModel.findAll({ 
        
        }); 
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }
    palata = async(req, res, next) => {
        let query = {}, queryx = {};
        let body = req.body;
        let datetime1 = body.datetime1;
        let datetime2 = body.datetime2;
        query.date_time = {
            [Op.gte]: body.datetime1,
            [Op.lte]: body.datetime2,
        } 
        if(body.palata_id !== null){
            query.id = {[Op.eq] : body.palata_id }  
            queryx.palata_id = {[Op.eq]: body.palata_id}
        };
         let model = await palataModel.findAll({
            include:[
                {model: register_palataModel, as: 'register_palata', attributes: ['id','price','date_time','date_to','date_do']}
            ]
         })
         let bugun = Math.floor(new Date().getDate()/1000);
         for(let i = 0; i < model.length; i++){
             if(model[i].dataValues.register_palata.length > 0){
                for(let key of model[i].dataValues.register_palata){
                    if(key.dataValues.date_do < bugun){
                        model[i].dataValues.text = "pul tolagan vaqti tugagan lekin yotipdi"
                    }
                    else{
                        model[i].dataValues.text = "pul tolagan, vaqti tugamagan yotipdi"
                    }
                 }
             }
             else{
                model[i].dataValues.text = "palata bo'sh"
             }
         }
        res.send(model);
    }
    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await palataModel.findOne({
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
       const model = await palataModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qoshildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await palataModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.price = req.body.price,
    model.status = req.body.status
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =   await palataModel.destroy({
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
module.exports = new palataController;