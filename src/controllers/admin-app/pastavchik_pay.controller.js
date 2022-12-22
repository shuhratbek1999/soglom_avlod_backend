
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const pastavchik_payModel = require('../../models/pastavchik_pay.model')
const { validationResult } = require('express-validator');

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