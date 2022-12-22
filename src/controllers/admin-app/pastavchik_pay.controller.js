
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const pastavchik_payModel = require('../../models/pastavchik_pay.model')
const { validationResult } = require('express-validator');
const register_supplierModel = require('../../models/register_supplier.model')
const register_kassaModel = require('../../models/register_kassa.model')
/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class pastavchik_payController {
    getAll = async (req, res, next) => {
        const model = await pastavchik_payModel.findAll(req.body);
        res.status(200).send({
            error: false,
            error_code: 200,
            message: 'Malumotlar chiqdi',
            data: model
        });
    }

    getOne = async (req, res, next) => {
        this.checkValidation(req);
        const model = await pastavchik_payModel.findOne({
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
       const model = await pastavchik_payModel.create({
          "type": req.body.type,
          "price": req.body.price,
          "backlog": req.body.backlog,
          "jami_summa": req.body.jami_summa,
          "pastavchik_id": req.body.pastavchik_id,
          "date_time": Math.floor(new Date().getTime() / 1000)
       });
       var register = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "doc_id": model.id,
        "summa": model.jami_summa,
        "doc_type": "kirim",
        "type": model.type
      }
      await register_supplierModel.create(register);
      var kassa = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "doctor_id": model.id,
        "price": model.jami_summa,
        "doc_type": "kirim",
        "pay_type": model.type == 0 ? "Naqd" : "Plastik",
        "type": model.type,
        "place": "supplier"
      }
         await register_kassaModel.create(kassa)
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await pastavchik_payModel.findOne({
        where:{
            id: req.params.id
        }
    });
    model.type = req.body.type;
    model.price = req.body.price;
    model.backlog = req.body.backlog;
    model.jami_summa = req.body.jami_summa;
    model.pastavchik_id = req.body.pastavchik_id;
    model.date_time = Math.floor(new Date().getTime() / 1000);
    model.save();
    await register_supplierModel.destroy({
        where:{
            doc_id: model.id
        }
    })
    var register = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "doc_id": model.id,
        "summa": model.jami_summa,
        "doc_type": "kirim",
        "type": model.type
      }
      await register_supplierModel.create(register);
      await register_kassaModel.destroy({
        where:{
            doctor_id: model.id,
            place: 'supplier'
        }
      })
      var kassa = {
        "date_time": Math.floor(new Date().getTime() / 1000),
        "doctor_id": model.id,
        "price": model.jami_summa,
        "doc_type": "kirim",
        "pay_type": model.type == 0 ? "Naqd" : "Plastik",
        "type": model.type,
        "place": "supplier"
      }
         await register_kassaModel.create(kassa)
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await pastavchik_payModel.destroy({
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
module.exports = new pastavchik_payController;