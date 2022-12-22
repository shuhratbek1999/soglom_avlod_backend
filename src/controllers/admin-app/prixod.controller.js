
const HttpException = require('../../utils/HttpException.utils');
// const status = require('../../utils/status.utils')
const prixod_Model = require('../../models/prixod.model')
const { validationResult } = require('express-validator');
const prixod_tableModel = require('../../models/prixod_table.model');
const reagentModel = require('../../models/reagent.model');

/******************************************************************************
 *                              Employer Controller
 ******************************************************************************/
class prixodController {
    getAll = async (req, res, next) => {
        const model = await prixod_Model.findAll({
            include:[
                {model: prixod_tableModel, as: 'prixod_table',
            include:[
                {model: reagentModel, as: 'reagent'}
            ]
            }
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
        const model = await prixod_Model.findOne({
            where:{
                id: req.params.id
            },
            include:[
                {model: prixod_tableModel, as: 'prixod_table',
            include:[
                {model: reagentModel, as: 'reagent'}
            ]
            }
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
   create =  async(req, res, next) => {
       this.checkValidation(req);
       const {prixod_table, ...data} = req.body;
       const model = await prixod_Model.create(data);
       this.#prixod_table(model, prixod_table);
       res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar qo\'shildi',
        data: model
    });
   }
   update = async (req, res, next) => {
       this.checkValidation(req);
    const model = await prixod_Model.findOne({
        where:{
            id: req.params.id
        }
    });
    const {prixod_table, ...data} = req.body;
    model.date_time = req.body.date_time;
    model.pastavchik_id = req.body.pastavchik_id;
    model.umumiy_summa = req.body.umumiy_summa;
    model.comment = req.body.comment;
    model.save();
    this.#prixod_table(model, prixod_table, false);
    res.status(200).send({
        error: false,
        error_code: 200,
        message: 'Malumotlar tahrirlandi',
        data: model
    });
}
#prixod_table = async(model, prixod_table, insert = true) => {
    if(!insert){
       await this.#deletePrixodTable(model.id)
    }
    for(let key of prixod_table){
        var tables = {
            "reagent_id": key.reagent_id,
            "price": key.price,
            "prixod_id": model.id,
            "count": key.count
           }
           await prixod_tableModel.create(tables)
    }
}
#deletePrixodTable = async(doc_id) =>{
   await prixod_tableModel.destroy({where:{prixod_id: doc_id}})
}

delete = async (req, res, next) => {
  const model = await prixod_Model.destroy({
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
module.exports = new prixodController;