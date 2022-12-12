const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const { validationResult } = require('express-validator');
const kassa_orderModel = require('../../models/kassa_order.model');
const Register_kassaModel = require('../../models/register_kassa.model')
const expenseModel = require('../../models/expense.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class Kassa_orderController {
    getAll = async (req, res, next) => {
        const model = await kassa_orderModel.findAll({
            include:[
                {model: expenseModel, as: 'expense'}
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
        const model = await kassa_orderModel.findOne({
           where:{
            id: req.params.id
           },
           include:[
            {model: expenseModel, as: 'expense'}
           ]
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
       var date_time = Math.floor(new Date().getTime() / 1000);
       let pay_type;
       if(req.body.type == 'Naqd'){
         pay_type = 'naqt'
       }
       else{
        pay_type = 'plastik'
       }
       const model = await kassa_orderModel.create({
        "expense_id": req.body.expense_id,
        "date_time": date_time,
        "type": req.body.type,
        "pay_type": pay_type,
        "price": req.body.price,
        "comment": req.body.comment
       });
       Register_kassaModel.create({
        "date_time": date_time,
        "doctor_id": model.id,
        "pay_type": pay_type,
        "price": req.body.price,    
        "type": req.body.type,
        "doc_type": 'chiqim',
        "place": "kassa Order"
    })
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await kassa_orderModel.findOne({
        where:{
            id: req.params.id
        }
    });
    var date_time = Math.floor(new Date().getTime() / 1000);
    model.expense_id = req.body.expense_id;
    model.date_time = date_time;
    model.type = req.body.type;
    model.pay_type = req.body.pay_type;
    model.price = req.body.price;
    model.comment = req.body.comment;
    model.save();
    await Register_kassaModel.destroy({
        where:{
            doctor_id: req.params.id
        }
    })
    let pay_type;
       if(req.body.type == 'Naqd'){
         pay_type = 'naqt'
       }
       else{
        pay_type = 'plastik'
       }
       Register_kassaModel.create({
        "date_time": date_time,
        "doctor_id": model.id,
        "pay_type": pay_type,
        "price": req.body.price,    
        "type": req.body.type,
        "doc_type": 'chiqim',
        "place": "kassa Order"
    })
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
delete = async (req, res, next) => {
  const model = await kassa_orderModel.destroy({
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
module.exports = new Kassa_orderController;