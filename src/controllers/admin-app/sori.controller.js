
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const soriModel = require('../../models/sori.model')
const { validationResult } = require('express-validator');
const Register_kassaModel = require('../../models/register_kassa.model');
const register_soriModel = require('../../models/register_sori.model');
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
    if(body.status == 0){
        sori = await soriModel.findOne({
             where:{
                 id: body.id
             }
          })
       sori.name = body.name;
       sori.price = body.price;
       sori.status = true;
       sori.save();
      }
    let register_sori = {
        "date_time": date,
        "type": 0,
        "doc_type": "Kirim",
        "price": body.price,
        "doc_id": body.id
    }
    await register_soriModel.create(register_sori);
    let kassa = {
         "date_time": date,
         "type": 0,
         "price": body.price,
         "pay_type": "Naqd",
         "doc_type": "Kirim",
         "doctor_id": sori.id,
         "place": "Sori",
         "filial_id": 0
    }
     const model = await Register_kassaModel.create(kassa);
     res.send({
        error: false,
        error_code: 200,
        message: 'Malumot qoshildi',
        data: model
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