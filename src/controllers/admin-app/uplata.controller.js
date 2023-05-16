
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const UplataModel = require('../../models/uplata.model')
const RegionModel = require('../../models/region.model')
const { validationResult } = require('express-validator');
const UserModel = require('../../models/user.model');
const Register_kassaModel = require('../../models/register_kassa.model');
const register_doctorModel = require('../../models/register_doctor.model');
const Register_inspectionModel = require('../../models/register_inspection.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class UplateController {
    getAll = async (req, res, next) => {
        const model = await UplataModel.findAll(req.body);
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await UplataModel.findOne({
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
    let data =Math.floor(new Date().getTime() / 1000);
       this.checkValidation(req);
       const model = await UplataModel.create({
        "name": req.body.name,
        "user_id": req.body.user_id,
        "doctor_id": req.body.doctor_id,
        "type": req.body.type,
        "date_time": req.body.date_time,
        "price": req.body.price,
       }); 
       const ModelUser = await UserModel.findAll({
        where:{
            id: req.body.user_id
        },
        raw: true
    })
       let pay_type = null;
       if(req.body.type == 0){
          pay_type = "Naqt"
       }
       else{
        pay_type = "Plastik"
       }
     await  Register_kassaModel.create({
          "date_time": data,
          "type": req.body.type,
          "price": req.body.price,
          "pay_type": pay_type,
          "doc_type": "Chiqim",
          "doctor_id": model.id,
          "place": "uplata"
       })
        ModelUser.forEach(val => {
            if(val.doctor_id != 0){
                register_doctorModel.create({
                    "date_time": data,
                    "type": req.body.type,
                    "price": req.body.price,
                    "doc_id": model.id, 
                    "doctor_id": val.doctor_id,
                    "doc_type": 'Chiqim',
                    "place": "Oplata"
             })
            } else if(val.inspection_category_id != 0){
                Register_inspectionModel.create({
                    "date_time": data,
                    "type": req.body.type,
                    "price": req.body.price,
                    "doc_id": model.id,
                    "user_id": req.body.user_id,
                    "inspection_id": val.inspection_category_id,
                    "inspection_category": val.inspection_category_id,
                    "skidka": 0,
                    "doc_type": 'Chiqim',
                    "place": "Oplata"
                  })
            }
        })
      
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
    let data =Math.floor(new Date().getTime() / 1000);
       this.checkValidation(req);
    const model = await UplataModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.name = req.body.name;
    model.user_id = req.body.user_id;
    model.doctor_id = req.body.doctor_id;
    model.price = req.body.price;
    model.type = req.body.type;
    model.date_time = req.body.date_time;
    model.save();
    await Register_kassaModel.destroy({
        where:{
           doctor_id: req.params.id,
           doc_type: 'Chiqim',
           place: 'uplata'
        }
    })
    const ModelUser = await UserModel.findAll({
        where:{
            id: req.body.user_id
        },
        raw: true
    })
       let pay_type = null;
       if(req.body.type == 0){
          pay_type = "Naqt"
       }
       else{
        pay_type = "Plastik"
       }
     await  Register_kassaModel.create({
          "date_time": data,
          "type": req.body.type,
          "price": req.body.price,
          "pay_type": pay_type,
          "doc_type": "Chiqim",
          "doctor_id": model.id,
          "place": "uplata"
       })
        ModelUser.forEach(async val => {
            if(val.doctor_id != 0){
                await register_doctorModel.destroy({
                    where:{
                        doc_id: req.params.id,
                        doc_type: 'Chiqim'
                    }
                })
                register_doctorModel.create({
                    "date_time": data,
                    "type": req.body.type,
                    "price": req.body.price,
                    "doc_id": model.id, 
                    "doctor_id": val.doctor_id,
                    "doc_type": 'Chiqim',
                    "place": "Oplata"
             })
            } else if(val.inspection_category_id != 0){
                await Register_inspectionModel.destroy({
                    where:{
                        doc_id: req.params.id,
                        doc_type: 'Chiqim'
                    }
                })
                Register_inspectionModel.create({
                    "date_time": data,
                    "type": req.body.type,
                    "price": req.body.price,
                    "doc_id": model.id,
                    "user_id": req.body.user_id,
                    "inspection_id": val.inspection_category_id,
                    "inspection_category": val.inspection_category_id,
                    "skidka": 0,
                    "doc_type": 'Chiqim',
                    "place": "Oplata"
                  })
            }
        })
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await UplataModel.destroy({
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
module.exports = new UplateController;