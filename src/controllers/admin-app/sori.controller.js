
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const soriModel = require('../../models/sori.model')
const { validationResult } = require('express-validator');
const Register_kassaModel = require('../../models/register_kassa.model');
const register_soriModel = require('../../models/register_sori.model');
const { Op } = require('sequelize');
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class soriController {
    getAll = async (req, res, next) => {
        const model = await soriModel.findAll(); 
        res.send(model)
    }

    getOne = async (req, res, next) => {
        const model = await soriModel.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!model){
            throw new HttpException(404, 'berilgan id bo\'yicha malumot yo\'q')
        }
        res.send(model)
        // client.setex("doctorOne", 3600, JSON.stringify(model))
    }

    byName = async (req, res, next) => {
        this.checkValidation(req);
        const model = await soriModel.findAll({
            attributes: ['category_id']
        })
        res.status(200).send({
            error: false,
            error_code: 201,
            message: "malumot keldi",
            data: model
        })
    }

   create = async (req, res, next) => {
       this.checkValidation(req);
       req.body.status = false;
       const model = await soriModel.create(req.body);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qoshildi',
        data: model
    });
   }
   kassa = async(req, res, next) => {
    let body = req.body, date = Math.floor(new Date().getTime() / 1000), sori;
    if(body.sori_id){
        sori = await soriModel.findOne({
             where:{
                 id: body.sori_id
             }
          })
       sori.status = true;
       sori.save();
      }
    let register_sori = {
        "date_time": date,
        "type": 0,
        "doc_type": "Kirim",
        "price": sori.dataValues.price,
        "doc_id": sori.dataValues.id,
        "status": sori.dataValues.status
    }
   let register = await register_soriModel.create(register_sori);
    let kassa = {
         "date_time": date,
         "type": 0,
         "price": sori.dataValues.price,
         "pay_type": "Naqd",
         "doc_type": "Kirim",
         "doctor_id": sori.dataValues.id,
         "place": "Sori",
         "filial_id": 0
    }
    let models = [];
    models.push(register_sori)
  await Register_kassaModel.create(kassa);
     res.send({
        error: false,
        error_code: 200,
        message: 'Malumot qoshildi',
        data: models
     })
   }

   hisobot = async(req, res, next) => {
    let query = {}, body = req.body, queryx = {};
    query.date_time = {
        [Op.gte]: body.datetime1,
        [Op.lte]: body.datetime2,
    }
    if(body.sori_id != null){
        queryx.id = {[Op.eq]: body.sori_id},
        query.doc_id = {[Op.eq]: body.sori_id}
    }
    const model = await register_soriModel.findAll({
            attributes:[
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time >= " + body.datetime1 + " and register_sori.date_time <= " + body.datetime2 + " AND register_sori.doc_type = 'Kirim' THEN register_sori.price ELSE 0 END)"), 'total_kirim'],
                [sequelize.literal("SUM(CASE WHEN register_sori.date_time >= " + body.datetime1 + " and register_sori.date_time <= " + body.datetime2 + " AND register_sori.doc_type = 'chiqim' THEN register_sori.price ELSE 0 END)"), 'total_chiqim'],
            ]
    })
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await soriModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.price = req.body.price;
    model.status = false;
    model.save();
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
 const model =   await soriModel.destroy({
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
module.exports = new soriController;